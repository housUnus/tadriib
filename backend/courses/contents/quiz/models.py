from django.db import models
from core.models import BaseModel
from courses.constants import QuestionBlockType, AnswerType
from django.utils.translation import gettext_lazy as _
from tinymce.models import HTMLField

class Quiz(BaseModel):
    questions = models.Manager["Question"]
    content = models.OneToOneField(
        "courses.Content",
        on_delete=models.CASCADE,
        related_name="quiz"
    )
    description = models.TextField(blank=True)
    show_correct_answers = models.BooleanField(default=False)
    show_final_score = models.BooleanField(default=False)
    max_attempts = models.PositiveIntegerField(null=True, blank=True)
    
    can_pause = models.BooleanField(default=False)
    can_retake = models.BooleanField(default=False)
    require_review = models.BooleanField(default=False)

    def __str__(self):
        return self.content.title
    
    class Meta:
        verbose_name = _("Quiz")
        verbose_name_plural = _("Quizzes")
        
    @property
    def time_limit_minutes(self):
        return self.content.duration
        

class Question(models.Model):
    options: models.Manager["Option"]
    
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name="questions",
        null=True,
    )
    
    text = HTMLField(null=True, blank=True)
    
    answer_type = models.CharField(
        max_length=30,
        choices=AnswerType.choices
    )
    
    allow_multiple_answers = models.BooleanField(default=False)
    points = models.PositiveIntegerField(default=1)
    order = models.PositiveIntegerField(null=True, blank=True)
    
    answer_explanation = HTMLField(null=True, blank=True)
    answer_hint = models.CharField(max_length=255, null=True, blank=True)
    
    def get_answer_field(self):
        if self.answer_type == AnswerType.TRUE_FALSE:
            return "boolean_answer"
        elif self.answer_type == AnswerType.FILE_UPLOAD:
            return "uploaded_file"
        else:
            return "text_answer"
        
    def get_correct_answer(self):
        if self.answer_type == AnswerType.MULTIPLE_CHOICE:
            return list(
                self.options.filter(is_correct=True)
                .values_list("label", flat=True)
            )

        elif self.answer_type == AnswerType.TRUE_FALSE:
            return self.true_false.is_correct #type: ignore

        elif self.answer_type == AnswerType.FILL_BLANK:
            return self.fill_blank.correct_text #type: ignore

        elif self.answer_type == AnswerType.ESSAY:
            return None  # subjective

        elif self.answer_type == AnswerType.FILE_UPLOAD:
            return None  # manual grading

        return None
        
    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")
        

    def save(self, *args, **kwargs):
        if self.order is None:
            last = Question.objects.filter(section=self.quiz).aggregate(
                max=models.Max("order")
            )["max"]
            self.order = (last or 0) + 1
        super().save(*args, **kwargs)


#------------------ ANSWERS -------------------
class Option(BaseModel):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="options"
    )
    text = models.CharField(max_length=255)
    label = models.CharField(max_length=10, blank=True)
    is_correct = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _("Option")
        verbose_name_plural = _("Options")

class TrueFalseAnswer(models.Model):
    question = models.OneToOneField(
        Question,
        on_delete=models.CASCADE,
        related_name="true_false"
    )
    is_correct = models.BooleanField()
    
    class Meta:
        verbose_name = _("True/False Answer")
        verbose_name_plural = _("True/False Answers")
    
class FillBlankAnswer(models.Model):
    question = models.OneToOneField(
        Question,
        on_delete=models.CASCADE,
        related_name="fill_blank"
    )
    correct_text = models.CharField(max_length=255)
    case_sensitive = models.BooleanField(default=False)
    
    class Meta:
        verbose_name = _("Fill in the Blank Answer")
        verbose_name_plural = _("Fill in the Blank Answers")
    
class EssayAnswer(models.Model):
    question = models.OneToOneField(
        Question,
        on_delete=models.CASCADE,
        related_name="essay"
    )
    min_words = models.PositiveIntegerField(null=True, blank=True)
    
    class Meta:
        verbose_name = _("Essay Answer")
        verbose_name_plural = _("Essay Answers")
    
class FileUploadAnswer(models.Model):
    question = models.OneToOneField(
        Question,
        on_delete=models.CASCADE,
        related_name="file_upload"
    )
    allowed_extensions = models.JSONField(default=list)
    max_file_size_mb = models.PositiveIntegerField(default=10)
    
    class Meta:
        verbose_name = _("File Upload Answer")
        verbose_name_plural = _("File Upload Answers")
