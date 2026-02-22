# courses/filters.py

import django_filters
from django.db.models import Q
from .models import Category


class CategoryFilter(django_filters.FilterSet):
   
    class Meta:
        model = Category
        fields = []
