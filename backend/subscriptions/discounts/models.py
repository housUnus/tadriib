class Discount(models.Model):
    TYPE_CHOICES = [
        ('percentage', 'Percentage'),
        ('fixed', 'Fixed Amount'),
    ]

    code = models.CharField(max_length=50, unique=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    value = models.DecimalField(max_digits=10, decimal_places=2)

    active = models.BooleanField(default=True)

    # optional constraints
    max_uses = models.IntegerField(null=True, blank=True)
    used_count = models.IntegerField(default=0)

    valid_from = models.DateTimeField(null=True, blank=True)
    valid_until = models.DateTimeField(null=True, blank=True)

    # optional: limit to specific lecture
    lecture = models.ForeignKey('Lecture', null=True, blank=True, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    
    
from django.utils import timezone
from decimal import Decimal
def apply_discount(discount: Discount, amount: Decimal, lecture=None):
    now = timezone.now()

    if not discount.active:
        raise ValueError("Invalid discount")

    if discount.valid_from and discount.valid_from > now:
        raise ValueError("Discount not started")

    if discount.valid_until and discount.valid_until < now:
        raise ValueError("Discount expired")

    if discount.max_uses and discount.used_count >= discount.max_uses:
        raise ValueError("Discount usage exceeded")

    if discount.lecture and discount.lecture != lecture:
        raise ValueError("Discount not valid for this lecture")

    # Apply discount
    if discount.type == 'percentage':
        discount_amount = amount * (discount.value / Decimal('100'))
    else:
        discount_amount = discount.value

    final_amount = max(amount - discount_amount, Decimal('0'))

    return final_amount, discount_amount