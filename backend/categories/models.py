from mptt.models import MPTTModel, TreeForeignKey
from django.db import models
from django.utils.translation import gettext_lazy as _

class Category(MPTTModel):
    children: models.Manager["Category"]
    
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)

    parent = TreeForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children"
    )
    
    path_name = models.CharField(max_length=255, null=True, blank=True)
    path_url = models.CharField(max_length=255, null=True, blank=True)
    class MPTTMeta:
        order_insertion_by = ["name"]
        
    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.name
    
    def get_full_path_name(self):
        return "/".join(
            [ancestor.name for ancestor in self.get_ancestors(include_self=True)]
        )
        
    def get_full_path_url(self):
        return "/".join(
            [ancestor.slug for ancestor in self.get_ancestors(include_self=True)]
        )
        
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_path()

    def update_path(self):
        self.path_name = self.get_full_path_name()
        self.path_url = self.get_full_path_url()
        super().save(update_fields=["path_name", "path_url"])