from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(RegisterSerializer):
    password2 = None  # remove the password2 field

    # optional extra fields
    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    country = serializers.CharField(required=False)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        # Include your custom fields
        data["first_name"] = self.validated_data.get("first_name", "")  #type: ignore
        data["last_name"] = self.validated_data.get("last_name", "") #type: ignore
        data["country"] = self.validated_data.get("country", "") #type: ignore
        # Use only password1
        return data
    
    def validate(self, attrs):
        return attrs
    
class UserSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
        )
