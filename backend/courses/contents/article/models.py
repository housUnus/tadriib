from django.db import models
from core.models import BaseModel
from tinymce.models import HTMLField
import re
import math

class Article(BaseModel):
    content = models.OneToOneField(
        "courses.Content",
        on_delete=models.CASCADE,
        related_name="article"
    )
    text = HTMLField(null=True, blank=True)
    
    @property
    def word_count(self) -> int:
        if not self.text:
            return 0

        # Remove HTML tags
        plain_text = re.sub(r"<[^>]+>", "", self.text)
        words = plain_text.split()
        return len(words)

    @property
    def reading_time_minutes(self) -> int:
        if self.word_count == 0:
            return 0

        return max(1, math.ceil(self.word_count / 200))
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.content.duration_minutes = self.reading_time_minutes
        self.content.save(update_fields=['duration_minutes'])