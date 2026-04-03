from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Prefetch
from .models import Course, Section, Content
from .serializers import (
    CourseListSerializer,
    CourseDetailSerializer,
    CourseCreateUpdateSerializer,
)
from .constants import CourseLanguageTypes
from core.mixins import ListQueryMixin, PublicViewsMixin
from core.authentication import OptionalJWTAuthentication
from users.models import User
from ratings.models import Rating
from ratings.constants import RatingStatus
from .filters import CourseFilter

class CourseViewSet(PublicViewsMixin, ListQueryMixin, ModelViewSet):
    lookup_field = "slug"
    authentication_classes = [OptionalJWTAuthentication]
    permission_classes = [AllowAny]
    queryset = Course.objects.with_stats().select_related("category")#type: ignore
    filterset_class = CourseFilter
    search_fields = ["title"]
    ordering_fields = ["average_rating", "created_at"]  
    ordering = ["-average_rating"]
    
    def check_permissions(self, request):
        super().check_permissions(request)
    
    def get_serializer_class(self):
        if self.action == "list":
            return CourseListSerializer
        if self.action == "retrieve":
            return CourseDetailSerializer
        return CourseCreateUpdateSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"view_type": 'course'})
        return context

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated()]
        return [AllowAny()]

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

    def get_queryset(self):
        queryset = super().get_queryset()
        
        if self.action in ["retrieve", "update", "partial_update"]:
            queryset = queryset.with_stats().with_main_preview().prefetch_related(
                "sections__contents",
                "learning_outcomes",
                "requirements",
                Prefetch(
                    "instructor",
                    queryset=User.objects.with_stats(),
                ),
                Prefetch(
                    "ratings",
                    queryset=Rating.objects.filter(status=RatingStatus.APPROVED)
                    .select_related("rated_by")
                    .order_by("-created_at")[:5],
                    to_attr="latest_reviews",
                )
            )
        if self.action == 'list':
            sort_by = self.request.query_params.get("sortBy")
            if sort_by == "rating":
                queryset = queryset.order_by("-average_rating")
            elif sort_by == "newest":
                queryset = queryset.order_by("-created_at")
            # elif sort_by == "price-low":
            #     queryset = queryset.order_by("price_amount")
            # elif sort_by == "price-high":
            #     queryset = queryset.order_by("-price_amount")
            else:
                queryset = queryset.order_by("-average_rating")  # default

        # Only published courses for public users
        # if not self.request.user.is_authenticated:
        #     queryset = queryset.filter(status="published")
        return queryset

    @action(detail=True, methods=["post"])
    def add_section(self, request, pk=None):
        course = self.get_object()

        section = Section.objects.create(
            course=course,
            title=request.data.get("title", "")
        )

        return Response({"id": section.id})
    
    @action(detail=True, methods=["patch"], url_path="sections/(?P<section_id>[^/.]+)")
    def update_section(self, request, pk=None, section_id=None):
        section = Section.objects.get(id=section_id, course_id=pk)

        section.title = request.data.get("title", section.title)
        section.save()

        return Response({"success": True})
    
    @action(detail=True, methods=["delete"], url_path="sections/(?P<section_id>[^/.]+)")
    def delete_section(self, request, pk=None, section_id=None):
        Section.objects.filter(id=section_id, course_id=pk).delete()
        return Response({"success": True})
    
    @action(detail=True, methods=["post"])
    def reorder_sections(self, request, pk=None):
        ids = request.data.get("sectionIds", [])

        for index, sid in enumerate(ids):
            Section.objects.filter(id=sid, course_id=pk).update(order=index)

        return Response({"success": True})
    
    
    @action(detail=True, methods=["post"])
    def add_item(self, request, pk=None):
        section_id = request.data.get("sectionId")
        type_ = request.data.get("type")

        content = Content.objects.create(
            section_id=section_id,
            type=type_,
            title=""
        )

        return Response({"id": content.id})
    
    
    @action(detail=True, methods=["patch"])
    def update_item(self, request, pk=None):
        item_id = request.data.get("itemId")

        content = Content.objects.get(id=item_id)

        content.title = request.data.get("title", content.title)
        content.save()

        return Response({"success": True})
    
    @action(detail=True, methods=["delete"])
    def delete_item(self, request, pk=None):
        item_id = request.data.get("itemId")

        Content.objects.filter(id=item_id).delete()

        return Response({"success": True})
    
    @action(detail=True, methods=["post"])
    def reorder_items(self, request, pk=None):
        ids = request.data.get("itemIds", [])

        for index, iid in enumerate(ids):
            Content.objects.filter(id=iid).update(order=index)

        return Response({"success": True})
    
    @action(detail=False, methods=["get"])
    def supported_languages(self, request):
        languages = [{"value": lang.value, "label": lang.label} for lang in CourseLanguageTypes]
        return Response(languages)