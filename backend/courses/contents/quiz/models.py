from django.db import models
from core.models import BaseModel
from courses.constants import QuestionBlockType, AnswerType, QuizStatus
from django.conf import settings

class Quiz(BaseModel):
    content = models.OneToOneField(
        "courses.Content",
        on_delete=models.CASCADE,
        related_name="quiz"
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    time_limit_minutes = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name="questions"
    )
    answer_type = models.CharField(
        max_length=30,
        choices=AnswerType.choices
    )
    points = models.PositiveIntegerField(default=1)
    order = models.PositiveIntegerField()


class QuestionBlock(BaseModel):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="blocks"
    )
    type = models.CharField(max_length=20, choices=QuestionBlockType.choices)
    order = models.PositiveIntegerField()

    # For TEXT blocks
    text = models.TextField(blank=True)

    # For IMAGE blocks
    image = models.ImageField(
        upload_to="quiz/questions/images/",
        null=True,
        blank=True
    )

    # For FILE blocks
    file = models.FileField(
        upload_to="quiz/questions/files/",
        null=True,
        blank=True
    )


#------------------ ANSWERS -------------------
class Answer(BaseModel):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="answers"
    )
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)
    
class TrueFalseAnswer(models.Model):
    question = models.OneToOneField(
        Question,
        on_delete=models.CASCADE,
        related_name="true_false"
    )
    correct = models.BooleanField()
    
class FillBlankAnswer(models.Model):
    question = models.OneToOneField(
        Question,
        on_delete=models.CASCADE,
        related_name="fill_blank"
    )
    correct_text = models.CharField(max_length=255)
    case_sensitive = models.BooleanField(default=False)
    
class EssayAnswer(models.Model):
    question = models.OneToOneField(
        Question,
        on_delete=models.CASCADE,
        related_name="essay"
    )
    min_words = models.PositiveIntegerField(null=True, blank=True)
    
class FileUploadAnswer(models.Model):
    question = models.OneToOneField(
        Question,
        on_delete=models.CASCADE,
        related_name="file_upload"
    )
    allowed_extensions = models.JSONField(default=list)
    max_file_size_mb = models.PositiveIntegerField(default=10)
    
    
#----------------------- Quiz Submission -----------------------
    
class QuizSubmission(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)

    status = models.CharField(
        max_length=20,
        choices=QuizStatus.choices,
        default="in_progress"
    )

    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    score = models.FloatField(null=True, blank=True)

    class Meta:
        unique_together = ("user", "quiz")
        
class QuestionSubmission(models.Model):
    submission = models.ForeignKey(
        "QuizSubmission",
        on_delete=models.CASCADE,
        related_name="answers"
    )
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    # Used depending on answer_type
    text_answer = models.TextField(blank=True)
    boolean_answer = models.BooleanField(null=True, blank=True)

    uploaded_file = models.FileField(
        upload_to="quiz/submissions/",
        null=True,
        blank=True
    )

    is_correct = models.BooleanField(null=True, blank=True)
    score = models.FloatField(null=True, blank=True)
    reviewed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )