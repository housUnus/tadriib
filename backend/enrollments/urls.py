from rest_framework.routers import DefaultRouter
from .views import EnrollmentViewSet, EnrollmentProgressViewSet, QuizSubmissionViewSet

router = DefaultRouter()
router.register("enrollments", EnrollmentViewSet, basename="enrollments")
router.register("enrollments-progress", EnrollmentProgressViewSet, basename="enrollment-progress")
router.register("quiz-submissions", QuizSubmissionViewSet, basename="quiz-submissions")

urlpatterns = router.urls
