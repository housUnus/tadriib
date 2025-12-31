from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Role, Profile
from django.utils.translation import gettext_lazy as _

@admin.register(User)
class UserAdmin(BaseUserAdmin):
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
class RoleAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'

class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline,)
    list_display = ('email', 'is_staff', 'is_active', 'get_roles')

    def get_roles(self, obj):
        return ", ".join([role.name for role in obj.profile.roles.all()])
    get_roles.short_description = 'Roles'

admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
