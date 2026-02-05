import os
import subprocess
import json
import boto3
from django.conf import settings
import tempfile
from pathlib import Path


def get_temp_file_from_field(file_field) -> str:
    suffix = Path(file_field.name).suffix
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        for chunk in file_field.chunks():
            tmp.write(chunk)
        return tmp.name

def generate_presigned_url(file_name: str, expires=300) -> str:
    s3 = boto3.client(
        "s3",
        endpoint_url=settings.AWS_S3_ENDPOINT_URL,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
    )

    return s3.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
            "Key": file_name,
        },
        ExpiresIn=expires,
    )


def get_video_duration_from_url(file_path: str) -> int:
    result = subprocess.run(
        [
            "ffprobe",
            "-v", "error",
            "-show_entries", "format=duration",
            "-of", "json",
            file_path,
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    data = json.loads(result.stdout)
    return int(float(data["format"]["duration"]))

def get_video_duration_seconds(file) -> int:
    duration = 0
    if settings.USE_DCN:
        try:
            url = generate_presigned_url(file.name)
            duration = get_video_duration_from_url(url)
        except Exception:
            temp_path = get_temp_file_from_field(file)
            try:
                duration = get_video_duration_seconds(temp_path)
            finally:
                os.remove(temp_path)
    else:
        duration = get_video_duration_from_url(file.path)
    return duration