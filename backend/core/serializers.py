from rest_framework import serializers

class PublicSerializerMixin:
    def get_fields(self):
        fields = super().get_fields() # type: ignore
        fields["id"] = serializers.UUIDField(
            source="public_id",
            read_only=True
        )
        return fields