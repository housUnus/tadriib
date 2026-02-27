from django.db import models

class EnrollmentStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    EXPIRED = "expired", "Expired"
    INACTIVE = "inactive", "Inactive"
    