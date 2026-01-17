from rest_framework import serializers
from .models import (
    Course,
    Section,
    Content,
)
from django.db.models import Avg
from core.serializers import PublicSerializerMixin


class ContentSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = [
            "id",
            "title",
            "type",
            "order",
            "is_preview",
            "duration_minutes",
        ]
        
class SectionSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    contents = ContentSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = ["id", "title", "order", "contents"]
        
class CourseListSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    instructor_name = serializers.CharField(source="instructor.get_full_name", read_only=True)
    # rating = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "language",
            "level",
            "status",
            "published_at",
            "instructor_name",
        ]
        
class CourseDetailSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    instructor_name = serializers.CharField(source="instructor.get_full_name", read_only=True)
    # rating = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "language",
            "level",
            "status",
            "published_at",
            "instructor_name",
            "categories",
            "sections",
            # "rating",
        ]


class CourseCreateUpdateSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            "title",
            "description",
            "language",
            "level",
            "status",
            "categories",
        ]
