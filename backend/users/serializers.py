from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import get_user_model
from drf_writable_nested.serializers import WritableNestedModelSerializer
from .models import Profile, Role

User = get_user_model()

class UserCreateSerializer(RegisterSerializer):
    password2 = None  # remove password2

    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="A user with this email already exists."
            )
        ]
    )

    first_name = serializers.CharField(required=False)
    last_name = serializers.CharField(required=False)
    country = serializers.CharField(required=False)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data["first_name"] = self.validated_data.get("first_name", "") #type: ignore
        data["first_name"] = self.validated_data.get("first_name", "") #type: ignore
        data["phone_number"] = self.validated_data.get("phone_number", "") #type: ignore
        data["country"] = self.validated_data.get("country", "") #type: ignore
        return data

    def validate(self, attrs):
        return attrs
    class Meta:
        model = User
        fields = (
            "email",
            "password1",
            "first_name",
            "last_name",
            "phone_number",
            "country",
        )


class ProfileSerializer(serializers.ModelSerializer):
    roles = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        many=True,
        required=False
    )
    active_role = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(),
        required=False,
        allow_null=True
    )
    class Meta:
        model = Profile
        fields = (
            "avatar",
            "bio",
            "details",
            "roles",
            "active_role",
            "is_verified_teacher",
            "expertise",
            "experience_years",
        )
        
class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(source='profile.avatar', required=False, allow_null=True)
    details = serializers.CharField(source='profile.details', required=False)
    expertise = serializers.CharField(source='profile.expertise', required=False)
    experience_years = serializers.IntegerField(source='profile.experience_years', required=False)

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "phone_number",
            "country",
            "avatar",
            "details",
            "expertise",
            "experience_years",
        )
        read_only_fields = ("id", "email")
        
    def validate_avatar(self, value):
        if value == "":
            return None
        return value

        
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        profile = Profile.objects.get_or_create(user=instance)[0]
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()

        return instance

#------------- SPECIAL CLASSES --------------
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password1 = serializers.CharField(required=True)
    new_password2 = serializers.CharField(required=True)
    class Meta:
        model = User

    def validate(self, attrs):
        data = super().validate(attrs)
        if data['new_password1'] != data['new_password2']:
            raise serializers.ValidationError({"new_password": "Passwords must match."})
        return data
