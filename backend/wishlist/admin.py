from django.contrib import admin
from .models import Wishlist
from unfold.admin import ModelAdmin

@admin.register(Wishlist)
class WishlistAdmin(ModelAdmin):
    list_display = ["user", "course", "created_at"]
    search_fields = ["user__email", "course__title"]
    list_filter = ["created_at"]
    autocomplete_fields = ["user", "course"]