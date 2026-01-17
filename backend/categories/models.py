from mptt.models import MPTTModel, TreeForeignKey
from django.db import models

class Category(MPTTModel):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    parent = TreeForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children"
    )

    class MPTTMeta:
        order_insertion_by = ["name"]

    def __str__(self):
        return self.name
