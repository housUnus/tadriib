from rest_framework.permissions import BasePermission, SAFE_METHODS
from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from users.models import User

class IsInstructorOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.instructor == request.user
    
class IsInstructor(BasePermission):
    def has_permission(self, request, view):
        user: Optional["User"] = request.user
        return user and user.is_authenticated and user.is_instructor

