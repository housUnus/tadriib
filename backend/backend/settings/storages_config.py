import os
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent.parent

USE_DCN = os.getenv("USE_DCN") == "True"
if USE_DCN:
    AWS_ACCESS_KEY_ID = os.getenv("S3_ACCESS_KEY")
    AWS_SECRET_ACCESS_KEY = os.getenv("S3_SECRET_KEY")
    AWS_STORAGE_BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

    AWS_S3_ENDPOINT_URL = os.getenv("S3_ENDPOINT")
    AWS_S3_REGION_NAME = "ewr1"  # example


    STORAGES = {
        "default": {
            "BACKEND": "storages.backends.s3.S3Storage",
        },
        "staticfiles": {
            "BACKEND": "storages.backends.s3.S3Storage",
        },
    }
    STATIC_URL = f"{AWS_S3_ENDPOINT_URL}/{AWS_STORAGE_BUCKET_NAME}/static/"
    MEDIA_URL = f"{AWS_S3_ENDPOINT_URL}/{AWS_STORAGE_BUCKET_NAME}/media/"
    AWS_QUERYSTRING_AUTH = False
    AWS_DEFAULT_ACL = "public-read"

    AWS_S3_OBJECT_PARAMETERS = {
        "CacheControl": "max-age=86400",
    }
    
else:
    STATIC_ROOT = BASE_DIR / "staticfiles"
    MEDIA_ROOT = BASE_DIR / "mediafiles"
    STATIC_URL = 'static/'
    MEDIA_URL = 'media/'