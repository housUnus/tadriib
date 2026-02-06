# courses/querysets.py
from django.db import models
from django.db.models import Avg, Count
from courses.contents.video.models import Video
from ratings.constants import RatingStatus

class CourseQuerySet(models.QuerySet):
    def with_stats(self):
        return self.annotate(
            # total_students=Count("enrollments", distinct=True),
            total_reviews=Count("ratings", distinct=True, filter=models.Q(ratings__status=RatingStatus.APPROVED)),
            average_rating=Avg("ratings__value", filter=models.Q(ratings__status=RatingStatus.APPROVED)),
        )
        
    def with_main_preview(self):
        preview_video = Video.objects.filter(
            is_main_preview=True,
            content__section__course=models.OuterRef("pk"),
        ).values("pk")[:1]

        return self.annotate(
            main_preview_video_id=models.Subquery(preview_video)
        )
