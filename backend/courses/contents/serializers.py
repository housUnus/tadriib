from rest_framework import serializers
from .models import (
    Video,
    Quiz,
    Attachment,
    Article,
    Assignment
)
from courses.contents.quiz.serializers import SegmentSerializer

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ["id", "file"]
        
class QuizSerializer(serializers.ModelSerializer):
    duration = serializers.ReadOnlyField(source="time_limit_minutes")
    segments = SegmentSerializer(many=True, read_only=True)
    total_questions = serializers.IntegerField(source="segments__questions__count", read_only=True)
    class Meta:
        model = Quiz
        fields = ["id", 
                  "description", 
                  "time_limit_minutes", 
                  "duration", "segments", 
                  "total_questions",
                  "can_pause",
                  "can_retake",
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