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

        return []


# ======================================================
# QUIZ EDITOR
# ======================================================
class QuestionBlockInline(StackedInline):
    model = QuestionBlock
    extra = 0
    class Media:
        js = ("admin/js/question_block_inline.js",)

class SuggestionInline(TabularInline):
    model = Suggestion
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
    
class SegmentInline(StackedInline):
    model = Segment
    extra = 0
    show_change_link = True
    
@admin.register(Segment)
class SegmentAdmin(ModelAdmin):
    list_display = ("title", "quiz", "order")
    ordering = ("quiz", "order")
    inlines = [QuestionInline]

@admin.register(Quiz)
class QuizAdmin(ModelAdmin):
    list_display = ("title", "time_limit_minutes")
    ordering = ("id",)
    inlines = [SegmentInline]

@admin.register(Question)
class QuestionAdmin(ModelAdmin):
    save_as = True
    list_display = ("segment", "answer_type", "points", "order")
    ordering = ("segment", "order")
    inlines = [QuestionBlockInline, SuggestionInline, TrueFalseInline, FillBlankInline, EssayInline, FileUploadInline]

    def get_inlines(self, request, obj=None):
        """Show only the relevant inline depending on question type"""
        inlines = [QuestionBlockInline, SuggestionInline]
        if obj:
            if obj.answer_type == "true_false":
                inlines.append(TrueFalseInline)
            elif obj.answer_type == "fill_blank":
                inlines.append(FillBlankInline)
            elif obj.answer_type == "essay":
                inlines.append(EssayInline)
            elif obj.answer_type == "file_upload":
                inlines.append(FileUploadInline)
        return inlines