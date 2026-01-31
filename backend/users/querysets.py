# courses/querysets.py
from django.db import models
from django.db.models import Avg, Count


class UserQuerySet(models.QuerySet):
    def with_stats(self):
        return self.annotate(
            # total_students=Count("enrollments", distinct=True),
            total_courses=Count("courses", distinct=True),
            total_reviews=Count("courses__ratings", distinct=True),
            average_rating=Avg("courses__ratings__value"),
        )
