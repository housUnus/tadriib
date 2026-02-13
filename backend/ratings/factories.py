# ratings/factories.py

import factory
from faker import Faker
from ratings.models import Rating
from django.contrib.auth import get_user_model
from courses.models import Course
from ratings.constants import RatingStatus

fake = Faker()
User = get_user_model()


class RatingFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Rating

    rated_by = factory.Iterator(User.objects.all())#type: ignore
    course = factory.Iterator(Course.objects.all())#type: ignore

    value = factory.Faker("random_int", min=1, max=5)#type: ignore
    comment = factory.Faker("sentence")#type: ignore
    ip_address = factory.Faker("ipv4")#type: ignore
    status = RatingStatus.APPROVED  # or whatever default you want
