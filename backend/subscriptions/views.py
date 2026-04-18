from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone

from .models import (
    SubscriptionPlan,
    UserSubscription,
    Order,
    OrderItem,
)
from courses.models import Course
from .serializers import (
    SubscriptionPlanSerializer,
    UserSubscriptionSerializer,
    OrderSerializer,
)
from .constants import OrderStatus

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
    lookup_field = "public_id"
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, date=timezone.now())
        
    def perform_update(self, serializer):
        serializer.save(user=self.request.user, date=timezone.now())
        
    @action(detail=False, methods=["post"])
    def create_course_order(self, request):
        course_id = request.data.get("course_id")
        course = Course.objects.get(public_id=course_id)

        order = Order.objects.create(
            user=request.user,
            date=timezone.now(),
            status=OrderStatus.DRAFT,
        )
        
        order.items.create(
            course=course,
            amount=course.price,
            order=order,
        )
        
        order.update_total_amount()

        serializer = self.get_serializer(order)
        return Response(serializer.data)


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