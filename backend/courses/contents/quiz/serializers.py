from rest_framework import serializers
from .models import (
    Question, QuestionBlock, Suggestion, Segment,
    TrueFalseAnswer, FillBlankAnswer, EssayAnswer, FileUploadAnswer
)


class QuestionBlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBlock
        fields = ['id', 'type', 'order', 'text', 'image', 'file']


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = ['id', 'text', 'label', 'is_correct']


class TrueFalseAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrueFalseAnswer
        fields = ['id', 'correct']


class FillBlankAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FillBlankAnswer
        fields = ['id', 'correct_text', 'case_sensitive']


class EssayAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = EssayAnswer
        fields = ['id', 'min_words']


class FileUploadAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUploadAnswer
        fields = ['id', 'allowed_extensions', 'max_file_size_mb']

class QuestionSerializer(serializers.ModelSerializer):
    blocks = QuestionBlockSerializer(many=True, read_only=True)
    suggestions = SuggestionSerializer(many=True, read_only=True)
    true_false = TrueFalseAnswerSerializer(read_only=True)
    fill_blank = FillBlankAnswerSerializer(read_only=True)
    essay = EssayAnswerSerializer(read_only=True)
    file_upload = FileUploadAnswerSerializer(read_only=True)
    

    class Meta:
        model = Question
        fields = [
            'id', 'answer_type', 'points', 'order', 'allow_multiple_answers', 
            'blocks', 'suggestions', 'true_false', 'fill_blank', 'essay', 'file_upload'
        ]

class SegmentSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Segment
        fields = ['id', 'title', 'order', 'questions']