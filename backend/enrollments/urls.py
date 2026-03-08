from rest_framework.routers import DefaultRouter
from .views import EnrollmentViewSet, EnrollmentProgressViewSet

router = DefaultRouter()
router.register("enrollments", EnrollmentViewSet, basename="enrollments")
router.register("enrollments-progress", EnrollmentProgressViewSet, basename="enrollment-progress")

urlpatterns = router.urls
