# models.py
from django.db import models
import uuid
from .utils.slugify import generate_unique_slug

class BaseModel(models.Model):
    """
    Generic base model with:
    - Internal primary key: 'pk_id' (BigAutoField)
    - Public ID: 'public_id' (UUID7)
    """
    id = models.BigAutoField(primary_key=True, editable=False)
    public_id = models.UUIDField(default=uuid.uuid7, editable=False, unique=True, db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ['-created_at']

    def __str__(self):
        return str(self.public_id)
    
    def save(self, *args, **kwargs):
        if hasattr(self, "slug") and not self.slug and hasattr(self, "slug_field"):
            self.slug = generate_unique_slug(self, getattr(self, self.slug_field)) #type: ignore
        super().save(*args, **kwargs)
