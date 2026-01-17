from django.db import models
from core.models import BaseModel

class Attachment(BaseModel):
    content = models.OneToOneField(
        "courses.Content",
        on_delete=models.CASCADE,
        related_name="attachment"
    )
    file = models.FileField(upload_to="courses/attachments/")
