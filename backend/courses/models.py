from django.db import models
from django.conf import settings
from core.models import BaseModel
from courses.constants import CourseStatus, ContentType, CourseLevel
from .contents.models import *

class Course(BaseModel):
    title = models.CharField(max_length=255)
    description = models.TextField()
    categories = models.ManyToManyField(
        "categories.Category",
        related_name="courses",
        blank=True
    )

    instructor = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="courses"
    )

    status = models.CharField(
        max_length=20,
        choices=CourseStatus.choices,
        default=CourseStatus.DRAFT
    )

    language = models.CharField(max_length=50, default="en")
    level = models.CharField(
        max_length=20,
        choices=CourseLevel.choices,
        default=CourseLevel.ALL_LEVELS
    )
    
    poster = models.ImageField(
        upload_to="courses/posters/",
        null=True,
        blank=True
    )

    published_at = models.DateTimeField(null=True, blank=True)

    def is_public(self):
        return self.status == CourseStatus.PUBLISHED



class Section(BaseModel):
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name="sections"
    )
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class Content(BaseModel):
    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name="contents"
    )
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=ContentType.choices)
    order = models.PositiveIntegerField()
    is_preview = models.BooleanField(default=False)
    duration_minutes = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return self.title
