from rest_framework import serializers
from .models import (
    Video,
    Quiz,
    Attachment,
    Article,
    Assignment,
    Conference,
)
from courses.contents.quiz.serializers import QuestionSerializer
from django.conf import settings

class VideoSerializer(serializers.ModelSerializer):
    preview = serializers.SerializerMethodField(read_only=True)
    
    def get_preview(self, obj):
        request = self.context.get("request")
        if obj.file and request:
            return request.build_absolute_uri(obj.file.url)
        return None
    
    class Meta:
        model = Video
        fields = ["id", "file", "url", "preview"]
        
class QuizSerializer(serializers.ModelSerializer):
    duration = serializers.ReadOnlyField(source="time_limit_minutes")
    questions = QuestionSerializer(many=True, read_only=True)
    total_questions = serializers.IntegerField(source="segments__questions__count", read_only=True)
    _id = serializers.CharField(source="id", read_only=True)
    class Meta:
        model = Quiz
        fields = [
            "_id",
            "id", 
            "description", 
            "time_limit_minutes", 
            "duration", 
            "questions", 
            "total_questions",
            "can_pause",
            "show_correct_answers",
            "show_final_score",
            "max_attempts",
            "require_review",
        ]
        
class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = ["id", "file"]
        
class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ["id", "text"]
        
class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = ["id", "instructions"]
        
class ConferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conference
        fields = '__all__'