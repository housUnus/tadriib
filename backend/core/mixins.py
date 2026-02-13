from django.shortcuts import get_object_or_404
from courses.models import Course
from functools import cached_property
from typing import Any, Dict
from django.db.models import QuerySet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination

class CourseMixin:
    kwargs: Dict[str, Any]

    @cached_property
    def course(self):
        return get_object_or_404(Course, slug=self.kwargs.get("course_slug"))
    
    def get_queryset(self) -> QuerySet:
        return super().get_queryset().filter(course__slug=self.kwargs.get("course_slug"))#type: ignore

    def perform_create(self, serializer):
        serializer.save(course=self.course)

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"  # recognized in URL
    max_page_size = 100
    
class ListQueryMixin:
    """
    Standard list behavior for all list endpoints:
    - pagination
    - django-filter
    - search
    - ordering
    """

    filter_backends = (
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    )

    # Override in ViewSet
    filterset_fields = []
    search_fields = []
    ordering_fields = []
    ordering = ("-id",)
