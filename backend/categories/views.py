# users/views.py
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Category
from .serializers import CategoryDetailSerializer
from .filters import CategoryFilter
from rest_framework.decorators import action

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(parent__parent__isnull=True).distinct()
    permission_classes = [AllowAny]
    serializer_class = CategoryDetailSerializer
    lookup_field = "slug"
    filter_class = CategoryFilter
    
    def get_queryset(self):
        qs = super().get_queryset()
        if self.action == 'as_nested':
            qs = qs.filter(parent__isnull=True).prefetch_related("children").distinct()
        else:
            qs = qs.filter(parent__isnull=False).distinct()
        return qs
    
    @action(detail=False, methods=["get"])
    def as_nested(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)