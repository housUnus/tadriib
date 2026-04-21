from rest_framework import serializers
from core.serializers import PublicSerializerMixin
from courses.models import Course, Question, Quiz, Content, Option, TrueFalseAnswer, FillBlankAnswer, CourseRequirement, CourseLearningOutcome
from courses.contents.serializers import VideoSerializer, ArticleSerializer, AttachmentSerializer, ConferenceSerializer
from courses.constants import ContentType, AnswerType
from drf_writable_nested.serializers import WritableNestedModelSerializer

class RequirementSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRequirement
        fields = ["id", "text"]
        
class LearningOutcomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseLearningOutcome
        fields = ["id", "text"]

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "text", "label", "is_correct"]

class QuestionSerializer(WritableNestedModelSerializer):
    correct_answer = serializers.JSONField(allow_null=True, required=False)
    options = OptionSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = Question
        fields = [
            "id",
            "text",
            "answer_type",
            "allow_multiple_answers",
            "order",
            "correct_answer",
            "options",
            "answer_hint",
            "answer_explanation",
        ]
        
    def save(self, **kwargs):
        correct_answer = self.validated_data.pop("correct_answer")#type: ignore
        question:"Question" = super().save(**kwargs)
        if correct_answer is not None:
            if question.answer_type == AnswerType.TRUE_FALSE:
                true_false = TrueFalseAnswer.objects.get_or_create(question=question)[0]
                true_false.is_correct = correct_answer
                true_false.save()
            elif question.answer_type == AnswerType.FILL_BLANK:
                fill_blank = FillBlankAnswer.objects.get_or_create(question=question)[0]
                fill_blank.correct_text = correct_answer
                fill_blank.save()
        return question
            
    
class QuizSerializer(WritableNestedModelSerializer):
    questions = QuestionSerializer(many=True, required=False, allow_null=True)

    class Meta:
        model = Quiz
        fields = [
            "id",
            "questions",
            "description",
            "time_limit_minutes",
            "can_pause",
            "show_correct_answers",
            "show_final_score",
            "max_attempts",
            "require_review"
        ]
        

CONTENT_SERIALIZER_MAP = {
    ContentType.VIDEO.value: VideoSerializer,
    ContentType.QUIZ.value: QuizSerializer,
    ContentType.ARTICLE.value: ArticleSerializer,
    ContentType.ATTACHMENT.value: AttachmentSerializer,
    ContentType.CONFERENCE.value: ConferenceSerializer,
}

class ContentWriteSerializer(serializers.ModelSerializer):
    content = serializers.DictField(required=False)    
    def update(self, instance: "Content", validated_data):
        content_data = validated_data.pop("content", None)

        # update base fields first
        instance = super().update(instance, validated_data)

        if content_data:
            serializer_class = CONTENT_SERIALIZER_MAP.get(instance.type)

            if not serializer_class:
                raise serializers.ValidationError("Unsupported content type")

            # get or create related object
            related_attr = instance.type.lower()  # "video", "quiz", etc.
            related_instance = getattr(instance, related_attr, None)

            if related_instance:
                serializer = serializer_class(
                    related_instance,
                    data=content_data,
                    partial=True,
                    context=self.context
                )
            else:
                serializer = serializer_class(
                    data=content_data,
                    context=self.context
                )

            serializer.is_valid(raise_exception=True)

            saved_obj = serializer.save(content=instance)

            # attach if newly created
            if not related_instance:
                setattr(instance, related_attr, saved_obj)
        return instance
    
    class Meta:
        model = Content
        fields = ["id", "type", "content", "title", "is_preview", "order", "duration_minutes", "is_main_preview"]
        
class CourseCreateUpdateSerializer(PublicSerializerMixin, WritableNestedModelSerializer):
    requirements = RequirementSerializer(many=True, required=False)
    learning_outcomes = LearningOutcomeSerializer(many=True, required=False)
    class Meta:
        model = Course
        fields = [
            "title",
            "description",
            "category",
            "sub_category",
            "language",
            "level",
            "status",
            "requirements",
            "learning_outcomes",
            "type",
            "price",
            "poster",
        ]
        
class CourseCreateListSerializer(PublicSerializerMixin, serializers.ModelSerializer):
    is_live = serializers.BooleanField(read_only=True)
    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "type",
            "slug",
            "description",
            "language",
            "level",
            "status",
            "published_at",
            "poster",
            "category",
            "is_live",
            "updated_at",
        ]