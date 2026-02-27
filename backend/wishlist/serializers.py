# apps/wishlist/serializers.py

from rest_framework import serializers
from .models import Wishlist
from courses.serializers import CourseListSerializer
from courses.models import Course


class WishlistCreateSerializer(serializers.ModelSerializer):
    course = serializers.SlugRelatedField(
        slug_field="public_id",
        queryset=Course.objects.all()
    )
    
    class Meta:
        model = Wishlist
        fields = ["course"]

    def create(self, validated_data):
        user = self.context["request"].user
        course = validated_data["course"]

        wishlist_item, created = Wishlist.objects.get_or_create(
            user=user,
            course=course
        )

        return wishlist_item
    
    
class WishlistListSerializer(serializers.ModelSerializer):
    course = CourseListSerializer(read_only=True)
    class Meta:
        model = Wishlist
        fields = [
            "id",
            "course",
            "created_at",
        ]