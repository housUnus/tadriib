from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.ModelSerializer):
    breadcrumbs = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["breadcrumbs"]

    def get_breadcrumbs(self, obj):
        """
        Returns:
        [
          { name: "Programming", href: "/courses/programming" },
          { name: "Backend", href: "/courses/programming/backend" },
          { name: "Django", href: "/courses/programming/backend/django" }
        ]
        """
        categories = []
        current = obj
        path_slugs = []

        # Walk up the tree
        while current:
            categories.append(current)
            current = current.parent

        # Reverse to get root → leaf
        categories.reverse()

        breadcrumbs = []
        for cat in categories:
            path_slugs.append(cat.slug)
            breadcrumbs.append({
                "name": cat.name,
                "href": f"/courses/{'/'.join(path_slugs)}",
            })

        return breadcrumbs