from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Role, Profile
from django.utils.translation import gettext_lazy as _
from unfold.admin import ModelAdmin, StackedInline
from django import forms
from tinymce.widgets import TinyMCE

class ProfileAdminForm(forms.ModelForm):
    details = forms.CharField(
        widget=TinyMCE(attrs={"cols": 80, "rows": 20}),
        required=False,
    )
    class Meta:
        model = Profile
        fields = "__all__"
        
@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    # Fields to display in the admin list
    list_display = ('email', 'phone_number', 'country', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'profile__roles')

    # Fields used when editing a user
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('phone_number', 'country')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    # Fields for creating a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ('groups', 'user_permissions',)


@admin.register(Role)
class RoleAdmin(ModelAdmin):
    list_display = ('type',)
    search_fields = ('type',)
    

class ProfileInline(StackedInline):
    form = ProfileAdminForm
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class CustomUserAdmin(UserAdmin, ModelAdmin):
    inlines = (ProfileInline,)
    list_display = ('email', 'is_staff', 'is_active', 'get_roles')

    def get_roles(self, obj):
        return ", ".join([role.type for role in obj.profile.roles.all()])
    get_roles.short_description = 'Roles'

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
