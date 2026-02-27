# apps/wishlist/views.py

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Wishlist
from .serializers import WishlistCreateSerializer, WishlistListSerializer
from core.mixins import StandardResultsSetPagination, ListQueryMixin, PublicViewsMixin


class WishlistViewSet(ListQueryMixin, PublicViewsMixin, ModelViewSet):
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    search_fields = ["course__title"]

    def get_queryset(self):
        return Wishlist.objects.filter(
            user=self.request.user
        ).select_related("course")

    def get_serializer_class(self):
        if self.action == "create":
            return WishlistCreateSerializer
        return WishlistListSerializer
    
    def create(self, request, *args, **kwargs):
        s = self.get_serializer(data=request.data)
        s.is_valid(raise_exception=True)

        course = s.validated_data["course"] #type: ignore
        
        wishlist_item = self.get_queryset().filter(
            course=course
        ).first()

        if wishlist_item:
            wishlist_item.delete()
            return Response({"is_wishlisted": False})

        Wishlist.objects.create(user=request.user, course=course)
        return Response({"is_wishlisted": True})