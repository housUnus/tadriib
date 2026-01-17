from rest_framework import serializers

class PublicSerializerMixin:
    id = serializers.UUIDField(source="public_id", read_only=True)
