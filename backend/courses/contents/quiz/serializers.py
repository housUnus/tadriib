from rest_framework import serializers
from .models import (
    Question, Option,
    TrueFalseAnswer, FillBlankAnswer, EssayAnswer, FileUploadAnswer
)


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'text', 'label', 'is_correct']


class TrueFalseAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrueFalseAnswer
        fields = ['id', 'is_correct']


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
    options = OptionSerializer(many=True, read_only=True)
    true_false = TrueFalseAnswerSerializer(read_only=True)
    fill_blank = FillBlankAnswerSerializer(read_only=True)
    essay = EssayAnswerSerializer(read_only=True)
    file_upload = FileUploadAnswerSerializer(read_only=True)
    correct_answer = serializers.SerializerMethodField()

    def get_correct_answer(self, obj:"Question"):
        view_type = self.context.get("view_type")

        quiz = obj.quiz
        assert quiz
        
        if not quiz.show_correct_answers and not view_type == 'course-create':
            return None

        return obj.get_correct_answer()

    class Meta:
        model = Question
        fields = [
            'id', 'answer_type', 'points', 'order', 'allow_multiple_answers', 
            'text', 'options', 'true_false', 'fill_blank', 'essay', 'file_upload',
            'answer_explanation', 'answer_hint', 'correct_answer',
        ]
