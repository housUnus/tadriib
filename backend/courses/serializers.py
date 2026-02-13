from rest_framework import serializers
from .models import (
    Course,
    Section,
    Content,
    CourseLearningOutcome,
    CourseRequirement,
    Video
)

from .contents.serializers import (
    VideoSerializer,
    QuizSerializer,
    AttachmentSerializer,
    ArticleSerializer,
    AssignmentSerializer,
)
from .constants import ContentType
from core.serializers import PublicSerializerMixin
from drf_writable_nested.serializers import WritableNestedModelSerializer
from categories.serializers import CategorySerializer
from users.serializers import UserWithStatesSerializer
from ratings.serializers import RatingSerializer


class CourseLearningOutcomeSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = CourseLearningOutcome
        fields = ["id", "text"]
        
class CourseRequirementSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = CourseRequirement
        fields = ["id", "text"]

class ContentSerializer(PublicSerializerMixin, WritableNestedModelSerializer):
    content = serializers.SerializerMethodField()

    def get_content(self, obj):
        if obj.type == ContentType.VIDEO and hasattr(obj, "video"):
            return VideoSerializer(obj.video, context=self.context).data

        elif obj.type == ContentType.QUIZ and hasattr(obj, "quiz"):
            return QuizSerializer(obj.quiz, context=self.context).data
        
        elif obj.type == ContentType.ARTICLE and hasattr(obj, "article"):
            return ArticleSerializer(obj.article, context=self.context).data
        
        elif obj.type == ContentType.ATTACHMENT and hasattr(obj, "attachment"):
            return AttachmentSerializer(obj.attachment, context=self.context).data

        return None
    class Meta:
        model = Content
        fields = [
            "id",
            "title",
            "type",
            "order",
            "is_preview",
            "duration_minutes",
            "content",
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
    average_rating = serializers.DecimalField(max_digits=3, decimal_places=2, read_only=True)
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
    # categories = CategorySerializer(many=True, read_only=True)
    total_reviews = serializers.IntegerField(read_only=True)
    average_rating = serializers.DecimalField(max_digits=3, decimal_places=2, read_only=True)
    instructor = UserWithStatesSerializer(read_only=True)
    total_videos=serializers.IntegerField(read_only=True)
    total_articles=serializers.IntegerField(read_only=True)
    total_attachments=serializers.IntegerField(read_only=True)
    total_assignments=serializers.IntegerField(read_only=True)
    total_quizzes=serializers.IntegerField(read_only=True)
    total_contents=serializers.IntegerField(read_only=True)
    total_videos_duration_hours = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    level_display = serializers.CharField(source='get_level_display', read_only=True)
    latest_reviews=RatingSerializer(many=True, read_only=True)
    rating_distribution = serializers.SerializerMethodField()
    main_preview=serializers.SerializerMethodField()
    
    def get_rating_distribution(self, obj: Course):
        return obj.get_rating_distribution()
    
    def get_main_preview(self, obj):
        if not getattr(obj, "main_preview_video_id", None):
            return None
        video = Video.objects.select_related("content").get(pk=obj.main_preview_video_id)
        return VideoSerializer(video, context=self.context).data
    class Meta:
        model = Course
        fields = [
            "id",
            "slug",
            "title",
            "short_description",
            "description",
            "language",
            "level",
            "level_display",
            "status",
            "published_at",
            "primary_category",
            # "categories",
            "sections",
            "learning_outcomes",
            "requirements",
            "total_reviews",
            "average_rating",
            "instructor",
            "poster",
            "updated_at",
            "total_videos",
            "total_articles",
            "total_attachments",
            "total_assignments",
            "total_quizzes",
            "total_contents",
            "total_videos_duration_hours",
            "latest_reviews",
            "rating_distribution",
            "main_preview",
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
