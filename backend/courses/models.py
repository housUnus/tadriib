from django.db import models
from django.conf import settings
from core.models import BaseModel
from courses.constants import CourseStatus, ContentType, CourseLevel, CourseLanguageTypes
from .contents.models import *
from django.utils.translation import gettext_lazy as _
from tinymce.models import HTMLField
from .querysets import CourseQuerySet
from ratings.constants import RatingStatus
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from users.models import User
    from ratings.models import Rating

class CourseLearningOutcome(models.Model):
    course = models.ForeignKey("courses.Course", on_delete=models.CASCADE, related_name="learning_outcomes")
    text = models.CharField(max_length=255)

class CourseRequirement(models.Model):
    course = models.ForeignKey("courses.Course", on_delete=models.CASCADE, related_name="requirements")
    text = models.CharField(max_length=255)

class Course(BaseModel):
    sections: models.Manager[Section]
    ratings: models.Manager["Rating"]

    slug_field = 'title'
    
    title = models.CharField(max_length=255)
    slug = models.SlugField(_("Slug"), max_length=255, unique=True, blank=True, db_index=True)

    short_description = models.CharField(max_length=500, blank=True, null=True)
    description = HTMLField(null=True, blank=True)
    categories = models.ManyToManyField("categories.Category", related_name="courses", blank=True)
    primary_category = models.ForeignKey("categories.Category", on_delete=models.SET_NULL, null=True)

    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="courses")

    status = models.CharField(max_length=20, choices=CourseStatus.choices, default=CourseStatus.DRAFT)

    language = models.CharField(max_length=50, default=CourseLanguageTypes.ENGLISH, choices=CourseLanguageTypes.choices)
    level = models.CharField(max_length=20, choices=CourseLevel.choices, default=CourseLevel.ALL_LEVELS)
    
    poster = models.ImageField(upload_to="courses/posters/", null=True, blank=True)

    published_at = models.DateTimeField(null=True, blank=True)
    
    duration = models.PositiveIntegerField(null=True, blank=True, help_text=_("Total duration of all contents in minutes"))

    def is_public(self):
        return self.status == CourseStatus.PUBLISHED
    
    class Meta:
        verbose_name = _("Course")
        verbose_name_plural = _("Courses")

    objects = CourseQuerySet.as_manager()
    
    def update_duration(self):
        total_duration = Content.objects.filter(section__course=self).aggregate(
            total_duration=models.Sum('duration_minutes')
        )['total_duration']
        self.duration = total_duration if total_duration else 0
        self.save(update_fields=['duration'])
    
    @property
    def total_students(self):
        return 0 #TODO to implement student count
    
    @property
    def total_videos(self):
        return Content.objects.filter(section__course=self, type=ContentType.VIDEO).count()

    @property
    def total_quizzes(self):
        return Content.objects.filter(section__course=self, type=ContentType.QUIZ).count()
    
    @property
    def total_assignments(self):
        return Content.objects.filter(section__course=self, type=ContentType.ASSIGNMENT).count()
    
    @property
    def total_articles(self):
        return Content.objects.filter(section__course=self, type=ContentType.ARTICLE).count()
    
    @property
    def total_attachments(self):
        return Content.objects.filter(section__course=self, type=ContentType.ATTACHMENT).count()
    
    @property
    def total_contents(self):
        return Content.objects.filter(section__course=self).count()
    
    @property
    def total_videos_duration_hours(self):
        total = Content.objects.filter(
            section__course=self,
            type=ContentType.VIDEO
        ).aggregate(
            total_duration=models.Sum('duration_minutes')
        )['total_duration']
        return total//60 if total else 0
    
    def get_rating_distribution(self):
        qs = (
            self.ratings
            .filter(status=RatingStatus.APPROVED)
            .values("value")
            .annotate(count=models.Count("id"))
        )

        total = sum(item["count"] for item in qs)

        # Initialize all ratings 1–5 with 0%
        distribution = {i: 0 for i in range(1, 6)}

        if total == 0:
            return distribution

        for item in qs:
            distribution[item["value"]] = round(
                (item["count"] / total) * 100, 2
            )

        return distribution
        
    
class Section(BaseModel):
    contents: models.Manager[Content]
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="sections")
    title = models.CharField(max_length=255)
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ["order"]
        verbose_name = _("Course Section")
        verbose_name_plural = _("Course Sections")

    def __str__(self):
        return f"{self.course.title} - {self.title}"
    
    @property
    def total_videos(self):
        return self.contents.filter(type=ContentType.VIDEO).count()

    @property
    def total_articles(self):
        return self.contents.filter(type=ContentType.ARTICLE).count()

    @property
    def total_attachments(self):
        return self.contents.filter(type=ContentType.ATTACHMENT).count()
    
    @property
    def total_assignments(self):
        return self.contents.filter(type=ContentType.ASSIGNMENT).count()

    @property
    def total_quizzes(self):
        return self.contents.filter(type=ContentType.QUIZ).count()
    
    @property
    def total_videos_duration_hours(self):
        total = self.contents.filter(type=ContentType.VIDEO).aggregate(
            total_duration=models.Sum('duration_minutes')
        )['total_duration']
        return total if total else 0

class Content(BaseModel):
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name="contents")
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=ContentType.choices)
    order = models.PositiveIntegerField()
    is_preview = models.BooleanField(default=False)
    duration_minutes = models.PositiveIntegerField(null=True, blank=True)
    
    class Meta:
        ordering = ["order"]
        verbose_name = _("Course Content")
        verbose_name_plural = _("Course Contents")

    def __str__(self):
        return self.title
