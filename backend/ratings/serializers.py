from rest_framework import serializers
from .models import Rating
from users.serializers import ShortUserSerializer

class RatingSerializer(serializers.ModelSerializer):
    rated_by = ShortUserSerializer(read_only=True)
    class Meta:
        model = Rating
        fields = [
            "id",
            "value",
            "comment",
            "rated_by",
            "created_at",
        ]
        read_only_fields = ["id", "rated_by", "created_at"]


class RatingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["value", "comment", "course"]
