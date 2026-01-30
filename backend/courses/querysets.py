# courses/querysets.py
from django.db import models
from django.db.models import Avg, Count


class CourseQuerySet(models.QuerySet):
    def with_stats(self):
        return self.annotate(
            # total_students=Count("enrollments", distinct=True),
            total_reviews=Count("ratings", distinct=True),
            average_rating=Avg("ratings__value"),
        )
