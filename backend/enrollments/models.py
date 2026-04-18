"""Models for the Flexible Subscriptions app."""
from datetime import datetime

from django.contrib.auth import get_user_model
from django.db import models
from django.utils.translation import gettext_lazy as _
from courses.models import Course
from .constants import EnrollmentStatus
from core.models import BaseModel
from .progress.models import *

class Enrollment(BaseModel):
    progress: "EnrollmentProgress"
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    order_item = models.OneToOneField("subscriptions.OrderItem", on_delete=models.CASCADE, related_name="enrollment")
    status = models.CharField(
        max_length=20,
        choices=EnrollmentStatus.choices,
        default=EnrollmentStatus.ACTIVE
    )

    expires_at = models.DateTimeField(null=True, blank=True)
    
    @property
    def is_active(self):
        return self.status == EnrollmentStatus.ACTIVE
    
    @property
    def remaining_time(self):
        if self.expires_at:
            return (self.expires_at - datetime.now()).days
        return None
    
    def save(self, *args, **kwargs):
        instance = super().save(*args, **kwargs)
        if not hasattr(self, "progress"):
            EnrollmentProgress.objects.get_or_create(enrollment=self)
        return instance

    class Meta:
        unique_together = ("user", "course")