from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Rating
from .serializers import RatingSerializer, RatingCreateSerializer


class RatingViewSet(ModelViewSet):
    queryset = Rating.objects.select_related("course", "rated_by")
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == "create":
            return RatingCreateSerializer
        return RatingSerializer

    def perform_create(self, serializer):
        request = self.request

        serializer.save(
            rated_by=request.user if request.user.is_authenticated else None,
            ip_address=self.get_client_ip(),
        )

    def get_client_ip(self):
        request = self.request
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            return x_forwarded_for.split(",")[0]
        return request.META.get("REMOTE_ADDR")
