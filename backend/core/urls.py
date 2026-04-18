
from core.views import UploadImageView
from django.urls import path

urlpatterns = [
    path("upload-image/", UploadImageView.as_view()),
]