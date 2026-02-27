from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Enrollment
from .serializers import EnrollmentSerializer
from core.mixins import CourseMixin, ListQueryMixin, StandardResultsSetPagination

class EnrollmentViewSet(CourseMixin, ListQueryMixin, ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    search_fields = ["course__title"]
    
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)