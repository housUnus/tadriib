from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EditorImage

class UploadImageView(APIView):
    def post(self, request):
        file = request.FILES.get("image")

        if not file:
            return Response({"error": "No image provided"}, status=400)

        image = EditorImage.objects.create(image=file)

        return Response({
            "url": request.build_absolute_uri(image.image.url)
        })