from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from courses.models import Course, Content, Quiz, Content
from enrollments.constants import QuizStatus
from .models import Enrollment, EnrollmentProgress, LectureProgress, QuizSubmission, QuestionSubmission, Question
from .serializers import EnrollmentSerializer, EnrollmentDetailSerializer, \
    EnrollmentProgressSerializer, QuizSubmissionSerializer, QuizSubmissionListSerializer
from courses.serializers import ContentSerializer
from core.mixins import ListQueryMixin, StandardResultsSetPagination, PublicViewsMixin
from datetime import timedelta
from django.utils.timezone import now
from pydash import get
from typing import cast

class EnrollmentViewSet(ListQueryMixin, PublicViewsMixin, ModelViewSet):
    queryset = Enrollment.objects.select_related("course", "progress").all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    search_fields = ["course__title"]
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return EnrollmentDetailSerializer
        return super().get_serializer_class()
    
        
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({'view_type': self.action})
        if self.action in ['retrieve', 'load_content']:
            enrollment = self.get_object()
            context.update({'enrollment': enrollment})
        return context

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
        
    @action(detail=True, methods=["get"], url_path=r"content/(?P<content_id>[0-9a-f-]+)")
    def load_content(self, request, pk=None, content_id=None, *args, **kwargs):
        enrollment = cast(Enrollment, self.get_object())
        course:"Course" = enrollment.course
        content = Content.objects.get(public_id=content_id, section__course=course)
        LectureProgress.objects.get_or_create(
            course_progress=enrollment.progress,
            lecture=content
        )
        data = ContentSerializer(content, context=self.get_serializer_context()).data
        return Response(data)
        
class EnrollmentProgressViewSet(GenericViewSet):
    serializer_class = EnrollmentProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return EnrollmentProgress.objects.filter(
            enrollment__user=self.request.user
        )
        
    def retrieve(self, request, pk=None):
        progress = get_object_or_404(
            self.get_queryset(),
            enrollment__course__public_id=pk
        )
        serializer = self.get_serializer(progress)
        return Response(serializer.data)
    
    @action(detail=True, methods=["post"])
    def set_active(self, request, pk=None):
        lecture_id = request.data.get("lecture_id")
        lecture = get_object_or_404(
            Content,
            public_id=lecture_id,
            section__course__public_id=pk
        )

        progress:"EnrollmentProgress" = get_object_or_404(
            self.get_queryset(),
            enrollment__course__public_id=pk
        )

        progress.active_lecture = lecture#type: ignore
        progress.save(update_fields=["active_lecture"])

        return Response({"status": "active set"})
    
    @action(detail=True, methods=["post"])
    def heartbeat(self, request, pk=None):
        lecture_id = request.data.get("lecture_id")
        position = request.data.get("position")

        progress = get_object_or_404(
            self.get_queryset(),
            enrollment__course__public_id=pk
        )

        lecture:"Content" = get_object_or_404(
            Content,
            public_id=lecture_id,
            section__course__public_id=pk
        )

        lecture_progress, _ = LectureProgress.objects.get_or_create(
            course_progress=progress,
            lecture=lecture
        )

        lecture_progress.last_position_seconds = position

        if lecture.duration_seconds:
            if position >= lecture.duration_seconds * 0.95:
                if not lecture_progress.is_completed:
                    lecture_progress.is_completed = True
                    lecture_progress.completed_at = timezone.now()
                    lecture_progress.save()

        lecture_progress.save()

        progress.recalculate()

        return Response({"status": "ok"})
    
    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):
        lecture_id = request.data.get("lecture_id")

        progress = get_object_or_404(
            self.get_queryset(),
            enrollment__course__public_id=pk
        )

        lecture:"Content" = get_object_or_404(
            Content,
            public_id=lecture_id,
            section__course__public_id=pk
        )

        lecture_progress, _ = LectureProgress.objects.get_or_create(
            course_progress=progress,
            lecture=lecture
        )

        if not lecture_progress.is_completed:
            lecture_progress.is_completed = True
            lecture_progress.completed_at = timezone.now()
            lecture_progress.save()

            progress.completed_lectures += 1
            progress.recalculate()
        else:
            lecture_progress.is_completed = False
            lecture_progress.completed_at = None
            lecture_progress.save()

            progress.completed_lectures -= 1
            progress.recalculate()

        return Response({"status": "completed"})
    
    
class QuizSubmissionViewSet(ModelViewSet):
    queryset = QuizSubmission.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = QuizSubmissionSerializer
    pagination_class = None 

    def get_queryset(self):
        progress_id = self.request.query_params.get("progress_id")#type: ignore
        qs = QuizSubmission.objects.filter(
            progress__course_progress__enrollment__user=self.request.user
        )
        if self.action == 'list':
            qs = qs.filter(
            progress_id=progress_id
        )
        return qs
    
    def get_serializer_class(self):
        if self.action == 'list':
            return QuizSubmissionListSerializer
        return super().get_serializer_class()
    
    @action(detail=False, methods=["post"])
    def start(self, request):
        lecture_id = request.data["lecture_id"]

        progress:"LectureProgress" = get_object_or_404(
            LectureProgress,
            lecture__public_id=lecture_id,
            course_progress__enrollment__user=request.user
        )

        submission = QuizSubmission.objects.create(
            progress=progress,
            user = request.user,
        )
        
        lecture:"Content" = progress.lecture
        quiz:"Quiz" = get(lecture, 'quiz')
        
        if quiz.time_limit_minutes:
            submission.expires_at = now() + timedelta(minutes=quiz.time_limit_minutes)
            submission.remaining_seconds = quiz.time_limit_minutes * 60
        else:
            submission.expires_at = None
            submission.remaining_seconds = None
        submission.save()

        serializer = self.get_serializer(submission)

        return Response(serializer.data)
    
    @action(detail=True, methods=["put"])
    def answer(self, request, pk=None):

        submission = cast(QuizSubmission, self.get_object())

        question_id = request.data["question_id"]
        answer = request.data["answer"]
        
        question:"Question" = get_object_or_404(
            Question,
            id=question_id,
        )

        q_submission, _ = QuestionSubmission.objects.update_or_create(
            submission=submission,
            question_id=question_id,
            defaults={question.get_answer_field(): answer}
        )
        
        q_submission.set_validity()
        

        return Response({"status": "saved"})
    
    @action(detail=True, methods=["put"])
    def flag(self, request, pk=None):

        submission = cast(QuizSubmission, self.get_object())

        question_id = request.data["question_id"]
        flagged = request.data["flagged"]

        QuestionSubmission.objects.update_or_create(
            submission=submission,
            question_id=question_id,
            defaults={"flagged": flagged}
        )

        return Response({"status": "saved"})

    @action(detail=True, methods=["put"])
    def navigate(self, request, pk=None):

        submission = cast(QuizSubmission, self.get_object())

        question_id = request.data["question_id"]
        
        QuestionSubmission.objects.update_or_create(
            submission=submission,
            question_id=question_id,
            defaults={"visited": True}
        )
        
        submission.current_question_id = question_id
        submission.save(update_fields=["current_question"])

        return Response({"status": "ok"})
        
    @action(detail=True, methods=["post"])
    def submit(self, request, pk=None):

        submission = cast(QuizSubmission, self.get_object())

        submission.status = QuizStatus.SUBMITTED
        
        quiz:"Quiz" = submission.progress.lecture.quiz
        if quiz and quiz.require_review:
            submission.status = QuizStatus.IN_REVIEW
        else:
            submission.status = QuizStatus.COMPLETED
            
        submission.submitted_at = timezone.now()

        submission.save()

        return Response({"status": "submitted"})
    
    @action(detail=True, methods=["post"])
    def pause(self, request, pk=None):
        submission = cast(QuizSubmission, self.get_object())
        quiz:Quiz = submission.progress.lecture.quiz

        if not quiz.can_pause:
            return Response({"error": "This quiz cannot be paused"}, status=400)

        if submission.status != QuizStatus.IN_PROGRESS:
            return Response({"error": "Only in-progress quizzes can be paused"}, status=400)

        submission.status = QuizStatus.IS_PAUSED
        
        remaining = (submission.expires_at - now()).total_seconds()

        submission.remaining_seconds = max(0, int(remaining))
        submission.paused_at = now()
        submission.save()

        return Response({"status": "paused"})
    
    @action(detail=True, methods=["post"])
    def resume(self, request, pk=None):
        submission = cast(QuizSubmission, self.get_object())
        quiz:Quiz = submission.progress.lecture.quiz

        if not quiz.can_pause:
            return Response({"error": "This quiz cannot be resumed"}, status=400)

        if submission.status != QuizStatus.IS_PAUSED:
            return Response({"error": "Only paused quizzes can be resumed"}, status=400)

        submission.status = QuizStatus.IN_PROGRESS
        
        if submission.remaining_seconds:
            submission.expires_at = now() + timedelta(seconds=submission.remaining_seconds)
        else:
            submission.expires_at = None

        submission.paused_at = None
        submission.save()

        return Response({"status": "resumed"})