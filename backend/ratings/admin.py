from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import Rating


@admin.register(Rating)
class RatingAdmin(ModelAdmin):
    list_display = (
        "course",
        "value",
        "rated_by",
        "ip_address",
        "created_at",
        "status",
    )

    list_filter = (
        "value",
        "course",
        "created_at",
        "status",
    )

    search_fields = (
        "comment",
        "rated_by__email",
        "course__title",
        "ip_address",
    )

    readonly_fields = (
        # "rated_by",
        "ip_address",
        "created_at",
        "updated_at",
    )

    ordering = ("-created_at",)

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "course",
                    "value",
                    "comment",
                    "rated_by",
                    "status",
                )
            },
        ),
        (
            "Metadata",
            {
                "fields": (
                    # "rated_by",
                    "ip_address",
                    "created_at",
                )
            },
        ),
    )
