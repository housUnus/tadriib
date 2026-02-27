from django.db import models
from core.models import SimpleBaseModel


class Wishlist(SimpleBaseModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name="wishlist_items")
    course = models.ForeignKey("courses.Course",on_delete=models.CASCADE,related_name="wishlist_items")

    class Meta:
        unique_together = ("user", "course")
        indexes = [
            models.Index(fields=["user"]),
            models.Index(fields=["course"]),
        ]

    def __str__(self):
        return f"{self.user} → {self.course}"