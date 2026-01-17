from django.db import models
from core.models import BaseModel

class Assignment(BaseModel):
    content = models.OneToOneField(
        "courses.Content",
        on_delete=models.CASCADE,
        related_name="assignment"
    )
    instructions = models.TextField()