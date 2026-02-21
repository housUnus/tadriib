# users/views.py
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Category
from .serializers import CategoryDetailSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(parent__isnull=False, parent__parent__isnull=True).distinct()
    permission_classes = [AllowAny]
    serializer_class = CategoryDetailSerializer
    lookup_field = "slug"