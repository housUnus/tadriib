from django.db import models
from core.models import BaseModel
from django.utils.translation import gettext_lazy as _

class Rating(BaseModel):
    CHOICES = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    ]
    
    rated_by = models.ForeignKey("users.User", verbose_name=_("Rated By"), on_delete=models.CASCADE, null=True, blank=True)
    ip_address = models.GenericIPAddressField(_("Ip Address"), protocol="both", unpack_ipv4=False, default="127.1.1.0", null=True, blank=True)
    
    value =  models.IntegerField(_("Rating Value"), choices=CHOICES, default=0)
    comment = models.TextField(_("Comment"), blank=True, null=True)
    course = models.ForeignKey("courses.Course", verbose_name=_("Course"), on_delete=models.CASCADE, related_name="ratings")