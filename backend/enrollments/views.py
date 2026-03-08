from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from courses.models import Course, Content
from .models import Enrollment, EnrollmentProgress, LectureProgress
from .serializers import EnrollmentSerializer, EnrollmentDetailSerializer, EnrollmentProgressSerializer, LectureProgressSerializer
from courses.serializers import ContentSerializer
from core.mixins import ListQueryMixin, StandardResultsSetPagination, PublicViewsMixin

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
        enrollment:"Enrollment" = self.get_object()
        course:"Course" = enrollment.course
        content = Content.objects.get(public_id=content_id, section__course=course)
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
    