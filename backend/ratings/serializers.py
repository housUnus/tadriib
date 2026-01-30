from rest_framework import serializers
from .models import Rating

class RatingSerializer(serializers.ModelSerializer):
    rated_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Rating
        fields = [
            "id",
            "value",
            "comment",
            "rated_by",
            "ip_address",
            "course",
            "created_at",
        ]
        read_only_fields = ["id", "rated_by", "ip_address", "created_at"]


class RatingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ["value", "comment", "course"]
