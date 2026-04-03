from rest_framework import serializers
from courses.models import Question, Quiz, Content, Option
from courses.contents.serializers import VideoSerializer, ArticleSerializer, AttachmentSerializer, ConferenceSerializer
from courses.constants import ContentType
from drf_writable_nested.serializers import WritableNestedModelSerializer

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ["id", "text"]

class QuestionSerializer(WritableNestedModelSerializer):
    correct_answer = serializers.SerializerMethodField(read_only=True)
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = [
            "id",
            "text",
            "answer_type",
            "allow_multiple_answers",
            "order",
            "correct_answer",
        ]
        
    def save(self, **kwargs):
        question = super().save(**kwargs)

    
class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ["id", "questions"]
        

CONTENT_SERIALIZER_MAP = {
    ContentType.VIDEO.value: VideoSerializer,
    ContentType.QUIZ.value: QuizSerializer,
    ContentType.ARTICLE.value: ArticleSerializer,
    ContentType.ATTACHMENT.value: AttachmentSerializer,
    ContentType.CONFERENCE.value: ConferenceSerializer,
}

class ContentSerializer(serializers.ModelSerializer):
    content = serializers.JSONField(required=False)
    
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
    
    class Meta:
        model = Content
        fields = ["id", "type", "content"]