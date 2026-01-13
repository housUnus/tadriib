from pathlib import Path
from datetime import timedelta
import os

DEBUG = os.getenv("DEBUG") == "True"
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
GOOGLE_CLIENT_ID=os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET=os.getenv("GOOGLE_CLIENT_SECRET")


SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=10),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "TOKEN_REFRESH_SERIALIZER": "authentication.serializers.JWTRefreshSerializer",
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": True,
    "SIGNING_KEY": "complexsigningkey",  # generate a key and replace me
    "ALGORITHM": "HS512",
}

# Allauth settings
SITE_ID = 1  # make sure SITE_ID is set
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USERNAME_REQUIRED=False
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "optional"
ACCOUNT_SIGNUP_FIELDS = ["email", "phone_number", "first_name", "last_name"]
ACCOUNT_LOGIN_ON_EMAIL_CONFIRMATION=True
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL=f'{FRONTEND_URL}/'
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL=f'{FRONTEND_URL}/'
ACCOUNT_CONFIRM_EMAIL_ON_GET=False
ACCOUNT_EMAIL_VERIFICATION_SUPPORTS_RESEND=True

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = [
        f"{FRONTEND_URL}",
        "http://127.0.0.1:3000/",
    ]
    
    
#REST AUTH
# <EMAIL_CONFIRM_REDIRECT_BASE_URL>/<key>
EMAIL_CONFIRM_REDIRECT_BASE_URL = \
    f"{FRONTEND_URL}/auth/verify-email/"

# <PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL>/<uidb64>/<token>/
PASSWORD_RESET_CONFIRM_REDIRECT_BASE_URL = \
    f"{FRONTEND_URL}/password-reset/confirm/"
    
REST_AUTH  = {
    "REGISTER_SERIALIZER": "users.serializers.UserCreateSerializer",
    "USER_DETAILS_SERIALIZER": "authentication.serializers.JwtUserSerializer",
    'JWT_AUTH_RETURN_EXPIRATION': True,
    'USE_JWT': True,
    'JWT_AUTH_REFRESH_COOKIE': 'refresh',
    'JWT_AUTH_HTTPONLY': False,
}


SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "APP": {
            "client_id": GOOGLE_CLIENT_ID,  # replace me
            "secret": GOOGLE_CLIENT_SECRET,        # replace me
            "key": "",                               # leave empty
        },
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
        "VERIFIED_EMAIL": True,
    },
}

HEADLESS_FRONTEND_URLS = {
    "account_confirm_email": f"{FRONTEND_URL}"+"/auth/verify-email/?key={key}",
    # "account_reset_password_from_key": "https://app.org/account/password/reset/key/{key}",
    # "account_signup": "https://app.org/account/signup",
}