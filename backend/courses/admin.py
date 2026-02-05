from django.contrib import admin
from django.db.models import Avg
from unfold.admin import ModelAdmin, TabularInline
from django import forms
from tinymce.widgets import TinyMCE

from .models import *

# ======================================================
# QUIZ DEEP STRUCTURE
# ======================================================

class QuestionBlockInline(TabularInline):
    model = QuestionBlock
    extra = 0
    fields = ("type", "order", "text", "image", "file")


class AnswerInline(TabularInline):
    model = Answer
    extra = 2
    fields = ("text", "is_correct")


class QuestionInline(TabularInline):
    model = Question
    extra = 0
    fields = ("answer_type", "points", "order")
    show_change_link = True


class QuizInline(TabularInline):
    model = Quiz
    extra = 0
    fields = ("title", "time_limit_minutes")
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

    list_filter = ("status", "level", "language", "categories")
    search_fields = ("title", "description", "instructor__email")
    filter_horizontal = ("categories",)

    inlines = [SectionInline, LearningOutcomeInline, RequirementInline]
    readonly_fields = ("published_at","slug")

    fieldsets = (
        ("Basic Info", {
            "fields": ("title", "slug", "short_description", "description", "instructor", "poster")
        }),
        ("Classification", {
            "fields": ("status", "level", "language", "categories", "primary_category")
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
    list_display = ("title", "section", "type", "order", "is_preview")
    list_filter = ("type",)
    ordering = ("section", "order")

    inlines = [
        VideoInline,
        ArticleInline,
        AttachmentInline,
        AssignmentInline,
        QuizInline,
    ]


# ======================================================
# QUIZ EDITOR
# ======================================================

@admin.register(Quiz)
class QuizAdmin(ModelAdmin):
    list_display = ("title", "content", "time_limit_minutes")
    inlines = [QuestionInline]


@admin.register(Question)
class QuestionAdmin(ModelAdmin):
    list_display = ("quiz", "answer_type", "points", "order")
    ordering = ("quiz", "order")
    inlines = [QuestionBlockInline, AnswerInline]


# ======================================================
# ANSWER TYPE MODELS
# ======================================================

@admin.register(TrueFalseAnswer)
class TrueFalseAdmin(ModelAdmin):
    list_display = ("question", "correct")


@admin.register(FillBlankAnswer)
class FillBlankAdmin(ModelAdmin):
    list_display = ("question", "correct_text", "case_sensitive")


@admin.register(EssayAnswer)
class EssayAdmin(ModelAdmin):
    list_display = ("question", "min_words")


@admin.register(FileUploadAnswer)
class FileUploadAdmin(ModelAdmin):
    list_display = ("question", "max_file_size_mb")


# ======================================================
# QUIZ SUBMISSIONS
# ======================================================

class QuestionSubmissionInline(TabularInline):
    model = QuestionSubmission
    extra = 0
    readonly_fields = (
        "question",
        "text_answer",
        "boolean_answer",
        "uploaded_file",
        "is_correct",
        "score",
    )


@admin.register(QuizSubmission)
class QuizSubmissionAdmin(ModelAdmin):
    list_display = ("user", "quiz", "status", "score", "submitted_at")
    list_filter = ("status",)
    inlines = [QuestionSubmissionInline]
