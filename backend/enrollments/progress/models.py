from django.db import models
from courses.models import QuizStatus, Question, Content
from django.utils import timezone
import typing

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
    course_progress = models.ForeignKey(EnrollmentProgress, on_delete=models.CASCADE, related_name="lectures")
    lecture = models.ForeignKey("courses.Content", on_delete=models.CASCADE)

    is_completed = models.BooleanField(default=False)
    last_accessed_at = models.DateTimeField(auto_now=True)
    last_position_seconds = models.PositiveIntegerField(default=0)
    completed_at = models.DateTimeField(null=True, blank=True)
    
class Notes(models.Model):
    content_progress = models.ForeignKey(LectureProgress, on_delete=models.CASCADE, related_name="notes")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

#----------------------- Quiz Submission -----------------------
class QuizSubmission(models.Model):
    progress = models.ForeignKey(LectureProgress, on_delete=models.CASCADE, related_name="quiz_submissions")
    status = models.CharField(max_length=20, choices=QuizStatus.choices, default=QuizStatus.IN_PROGRESS)

    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(null=True, blank=True)

    score = models.FloatField(null=True, blank=True)


class QuestionSubmission(models.Model):
    submission = models.ForeignKey(QuizSubmission, on_delete=models.CASCADE, related_name="answers")
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    # Used depending on answer_type
    text_answer = models.TextField(blank=True)
    boolean_answer = models.BooleanField(null=True, blank=True)

    uploaded_file = models.FileField(upload_to="quiz/submissions/", null=True, blank=True)

    is_correct = models.BooleanField(null=True, blank=True)
    score = models.FloatField(null=True, blank=True)
    reviewed_by = models.ForeignKey('users.User', null=True, blank=True, on_delete=models.SET_NULL)