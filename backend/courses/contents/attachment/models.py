from django.db import models
from core.models import BaseModel
from django.utils.translation import gettext_lazy as _

class Attachment(BaseModel):
    content = models.OneToOneField(
        "courses.Content",
        on_delete=models.CASCADE,
        related_name="attachment"
    )
    file = models.FileField(upload_to="courses/attachments/")
    
    class Meta:
        verbose_name = _("Attachment")
        verbose_name_plural = _("Attachments")
