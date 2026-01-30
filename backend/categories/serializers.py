from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    path = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "name", "slug", "parent", "path"]

    def get_path(self, obj):
        return obj.get_full_path()