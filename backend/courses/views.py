from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from core.authentication import OptionalJWTAuthentication
from django.db.models import Prefetch

from nested_multipart_parser import NestedParser
from .models import Course, Section, Content, Document
from .serializers import (
    CourseListSerializer,
    CourseDetailSerializer,
    CourseCreateUpdateSerializer,
    CourseCreateListSerializer,
    DocumentSerializer,
)
from .constants import CourseLanguageTypes
from core.mixins import ListQueryMixin, PublicViewsMixin
from users.models import User
from ratings.models import Rating
from ratings.constants import RatingStatus
from .filters import CourseFilter
from .serializers import ContentWriteSerializer
from core.permissions import IsInstructor 
options = {
    "separator": "bracket"
}
class CourseViewSet(PublicViewsMixin, ListQueryMixin, GenericViewSet, RetrieveModelMixin, ListModelMixin):
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
        if self.action == "retrieve":
            return CourseDetailSerializer
        return CourseListSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"view_type": 'course'})
        context.update({'request': self.request})
        return context

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update", "destroy"]:
            return [IsAuthenticated()]
        return [AllowAny()]

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

    @action(detail=False, methods=["get"])
    def supported_languages(self, request):
        languages = [{"value": lang.value, "label": lang.label} for lang in CourseLanguageTypes]
        return Response(languages)

class CourseCreateViewSet(PublicViewsMixin, ListQueryMixin, ModelViewSet):
    lookup_field = "public_id"
    permission_classes = [IsAuthenticated, IsInstructor]
    queryset = Course.objects.with_stats().select_related("category")#type: ignore
    filterset_class = CourseFilter
    search_fields = ["title"]
    ordering_fields = ["average_rating", "created_at"]  
    ordering = ["-average_rating"]
    serializer_class = CourseCreateUpdateSerializer
    
    def get_serializer_class(self):
        if self.action == "retrieve":
            return CourseDetailSerializer
        if self.action == "list":
            return CourseCreateListSerializer
        return CourseCreateUpdateSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"view_type": 'course-create'})
        context.update({'request': self.request})
        return context

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

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        partial = kwargs.pop('partial', False)
        
        parser = NestedParser(request.data, options)
        parser.is_valid()
        data = parser.validate_data
        
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    @action(detail=True, methods=["post"], url_path="sections")
    def add_section(self, request, public_id=None):
        course = self.get_object()

        section = Section.objects.create(
            course=course,
            title=request.data.get("title", "")
        )

        return Response({"id": section.public_id})
    
    @action(detail=True, methods=["put"], url_path="sections/update")
    def update_section(self, request, public_id=None):
        section_id = request.data.get("sectionId")
        section = Section.objects.get(public_id=section_id, course__public_id=public_id)

        section.title = request.data.get("title", section.title)
        section.is_expanded = request.data.get("isExpanded", section.is_expanded)
        section.save()

        return Response({"success": True})
    
    @action(detail=True, methods=["post"], url_path="sections/delete")
    def delete_section(self, request, public_id=None):
        section_id = request.data.get("sectionId")
        Section.objects.filter(public_id=section_id, course__public_id=public_id).delete()
        return Response({"success": True})
    
    @action(detail=True, methods=["post"], url_path="sections/reorder")
    def reorder_sections(self, request, public_id=None):
        ids = request.data.get("sectionIds", [])

        for index, sid in enumerate(ids):
            Section.objects.filter(public_id=sid, course__public_id=public_id).update(order=index)
        return Response({"success": True})
    
    
    @action(detail=True, methods=["post"], url_path="items")
    def add_item(self, request, public_id=None):
        section_id = request.data.get("sectionId")
        type_ = request.data.get("type")
        section = Section.objects.get(public_id=section_id, course__public_id=public_id)

        content = Content.objects.create(
            section=section,
            type=type_,
            title=""
        )

        return Response({"id": content.public_id})
    
    
    @action(detail=True, methods=["PUT", "PATCH"], url_path="items/update")
    def update_item(self, request, public_id=None):
        section_id = request.data.get("sectionId")
        item_id = request.data.get("itemId")
        content = Content.objects.get(public_id=item_id, section__public_id=section_id, section__course__public_id=public_id)
        
        if content.type == 'video':
            parser = NestedParser(request.data, options)
            parser.is_valid()
            data = parser.validate_data
        else:
            data = request.data
            
        if 'is_main_preview' in data:
            Content.objects.filter(section__course__public_id=public_id).update(is_main_preview=False)

        s = ContentWriteSerializer(content, data=data, partial=True)
        s.is_valid(raise_exception=True) 
        instance = s.save()
        
        return Response({"success": True})
    
    @action(detail=True, methods=["PUT"], url_path="items/expand")
    def expand_item(self, request, public_id=None):
        section_id = request.data.get("sectionId")
        item_id = request.data.get("itemId")
        content = Content.objects.get(public_id=item_id, section__public_id=section_id, section__course__public_id=public_id)
        content.is_expanded = request.data.get("isExpanded", content.is_expanded)
        content.save()
        return Response({"success": True})
    
    @action(detail=True, methods=["post"], url_path="items/delete")
    def delete_item(self, request, public_id=None):
        section_id = request.data.get("sectionId")
        item_id = request.data.get("itemId")
        Content.objects.filter(public_id=item_id, section__public_id=section_id, section__course__public_id=public_id).delete()
        return Response({"success": True})
    
    @action(detail=True, methods=["post"], url_path="items/reorder")
    def reorder_items(self, request, public_id=None):
        section_id = request.data.get("sectionId")
        ids = request.data.get("itemIds", [])

        for index, iid in enumerate(ids):
            Content.objects.filter(public_id=iid, section__public_id=section_id, section__course__public_id=public_id).update(order=index)

        return Response({"success": True})
    
    
    @action(detail=True, methods=["put"])
    def update_requirements(self, request, public_id=None):
        course = self.get_object()

        serializer = self.get_serializer(
            course,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
    
    @action(detail=True, methods=["put"])
    def update_learning_outcomes(self, request, public_id=None):
        course = self.get_object()

        serializer = CourseCreateUpdateSerializer(
            course,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    @action(detail=True, methods=["post"], url_path="documents")
    def upload_document(self, request, public_id=None):
        parser = NestedParser(request.data, options)
        parser.is_valid()
        data = parser.validate_data
        item_id = data.get("itemId")
        content = Content.objects.get(public_id=item_id, section__course__public_id=public_id)
        
        s = DocumentSerializer(data={**data, "content": content.id}, context=self.get_serializer_context())
        s.is_valid(raise_exception=True)
        s.save()
        return Response(s.data)
    
    @action(detail=True, methods=["post"], url_path="documents/delete")
    def delete_document(self, request, public_id=None):
        document_id = request.data.get("attachmentId")
        Document.objects.filter(public_id=document_id).delete()
        return Response({"success": True})