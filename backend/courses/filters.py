# courses/filters.py

import django_filters
from django.db.models import Q
from .models import Course
from django.db import models


class CourseFilter(django_filters.FilterSet):
    rating = django_filters.CharFilter(method="filter_rating")
    # price = django_filters.CharFilter(method="filter_price")
    level = django_filters.CharFilter(method="filter_level")
    categories = django_filters.CharFilter(method="filter_categories")
    duration = django_filters.CharFilter(method="filter_duration")
    status = django_filters.CharFilter()
    language = django_filters.CharFilter()
    categories__slug = django_filters.CharFilter()
    instructor__profile__slug = django_filters.CharFilter()
    
    class Meta:
        model = Course
        fields = ["status", "language", "level", "categories__slug", "instructor__profile__slug"]

    def filter_rating(self, queryset, name, value):
        ratings = value.split(",")
        ratings = [float(r) for r in ratings if  1 <= float(r) <= 5]
        min_rating = min(ratings) if ratings else 0
        queryset = queryset.annotate(average_rating=models.Avg("ratings__value"))
        return queryset.filter(average_rating__gte=min_rating)

    # def filter_price(self, queryset, name, value):
    #     prices = value.split(",")
    #     return queryset.filter(price_type__in=prices)

    def filter_level(self, queryset, name, value):
        levels = value.split(",")
        return queryset.filter(level__in=levels)
    
    def filter_categories(self, queryset, name, value):
        categories = value.split(",")
        return queryset.filter(categories__slug__in=categories)
    
    def filter_duration(self, queryset, name, value):
        durations = value.split(",")
        q_objects = Q()
        for duration in durations:
            if duration == "short":
                q_objects |= Q(duration__lte=30)
            elif duration == "medium":
                q_objects |= Q(duration__gt=30, duration__lte=120)
            elif duration == "long":
                q_objects |= Q(duration__gt=120)
        return queryset.filter(q_objects)