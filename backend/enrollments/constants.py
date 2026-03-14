from django.db import models

class EnrollmentStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    EXPIRED = "expired", "Expired"
    INACTIVE = "inactive", "Inactive"
    
class QuizStatus(models.TextChoices):
    NOT_STARTED = "not_started", "Not Started"
    IN_PROGRESS = "in_progress", "In Progress"
    SUBMITTED = "submitted", "Submitted"
    IN_REVIEW = "in_review", "In Review"
    COMPLETED = "completed", "Completed"