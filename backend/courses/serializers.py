from rest_framework import serializers
from .models import (
    Course,
    Section,
    Content,
    CourseLearningOutcome,
    CourseRequirement,
)
from core.serializers import PublicSerializerMixin
from drf_writable_nested.serializers import WritableNestedModelSerializer
from categories.serializers import CategorySerializer
from users.serializers import UserWithStatesSerializer


class CourseLearningOutcomeSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = CourseLearningOutcome
        fields = ["id", "text"]
        
class CourseRequirementSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = CourseRequirement
        fields = ["id", "text"]

class ContentSerializer(PublicSerializerMixin, WritableNestedModelSerializer):
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
    # total_students = serializers.IntegerField(read_only=True)
    primary_category = CategorySerializer(read_only=True)
    total_reviews = serializers.IntegerField(read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "language",
            "level",
            "status",
            "published_at",
            "instructor_name",
            "primary_category",
            "total_reviews",
            "average_rating",
            "poster",
        ]
        
class CourseDetailSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)
    # instructor_name = serializers.CharField(source="instructor.get_full_name", read_only=True)
    learning_outcomes = CourseLearningOutcomeSerializer(many=True, read_only=True)
    requirements = CourseRequirementSerializer(many=True, read_only=True)
    primary_category = CategorySerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    total_reviews = serializers.IntegerField(read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    instructor = UserWithStatesSerializer(read_only=True)
    
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
            "primary_category",
            "categories",
            "sections",
            "learning_outcomes",
            "requirements",
            "total_reviews",
            "average_rating",
            "instructor",
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
