from rest_framework_nested import routers
from .views import CourseViewSet
from ratings.views import RatingViewSet

router = routers.SimpleRouter()#type: ignore
router.register(r"courses", CourseViewSet, basename="courses")

courses_router = routers.NestedSimpleRouter( router, r"courses", lookup="course")
courses_router.register(r"reviews", RatingViewSet, basename="course-reviews")

urlpatterns = [
    *router.urls,
    *courses_router.urls,
]
