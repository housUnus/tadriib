from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

from .models import (
    SubscriptionPlan,
    UserSubscription,
    Order,
)
from .serializers import (
    SubscriptionPlanSerializer,
    UserSubscriptionSerializer,
    OrderSerializer,
)


# -------------------------------------------------
# Subscription Plan ViewSet
# -------------------------------------------------

class SubscriptionPlanViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SubscriptionPlan.objects.filter(status="active")
    serializer_class = SubscriptionPlanSerializer
    permission_classes = [permissions.AllowAny]


# -------------------------------------------------
# Order ViewSet
# -------------------------------------------------
class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, date=timezone.now())


# -------------------------------------------------
# User Subscription ViewSet
# -------------------------------------------------

class UserSubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = UserSubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserSubscription.objects.filter(user=self.request.user)

    @action(detail=False, methods=["get"])
    def active(self, request):
        subscription = UserSubscription.objects.filter(
            user=request.user,
            status="active",
        ).first()

        if not subscription:
            return Response({"detail": "No active subscription."})

        serializer = self.get_serializer(subscription)
        return Response(serializer.data)