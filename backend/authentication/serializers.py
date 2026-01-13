from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, AuthenticationFailed #type: ignore
from rest_framework_simplejwt.settings import api_settings
from typing import Any
from django.contrib.auth import get_user_model
User = get_user_model()



class JwtUserSerializer(UserDetailsSerializer):
    roles = serializers.SerializerMethodField()
    active_role = serializers.SerializerMethodField()
    email_verified = serializers.SerializerMethodField()

    class Meta(UserDetailsSerializer.Meta):
        model = User
        fields = (
            "id",
            "email",
            "first_name",
            "last_name",
            "roles",
            "active_role",
            "email_verified",
        )

    def get_roles(self, user):
        if not hasattr(user, "profile"):
            return []
        return list(
            user.profile.roles.values_list("type", flat=True)
        )

    def get_active_role(self, user):
        if not hasattr(user, "profile"):
            return None
        return (
            user.profile.active_role.type
            if user.profile.active_role
            else None
        )

    def get_email_verified(self, user):
        return user.emailaddress_set.filter(verified=True).exists()

class UserRefreshSerializer(JwtUserSerializer):
    class Meta(UserDetailsSerializer.Meta):
        model = User
        fields = (
            "roles",
            "active_role",
            "email_verified",
        )

class JWTRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs: dict[str, Any]) -> dict[str, str]:
        refresh = self.token_class(attrs["refresh"])

        user_id = refresh.payload.get(api_settings.USER_ID_CLAIM, None)#type: ignore
        user = None
        if user_id and (
            user := get_user_model().objects.get(
                **{api_settings.USER_ID_FIELD: user_id}#type: ignore
            )
        ):
            if not api_settings.USER_AUTHENTICATION_RULE(user):#type: ignore
                raise AuthenticationFailed(
                    self.error_messages["no_active_account"],
                    "no_active_account",
                )
        data = {"access": str(refresh.access_token), 'user': UserRefreshSerializer(user).data}
        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass

            refresh.set_jti()
            refresh.set_exp()
            refresh.set_iat()
            refresh.outstand()

            data["refresh"] = str(refresh)

        return data
    
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
