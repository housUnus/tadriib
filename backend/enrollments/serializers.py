from rest_framework import serializers

from .models import Enrollment, CourseProgress
from core.serializers import PublicSerializerMixin
from courses.serializers import CourseMinimalSerializer

class CourseProgressSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = CourseProgress
        fields = (
            "progress_percent",
            "completed_contents",
            "total_contents",
            "is_completed",
            "completed_at",
        )
# -----------------------------------------
# Enrollment Serializer
# -----------------------------------------
class EnrollmentSerializer(serializers.ModelSerializer):
    course = CourseMinimalSerializer(read_only=True)
    course_progress = CourseProgressSerializer(source="progress", read_only=True)
    is_active = serializers.BooleanField(read_only=True)
    remaining_time = serializers.IntegerField(read_only=True)

    class Meta:
        model = Enrollment
        fields = (
            "id",
            "user",
            "course",
            "course_progress",
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