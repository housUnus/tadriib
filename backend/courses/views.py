from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Prefetch
from .models import Course
from .serializers import (
    CourseListSerializer,
    CourseDetailSerializer,
    CourseCreateUpdateSerializer,
)
from core.views import PublicViewsMixin
from core.mixins import ListQueryMixin
from core.authentication import OptionalJWTAuthentication
from users.models import User
from ratings.models import Rating
from ratings.constants import RatingStatus

class CourseViewSet(PublicViewsMixin, ListQueryMixin, ModelViewSet):
    lookup_field = "slug"
    authentication_classes = [OptionalJWTAuthentication]
    permission_classes = [AllowAny]
    queryset = Course.objects.with_stats().select_related("primary_category")#type: ignore
    filterset_fields = ["status", "language", "level", "categories__slug", "instructor__profile__slug"]
    
    def get_serializer_class(self):
        if self.action == "list":
            return CourseListSerializer
        if self.action == "retrieve":
            return CourseDetailSerializer
        return CourseCreateUpdateSerializer

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated()]
        return [AllowAny()]

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

    def get_queryset(self):
        queryset = super().get_queryset()
        
        if self.action in ["retrieve", "update", "partial_update"]:
            queryset = queryset.with_stats().with_main_preview().prefetch_related(
                "categories",
                "sections__contents",
                "learning_outcomes",
                "requirements",
                Prefetch(
                    "instructor",
                    queryset=User.objects.with_stats(),
                ),
                Prefetch(
                    "ratings",
                    queryset=Rating.objects.filter(status=RatingStatus.APPROVED)
                    .select_related("rated_by")
                    .order_by("-created_at")[:5],
                    to_attr="latest_reviews",
                )
            )

        # Only published courses for public users
        # if not self.request.user.is_authenticated:
        #     queryset = queryset.filter(status="published")
        return queryset
