from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.db.models import Prefetch
from .permissions import IsInstructorOrReadOnly
from .models import Course
from .serializers import (
    CourseListSerializer,
    CourseDetailSerializer,
    CourseCreateUpdateSerializer,
)
from core.views import PublicViewsMixin


class CourseViewSet(PublicViewsMixin, ModelViewSet):
    queryset = Course.objects.select_related("instructor").prefetch_related(
        "sections__contents",
        # "categories",
        # "reviews",
    )

    permission_classes = [IsInstructorOrReadOnly]

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

        # Only published courses for public users
        # if not self.request.user.is_authenticated:
        #     queryset = queryset.filter(status="published")

        return queryset
