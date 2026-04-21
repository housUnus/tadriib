from django.contrib import admin
from django.db.models import Avg
from unfold.admin import ModelAdmin, TabularInline, StackedInline
from django import forms
from tinymce.widgets import TinyMCE

from .models import *

# ======================================================
# QUIZ DEEP STRUCTURE
# ======================================================

class QuestionInline(TabularInline):
    model = Question
    extra = 0
    fields = ("answer_type", "points", "order")
    show_change_link = True


class QuizInline(TabularInline):
    model = Quiz
    extra = 0
    fields = ("max_attempts", "can_pause", "show_correct_answers")
    show_change_link = True


# ======================================================
# CONTENT TYPE INLINES
# ======================================================

class VideoInline(TabularInline):
    model = Video
    extra = 0
    fields = ("file", "duration_seconds", "is_main_preview")


class ArticleAdminForm(forms.ModelForm):
    text = forms.CharField(
        widget=TinyMCE(attrs={"cols": 80, "rows": 20}),
        required=False,
    )

    class Meta:
        model = Article
        fields = "__all__"
        
class ArticleInline(TabularInline):
    form = ArticleAdminForm
    model = Article
    extra = 0
    fields = ("text",)


class AttachmentInline(TabularInline):
    model = Attachment
    extra = 0
    fields = ("file",)


class AssignmentInline(TabularInline):
    model = Assignment
    extra = 0
    fields = ("instructions",)

class ConferenceInline(TabularInline):
    model = Conference
    extra = 0
    fields = ("status", "starts_at")
    readonly_fields = ("room_name", "room_url")


# ======================================================
# CONTENT INLINE
# ======================================================

class ContentInline(TabularInline):
    model = Content
    extra = 0
    fields = ("title", "type", "order", "is_preview", "duration_minutes")
    ordering = ("order",)
    show_change_link = True


# ======================================================
# SECTION INLINE
# ======================================================

class SectionInline(TabularInline):
    model = Section
    extra = 0
    fields = ("title", "order")
    ordering = ("order",)
    show_change_link = True


# ======================================================
# Requirements and Outcomes
# ======================================================
class LearningOutcomeInline(TabularInline):
    model = CourseLearningOutcome
    extra = 1
    fields = ("text", )
    
class RequirementInline(TabularInline):
    model = CourseRequirement
    extra = 1
    fields = ("text", )


# ======================================================
# COURSE (ROOT)
# ======================================================

class CourseAdminForm(forms.ModelForm):
    description = forms.CharField(
        widget=TinyMCE(attrs={"cols": 80, "rows": 20}),
        required=False,
    )

    class Meta:
        model = Course
        fields = "__all__"
        
@admin.register(Course)
class CourseAdmin(ModelAdmin):
    form = CourseAdminForm

    list_display = (
        "title",
        "instructor",
        "status_badge",
        "level",
        "language",
        "published_at",
        # "average_rating",
    )

    list_filter = ("status", "level", "language", "category", "sub_category")
    search_fields = ("title", "description", "instructor__email")

    inlines = [SectionInline, LearningOutcomeInline, RequirementInline]
    readonly_fields = ("published_at","slug", "public_id")

    fieldsets = (
        ("Basic Info", {
            "fields": ("title", "slug", "public_id", "short_description", "description", "instructor", "poster", "type")
        }),
        ("Classification", {
            "fields": ("status", "level", "language", "category", "sub_category", "price")
        }),
        ("Publishing", {
            "fields": ("published_at",)
        }),
    )

    def status_badge(self, obj):
        colors = {
            "draft": "gray",
            "published": "green",
            "archived": "red",
        }
        return obj.status, colors.get(obj.status, "gray")

    # def average_rating(self, obj):
    #     return obj.reviews.aggregate(avg=Avg("rating"))["avg"] or "-"

    status_badge.short_description = "Status"
    # average_rating.short_description = "Rating"


# ======================================================
# SECTION
# ======================================================

@admin.register(Section)
class SectionAdmin(ModelAdmin):
    list_display = ("title", "course", "order")
    ordering = ("course", "order")
    inlines = [ContentInline]


# ======================================================
# CONTENT
# ======================================================

@admin.register(Content)
class ContentAdmin(ModelAdmin):
    save_as = True
    list_display = ("title", "section", "type", "order", "is_preview")
    list_filter = ("type",)
    ordering = ("section", "order")

    def get_inlines(self, request, obj):
        if not obj:
            return []

        if obj.type == "video":
            return [VideoInline]

        if obj.type == "article":
            return [ArticleInline]

        if obj.type == "attachment":
            return [AttachmentInline]

        if obj.type == "assignment":
            return [AssignmentInline]

        if obj.type == "quiz":
            return [QuizInline]
        
        if obj.type == "conference":
            return [ConferenceInline]

        return []


# ======================================================
# QUIZ EDITOR
# ======================================================

class OptionInline(TabularInline):
    model = Option
    extra = 0

class TrueFalseInline(StackedInline):
    model = TrueFalseAnswer
    extra = 0
    max_num = 1

class FillBlankInline(StackedInline):
    model = FillBlankAnswer
    extra = 0
    max_num = 1

class EssayInline(StackedInline):
    model = EssayAnswer
    extra = 0
    max_num = 1

class FileUploadInline(StackedInline):
    model = FileUploadAnswer
    extra = 0
    max_num = 1

@admin.register(Quiz)
class QuizAdmin(ModelAdmin):
    list_display = ("can_pause", "show_correct_answers")
    ordering = ("id",)
    inlines = [QuestionInline]

class QuestionAdminForm(forms.ModelForm):
    answer_explanation = forms.CharField(
        widget=TinyMCE(attrs={"cols": 80, "rows": 15}),
        required=False,
    )

    class Meta:
        model = Question
        fields = "__all__"

@admin.register(Question)
class QuestionAdmin(ModelAdmin):
    form = QuestionAdminForm
    save_as = True
    list_display = ("text", "answer_type", "points", "order")
    ordering = ("order",)
    inlines = [OptionInline, TrueFalseInline, FillBlankInline, EssayInline, FileUploadInline]