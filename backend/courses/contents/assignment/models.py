from django.db import models
from core.models import BaseModel
from django.utils.translation import gettext_lazy as _

class Assignment(BaseModel):
    content = models.OneToOneField(
        "courses.Content",
        on_delete=models.CASCADE,
        related_name="assignment"
    )
    instructions = models.TextField()
    
    class Meta:
        verbose_name = _("Assignment")
        verbose_name_plural = _("Assignments")