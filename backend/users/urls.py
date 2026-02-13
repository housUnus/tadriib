from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ChangePasswordView, InstructorViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'instructors', InstructorViewSet, basename='instructor')
router.register(r'users/change-password', ChangePasswordView, basename='change-password')

urlpatterns = router.urls