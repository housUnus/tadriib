from django.db import models
from courses.models import Content, Quiz, QuizStatus, Question
from users.models import User

class CourseProgress(models.Model):
    enrollment = models.OneToOneField("enrollments.Enrollment", on_delete=models.CASCADE, related_name="progress")

    progress_percent = models.FloatField(default=0)
    completed_contents = models.PositiveIntegerField(default=0)
    total_contents = models.PositiveIntegerField(default=0)

    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

class ContentProgress(models.Model):
    course_progress = models.ForeignKey(CourseProgress, on_delete=models.CASCADE, related_name="contents")
    content = models.ForeignKey("courses.Content", on_delete=models.CASCADE)

    is_completed = models.BooleanField(default=False)
    last_accessed_at = models.DateTimeField(auto_now=True)
    note = models.TextField(null=True, blank=True)
    
#----------------------- Video Progress -----------------------
class VideoProgress(models.Model):
    progress = models.OneToOneField(ContentProgress, on_delete=models.CASCADE, related_name="video")
    watched_seconds = models.PositiveIntegerField(default=0)

#----------------------- Quiz Submission -----------------------
class QuizSubmission(models.Model):
    progress = models.ForeignKey(ContentProgress, on_delete=models.CASCADE, related_name="quiz_submissions")
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