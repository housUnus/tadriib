from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _
from .managers import UserManager
from core.constants import RolesTypes
from core.utils.slugify import generate_unique_slug

# ----------------------------
# Custom User
# ----------------------------
class User(AbstractUser):
    username = None
    email = models.EmailField(_("Email address"), unique=True)
    phone_number = models.CharField(_("Phone number"), max_length=20, blank=True)
    country = models.CharField(_("Country"), max_length=50, blank=True)
    is_active = models.BooleanField(_("Active"), default=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()  # type: ignore

    def __str__(self):
        return self.email

# ----------------------------
# Role
# ----------------------------
class Role(models.Model):
    type = models.CharField(_("Role name"), max_length=50, choices=RolesTypes, default=RolesTypes.STUDENT)
    
    class Meta:
        verbose_name = _("Role")
        verbose_name_plural = _("Roles")
    
    def __str__(self):
        return self.type

# ----------------------------
# Profile
# ----------------------------
class Profile(models.Model):
    
    slug_field = 'get_full_name'
    
    user = models.OneToOneField(
        'users.User', 
        on_delete=models.CASCADE, 
        related_name="profile",
        verbose_name=_("User")
    )
    slug = models.SlugField(_("Slug"), max_length=255, blank=True)

    # Roles
    roles = models.ManyToManyField(Role, related_name="profiles", verbose_name=_("Roles"))
    active_role = models.ForeignKey(Role, null=True, blank=True, on_delete=models.SET_NULL, related_name="+")
    # Common fields
    avatar = models.ImageField(_("Avatar"), upload_to="avatars/", blank=True, null=True)
    title = models.CharField(_("Title"), max_length=255, blank=True)
    bio = models.TextField(_("Bio"), blank=True)
    details = models.TextField(_("Details"), blank=True)  # teacher/user details, certifications, motivation

    # Teacher / expert fields (optional)
    is_verified_teacher = models.BooleanField(_("Verified Teacher"), default=False)
    expertise = models.CharField(_("Expertise"), max_length=255, blank=True)
    experience_years = models.PositiveIntegerField(_("Years of Experience"), null=True, blank=True)

    created_at = models.DateTimeField(_("Created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)
    
    @property
    def get_full_name(self):
        return f"{(self.user.first_name or '').capitalize()} {(self.user.last_name or '').capitalize()}".strip()
  
    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")

    def __str__(self):
        return f"{self.user.email}'s profile"

    def save(self, *args, **kwargs):
        if hasattr(self, "slug") and not self.slug and hasattr(self, "slug_field"):
            self.slug = generate_unique_slug(self, getattr(self, self.slug_field)) #type: ignore
        super().save(*args, **kwargs)