from rest_framework import serializers

from .models import Enrollment, EnrollmentProgress, LectureProgress
from core.serializers import PublicSerializerMixin
from courses.serializers import CourseMinimalSerializer, CourseEnrollmentSerializer
from core.serializers import PublicSerializerMixin
from .progress.models import QuizSubmission, QuestionSubmission
from django.db.models import QuerySet
from enrollments.constants import QuizStatus
from typing import TYPE_CHECKING
from courses.constants import ContentType
from courses.models import Question

if TYPE_CHECKING:
    from courses.models import Content

class EnrollmentProgressSerializer(serializers.ModelSerializer):
    active_lecture = serializers.UUIDField(
        source="active_lecture.public_id",
        read_only=True
    )
    class Meta:
        model = EnrollmentProgress
        fields = "__all__"
        read_only_fields = ("active_lecture",)
# -----------------------------------------
# Enrollment Serializer
# -----------------------------------------
class EnrollmentSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    course = CourseMinimalSerializer(read_only=True)
    course_progress_value = serializers.IntegerField(source="progress.progress_percent", read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    remaining_time = serializers.IntegerField(read_only=True)

    class Meta:
        model = Enrollment
        fields = (
            "id",
            "user",
            "course",
            "course_progress_value",
            "order_item",
            "status",
            "expires_at",
            "is_active",
            "remaining_time",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "status",
            "user",
        )
        
class EnrollmentDetailSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    course = CourseEnrollmentSerializer(read_only=True)
    progress = EnrollmentProgressSerializer(read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    remaining_time = serializers.IntegerField(read_only=True)

    class Meta:
        model = Enrollment
        fields = (
            "id",
            "user",
            "course",
            "progress",
            "expires_at",
            "is_active",
            "remaining_time",
        )
        
class LectureProgressSerializer(serializers.ModelSerializer):
    active_quiz_submission = serializers.SerializerMethodField()
    
    def get_active_quiz_submission(self, obj:"LectureProgress"):
        lecture:"Content" = obj.lecture
        if lecture.type != ContentType.QUIZ:
            return None
        active_submission = obj.active_quiz_submission
        if active_submission:
            return active_submission.pk
        return None
    class Meta:
        model = LectureProgress
        fields = (
            'id',
            'lecture', 
            'is_completed',
            'last_position_seconds',
            'last_accessed_at',
            'completed_at',
            'active_quiz_submission',
            )
        

class QuizSubmissionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSubmission
        fields = [
            "id",
            "status",
            "current_question",
            "total_questions",
            "total_visited",
            "total_answered",
            "total_flagged",
            "total_duration",
            "score",
            "score_percent",
            "computed_remaining",
            "started_at",
            "expires_at",
            "paused_at",
            "submitted_at",
        ]
        read_only_fields = (
            "total_questions",
            "total_visited",
            "total_answered",
            "total_flagged",
            "total_duration",
            "score",
            "score_percent",
            "computed_remaining",
        )

   
class QuizSubmissionSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField()
    flagged = serializers.SerializerMethodField()
    visited = serializers.SerializerMethodField()
    correct_answers = serializers.SerializerMethodField()
    answers_is_correct = serializers.SerializerMethodField()
    class Meta:
        model = QuizSubmission
        fields = [
            "id",
            "status",
            "current_question",
            "answers",
            "flagged",
            "visited",
            "answers_is_correct",
            "correct_answers",
            "status",
            "started_at",
            "expires_at",
            "paused_at",
            "submitted_at",
            "score",
            "score_percent",
            "computed_remaining",
        ]
    
    def get_visited(self, obj):
        answers: QuerySet[QuestionSubmission] = obj.answers.filter(visited=True)
        return answers.values_list("question_id", flat=True)
    
    def get_flagged(self, obj):
        answers: QuerySet[QuestionSubmission] = obj.answers.filter(flagged=True)
        return answers.values_list("question_id", flat=True)

    def get_answers(self, obj):
        answers: QuerySet[QuestionSubmission] = obj.answers.all()

        result = {}

        for a in answers:
            result[a.question_id] = a.get_answer_value()

        return result
    
    def get_answers_is_correct(self, obj):
        quiz = obj.progress.lecture.quiz
        if not quiz.show_correct_answers:
            return None
        answers: QuerySet[QuestionSubmission] = obj.answers.all()

        result = {}

        for a in answers:
            result[a.question_id] = a.is_correct

        return result
    
    def get_correct_answers(self, obj):
        quiz = obj.progress.lecture.quiz
        if not quiz.show_correct_answers:
            return None
        
        result = {}
        
        questions:QuerySet[Question] = Question.objects.filter(segment__quiz=quiz)
        for q in questions:
            result[q.pk] = q.get_correct_answer()

        return result
        
class QuestionAnswerSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField()
    text_answer = serializers.CharField(required=False, allow_blank=True)
    boolean_answer = serializers.BooleanField(required=False)
    uploaded_file = serializers.FileField(required=False)

    def validate(self, attrs):
        answer_fields = [
            attrs.get("text_answer"),
            attrs.get("boolean_answer"),
            attrs.get("uploaded_file"),
        ]

        provided = [a for a in answer_fields if a not in [None, ""]]

        if len(provided) == 0:
            raise serializers.ValidationError(
                "An answer must be provided."
            )

        if len(provided) > 1:
            raise serializers.ValidationError(
                "Only one answer type can be provided."
            )

        return attrs