from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline

from .models import (
    SubscriptionPlan,
    UserSubscription,
    Order,
    OrderItem,
)
from django.urls import reverse
from django.utils.html import format_html

# -------------------------------------------------
# Inline Order Items
# -------------------------------------------------

class OrderItemInline(TabularInline):
    model = OrderItem
    extra = 0
    fields = ("course", "subscription_plan", "amount", "enrollment_link")
    readonly_fields = ("enrollment_link",)

    def enrollment_link(self, obj):
        if hasattr(obj, "enrollment"):
            url = reverse(
                "admin:enrollments_enrollment_change",
                args=[obj.enrollment.id],
            )
            return format_html('<a href="{}"><span class="material-symbols-outlined">visibility</span></a>', url)
        return "-"

    enrollment_link.short_description = "Enrollment"

# -------------------------------------------------
# Subscription Plan Admin
# -------------------------------------------------

@admin.register(SubscriptionPlan)
class SubscriptionPlanAdmin(ModelAdmin):
    list_display = (
        "name",
        "cost",
        "display_billing_frequency_text",
        "status",
        "group",
    )
    list_filter = ("status", "recurrence_unit")
    search_fields = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = (
        "display_recurrent_unit_text",
        "display_billing_frequency_text",
    )


# -------------------------------------------------
# User Subscription Admin
# -------------------------------------------------

@admin.register(UserSubscription)
class UserSubscriptionAdmin(ModelAdmin):
    list_display = (
        "user",
        "subscription",
        "status",
        "start_date",
        "end_date",
        "next_billing_date",
    )
    list_filter = ("status", "subscription")
    search_fields = ("user__username", "user__email")
    autocomplete_fields = ("user", "subscription")


# -------------------------------------------------
# Order Admin
# -------------------------------------------------

@admin.register(Order)
class OrderAdmin(ModelAdmin):
    save_as = True
    list_display = (
        "id",
        "user",
        "total_amount",
        "status",
        "date",
    )
    list_display_links = list_display
    
    list_filter = ("status", "date")
    search_fields = ("user__username", "user__email")
    date_hierarchy = "date"
    inlines = [OrderItemInline]
    autocomplete_fields = ("user",)


# -------------------------------------------------
# Order Item Admin
# -------------------------------------------------

@admin.register(OrderItem)
class OrderItemAdmin(ModelAdmin):
    list_display = (
        "id",
        "order",
        "course",
        "subscription_plan",
        "amount",
    )

    list_filter = ("course", "subscription_plan")
    autocomplete_fields = ("order", "course", "subscription_plan")
    search_fields = ("order__user__username", "order__user__email")
    readonly_fields = ("enrollment_link",)

    def enrollment_link(self, obj):
        if hasattr(obj, "enrollment"):
            url = reverse(
                "admin:enrollments_enrollment_change",
                args=[obj.enrollment.id],
            )
            return format_html('<a href="{}">View Enrollment</a>', url)
        return "No enrollment"

    enrollment_link.short_description = "Enrollment"