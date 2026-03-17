from django.db import models
from courses.models import Question, Content
from django.utils import timezone
import typing
from enrollments.constants import QuizStatus
from courses.constants import AnswerType

if typing.TYPE_CHECKING:
    from enrollments.models import Enrollment

class EnrollmentProgress(models.Model):
    lectures = models.QuerySet["LectureProgress"]
    enrollment = models.OneToOneField(
        "enrollments.Enrollment",
        on_delete=models.CASCADE,
        related_name="progress"
    )
    
    active_lecture = models.ForeignKey(
        "courses.Content",
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    total_lectures = models.PositiveIntegerField(default=0)
    completed_lectures = models.PositiveIntegerField(default=0)

    progress_percent = models.FloatField(default=0)

    total_video_seconds = models.PositiveIntegerField(default=0)
    watched_video_seconds = models.PositiveIntegerField(default=0)

    last_activity_at = models.DateTimeField(auto_now=True)

    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    updated_at = models.DateTimeField(auto_now=True)
    
    
    def recalculate(self):
        enrollment:"Enrollment" = self.enrollment
        total = Content.objects.filter(section__course=enrollment.course).count()

        self.total_lectures = total
        percent = (
            self.completed_lectures / total * 100
            if total else 0
        )

        self.progress_percent = round(percent, 2)

        if percent == 100 and not self.completed_at:
            self.is_completed = True
            self.completed_at = timezone.now()

        self.save()

class LectureProgress(models.Model):
    quiz_submissions: models.Manager["QuizSubmission"]
    course_progress = models.ForeignKey(EnrollmentProgress, on_delete=models.CASCADE, related_name="lectures")
    lecture = models.ForeignKey("courses.Content", on_delete=models.CASCADE)

    is_completed = models.BooleanField(default=False)
    last_accessed_at = models.DateTimeField(auto_now=True)
    last_position_seconds = models.PositiveIntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    @property
    def active_quiz_submission(self):
        return self.quiz_submissions.filter(status__in=[QuizStatus.IN_PROGRESS, QuizStatus.IS_PAUSED]).first()
    
class Notes(models.Model):
    content_progress = models.ForeignKey(LectureProgress, on_delete=models.CASCADE, related_name="notes")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

#----------------------- Quiz Submission -----------------------
class QuizSubmission(models.Model):
    user = models.ForeignKey(
        "users.User",
        on_delete=models.SET_NULL,
        null=True,
        related_name="quiz_submissions"
    )
    
    progress = models.ForeignKey(
        LectureProgress,
        on_delete=models.CASCADE,
        related_name="quiz_submissions"
    )

    status = models.CharField(
        max_length=20,
        choices=QuizStatus.choices,
        default=QuizStatus.IN_PROGRESS
    )

    started_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    remaining_seconds = models.IntegerField(null=True, blank=True)
    paused_at = models.DateTimeField(null=True, blank=True)
    
    submitted_at = models.DateTimeField(null=True, blank=True)

    # navigation state
    current_question = models.ForeignKey(
        "courses.Question",
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    score = models.FloatField(null=True, blank=True)
    
    @property
    def computed_remaining(self):
        if self.status == QuizStatus.IN_PROGRESS and self.expires_at:
            remaining = (self.expires_at - timezone.now()).total_seconds()
            return max(0, int(remaining))
        elif self.status == QuizStatus.IS_PAUSED and self.remaining_seconds is not None:
            return self.remaining_seconds
        return None

    class Meta:
        ordering = ["-started_at"]

class QuestionSubmission(models.Model):

    submission = models.ForeignKey(
        QuizSubmission,
        on_delete=models.CASCADE,
        related_name="answers"
    )

    question_id: int # Store question ID directly for easier access
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )

    text_answer = models.JSONField(null=True, blank=True)
    boolean_answer = models.BooleanField(null=True, blank=True)
    uploaded_file = models.FileField(
        upload_to="quiz/submissions/",
        null=True,
        blank=True
    )

    is_correct = models.BooleanField(null=True, blank=True)
    flagged = models.BooleanField(default=False)
    visited = models.BooleanField(default=False)
    score = models.FloatField(null=True, blank=True)

    reviewed_by = models.ForeignKey(
        "users.User",
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("submission", "question")
        
    def get_answer_value(self):
        question:"Question" = self.question
        if question.answer_type == AnswerType.MULTIPLE_CHOICE:
            return self.text_answer if self.text_answer else []
        elif question.answer_type == AnswerType.TRUE_FALSE:
            return self.boolean_answer
        elif question.answer_type == AnswerType.FILL_BLANK:
            return self.text_answer
        elif question.answer_type == AnswerType.ESSAY:
            return self.text_answer
        elif question.answer_type == AnswerType.FILE_UPLOAD:
            return self.uploaded_file.url if self.uploaded_file else None
        else:
            return None