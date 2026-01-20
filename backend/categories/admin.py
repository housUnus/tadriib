from django.contrib import admin
from unfold.admin import ModelAdmin
from mptt.admin import DraggableMPTTAdmin

from .models import Category


@admin.register(Category)
class CategoryAdmin(DraggableMPTTAdmin, ModelAdmin):
    list_display = (
        "tree_actions",
        "indented_title",
        "slug",
    )

    list_display_links = ("indented_title",)

    prepocpulated_fields = {"slug": ("name",)}
    search_fields = ("name",)
