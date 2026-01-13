from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ChangePasswordView

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'users/change-password', ChangePasswordView, basename='change-password')

urlpatterns = router.urls