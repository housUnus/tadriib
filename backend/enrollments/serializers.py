from rest_framework import serializers

from .models import Enrollment, EnrollmentProgress, LectureProgress
from core.serializers import PublicSerializerMixin
from courses.serializers import CourseMinimalSerializer, CourseEnrollmentSerializer
from core.serializers import PublicSerializerMixin

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
    class Meta:
        model = LectureProgress
        fields = ('lecture', 'is_completed', 'last_position_seconds', 'last_accessed_at', 'completed_at')