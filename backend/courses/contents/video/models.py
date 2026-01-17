from django.db import models
from core.models import BaseModel

class Video(BaseModel):
    content = models.OneToOneField(
        "courses.Content",
        on_delete=models.CASCADE,
        related_name="video"
    )
    file = models.FileField(upload_to="courses/videos/")
    duration_seconds = models.PositiveIntegerField()
