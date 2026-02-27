from django.contrib import admin
from django.utils import timezone
from unfold.admin import ModelAdmin, TabularInline

from .models import Enrollment


@admin.register(Enrollment)
class EnrollmentAdmin(ModelAdmin):
    list_display = (
        "id",
        "user",
        "course",
        "status",
        "expires_at",
        "is_active_display",
        "created_at",
    )
    list_filter = ("status", "expires_at", "created_at")
    search_fields = (
        "user__username",
        "user__email",
        "course__title",
    )
    autocomplete_fields = ("user", "course", "order_item")
    readonly_fields = ("created_at", "updated_at")

    def is_active_display(self, obj):
        if obj.expires_at and obj.expires_at < timezone.now():
            return False
        return obj.is_active

    is_active_display.boolean = True
    is_active_display.short_description = "Active?"
    


# ======================================================
# QUIZ SUBMISSIONS
# ======================================================

# class QuestionSubmissionInline(TabularInline):
#     model = QuestionSubmission
#     extra = 0
#     readonly_fields = (
#         "question",
#         "text_answer",
#         "boolean_answer",
#         "uploaded_file",
#         "is_correct",
#         "score",
#     )


# @admin.register(QuizSubmission)
# class QuizSubmissionAdmin(ModelAdmin):
#     list_display = ("user", "quiz", "status", "score", "submitted_at")
#     list_filter = ("status",)
#     inlines = [QuestionSubmissionInline]
