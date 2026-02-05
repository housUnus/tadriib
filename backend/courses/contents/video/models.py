from django.db import models
from core.models import BaseModel
from core.utils.video import get_video_duration_seconds
from django.core.exceptions import ValidationError

class Video(BaseModel):
    content = models.OneToOneField(
        "courses.Content",
        on_delete=models.CASCADE,
        related_name="video"
    )
    file = models.FileField(upload_to="courses/videos/")
    duration_seconds = models.PositiveIntegerField(null=True, blank=True)
    is_main_preview = models.BooleanField(default=False)
    
    def clean(self):
        if self.is_main_preview:
            exists = (
                Video.objects
                .filter(
                    content__section__course=self.content.section.course,
                    is_main_preview=True,
                )
                .exclude(pk=self.pk)
                .exists()
            )
            if exists:
                raise ValidationError(
                    "Only one main preview video is allowed per course."
                )

    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # save file first

        if self.file:
            duration = get_video_duration_seconds(self.file)
            Video.objects.filter(pk=self.pk).update(
                duration_seconds=duration
            )
            self.content.duration_minutes = duration // 60
            self.content.save(update_fields=['duration_minutes'])
