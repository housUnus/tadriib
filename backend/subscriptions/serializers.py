from rest_framework import serializers
from django.utils import timezone

from .models import (
    SubscriptionPlan,
    UserSubscription,
    Order,
    OrderItem,
)
from courses.models import Course
from decimal import Decimal


# -------------------------------------------------
# Subscription Plan Serializer
# -------------------------------------------------

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    billing_frequency = serializers.CharField(
        source="display_billing_frequency_text",
        read_only=True,
    )

    class Meta:
        model = SubscriptionPlan
        fields = "__all__"


# -------------------------------------------------
# Course Minimal Serializer
# -------------------------------------------------

class CourseMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ("id", "title", "price")


# -------------------------------------------------
# Order Item Serializer
# -------------------------------------------------

class OrderItemSerializer(serializers.ModelSerializer):
    course_detail = CourseMinimalSerializer(source="course", read_only=True)
    subscription_plan_detail = SubscriptionPlanSerializer(
        source="subscription_plan",
        read_only=True
    )

    class Meta:
        model = OrderItem
        fields = (
            "id",
            "course",
            "subscription_plan",
            "course_detail",
            "subscription_plan_detail",
            "amount",
        )

    def validate(self, attrs):
        course = attrs.get("course")
        subscription_plan = attrs.get("subscription_plan")

        if not course and not subscription_plan:
            raise serializers.ValidationError(
                "Either course or subscription_plan must be provided."
            )

        if course and subscription_plan:
            raise serializers.ValidationError(
                "Only one of course or subscription_plan can be provided."
            )

        return attrs


# -------------------------------------------------
# Order Serializer
# -------------------------------------------------

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "user",
            "date",
            "amount",
            "status",
            "items",
        )
        read_only_fields = ("status",)

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        order = Order.objects.create(**validated_data)

        total = Decimal("0")

        for item_data in items_data:
            item = OrderItem.objects.create(order=order, **item_data)
            total += item.amount

        order.total_amount = total
        order.save()

        return order


# -------------------------------------------------
# User Subscription Serializer
# -------------------------------------------------

class UserSubscriptionSerializer(serializers.ModelSerializer):
    subscription_detail = SubscriptionPlanSerializer(
        source="subscription",
        read_only=True,
    )

    class Meta:
        model = UserSubscription
        fields = "__all__"

    def validate(self, attrs):
        if attrs.get("end_date") and attrs["end_date"] < timezone.now():
            raise serializers.ValidationError("End date cannot be in the past.")
        return attrs