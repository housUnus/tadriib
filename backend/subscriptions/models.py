"""Models for the Flexible Subscriptions app."""
from datetime import timedelta
from django.utils import timezone

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from courses.models import Course
from enrollments.models import EnrollmentProgress
from .constants import OrderStatus, PlanStatus, SubscriptionStatus, SubscriptionFrequency
from core.models import BaseModel
from enrollments.models import Enrollment
import pydash as __

class SubscriptionPlan(models.Model):
    name = models.CharField(
        help_text=_('the name of the subscription plan'),
        max_length=128,
    )
    slug = models.SlugField(
        blank=True,
        help_text=_('slug to reference the subscription plan'),
        max_length=128,
        null=True,
        unique=True,
    )
    description = models.CharField(
        blank=True,
        help_text=_('a description of the subscription plan'),
        max_length=512,
        null=True,
    )
    group = models.ForeignKey(
        Group,
        blank=True,
        help_text=_('the Django auth group for this plan'),
        null=True,
        on_delete=models.SET_NULL,
        related_name='plans',
    )
    
    grace_period = models.PositiveIntegerField(
        default=0,
        help_text=_(
            'how many days after the subscription ends before the '
            'subscription expires'
        ),
    )
    
    recurrence_period = models.PositiveSmallIntegerField(
        default=1,
        help_text=_('how often the plan is billed (per recurrence unit)'),
        validators=[MinValueValidator(1)],
    )
    recurrence_unit = models.CharField(
        choices=SubscriptionFrequency.choices,
        default=SubscriptionFrequency.MONTH,
        max_length=1,
    )
    cost = models.DecimalField(
        blank=True,
        decimal_places=4,
        help_text=_('the cost per recurrence of the plan'),
        max_digits=19,
        null=True,
    )
    
    status = models.CharField(
        choices=PlanStatus.choices,
        default=PlanStatus.ACTIVE,
        max_length=20,
    )

    @property
    def display_recurrent_unit_text(self):
        """Converts recurrence_unit integer to text."""
        return self.recurrence_unit

    @property
    def display_billing_frequency_text(self):
        """Generates human-readable billing frequency."""
        conversion = {
            SubscriptionFrequency.ONCE.label: 'one-time',
            SubscriptionFrequency.SECOND.label: {'singular': 'per second', 'plural': 'seconds'},
            SubscriptionFrequency.MINUTE.label: {'singular': 'per minute', 'plural': 'minutes'},
            SubscriptionFrequency.HOUR.label: {'singular': 'per hour', 'plural': 'hours'},
            SubscriptionFrequency.DAY.label: {'singular': 'per day', 'plural': 'days'},
            SubscriptionFrequency.WEEK.label: {'singular': 'per week', 'plural': 'weeks'},
            SubscriptionFrequency.MONTH.label: {'singular': 'per month', 'plural': 'months'},
            SubscriptionFrequency.YEAR.label: {'singular': 'per year', 'plural': 'years'},
        }

        if self.recurrence_unit == SubscriptionFrequency.ONCE:
            return conversion[SubscriptionFrequency.ONCE]

        if self.recurrence_period == 1:
            return conversion[self.recurrence_unit]['singular']

        return 'every {} {}'.format(
            self.recurrence_period, conversion[self.recurrence_unit]['plural']
        )

    def next_billing_datetime(self, current):
        """Calculates next billing date for provided datetime.
            Parameters:
                current (datetime): The current datetime to compare against.
            Returns:
                datetime: The next time billing will be due.
        """
        if self.recurrence_unit == SubscriptionFrequency.SECOND:
            delta = timedelta(seconds=self.recurrence_period)
        elif self.recurrence_unit == SubscriptionFrequency.MINUTE:
            delta = timedelta(minutes=self.recurrence_period)
        elif self.recurrence_unit == SubscriptionFrequency.HOUR:
            delta = timedelta(hours=self.recurrence_period)
        elif self.recurrence_unit == SubscriptionFrequency.DAY:
            delta = timedelta(days=self.recurrence_period)
        elif self.recurrence_unit == SubscriptionFrequency.WEEK:
            delta = timedelta(weeks=self.recurrence_period)
        elif self.recurrence_unit == SubscriptionFrequency.MONTH:
            # Adds the average number of days per month as per:
            # This handle any issues with months < 31 days and leap years
            delta = timedelta(
                days=30.4368 * self.recurrence_period
            )
        elif self.recurrence_unit == SubscriptionFrequency.YEAR:
            # Adds the average number of days per year as per:
            # This handle any issues with leap years
            delta = timedelta(
                days=365.2425 * self.recurrence_period
            )
        else:
            # If no recurrence period, no next billing datetime
            return None

        return current + delta


    class Meta:
        permissions = (
            ('subscriptions', 'Can interact with subscription details'),
        )

    def __str__(self):
        return self.name

class UserSubscription(BaseModel):
    user = models.ForeignKey(
        get_user_model(),
        help_text=_('the user this subscription applies to'),
        null=True,
        on_delete=models.CASCADE,
        related_name='subscriptions',
    )
    subscription = models.ForeignKey(
        SubscriptionPlan,
        help_text=_('the plan and billing frequency for this user'),
        null=True,
        on_delete=models.CASCADE,
        related_name='subscriptions'
    )
    start_date = models.DateTimeField(
        blank=True,
        help_text=_('the date to start billing this subscription'),
        null=True,
        verbose_name='billing start date',
    )
    end_date = models.DateTimeField(
        blank=True,
        help_text=_('the date to finish billing this subscription'),
        null=True,
        verbose_name='billing start end',
    )
    next_billing_date = models.DateTimeField(
        blank=True,
        help_text=_('the next date billing is due'),
        null=True,
        verbose_name='next start date',
    )
    status=models.CharField(
        choices=SubscriptionStatus.choices,
        default=SubscriptionStatus.ACTIVE,
        help_text=_('the status of the subscription'),
        max_length=128,
        blank=True,
        null=True,
    )


class Order(BaseModel):
    items: models.Manager["OrderItem"]

    user = models.ForeignKey(
        get_user_model(),
        help_text=_('the user that this subscription was billed for'),
        null=True,
        on_delete=models.SET_NULL,
        related_name='subscription_transactions'
    )
    
    date = models.DateTimeField(
        help_text=_('the datetime the transaction was billed'),
        verbose_name='transaction date',
    )
    
    total_amount = models.DecimalField(
        decimal_places=4,
        help_text=_('how much was billed for the user'),
        max_digits=19,
        null=True,
        blank=True,
    )
    
    status = models.CharField(
        choices=OrderStatus.choices,
        default=OrderStatus.DRAFT,
        max_length=128,
        blank=True,
        null=True,
    )
    
    @property
    def is_paid(self):
        return self.status == OrderStatus.PAID
    
    def update_total_amount(self):
        self.total_amount = sum([item.amount for item in self.items.all()])
        self.save()
        
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        for item in self.items.all():
            item.create_enrollment()
    

class OrderItem(models.Model):
    enrollment:"Enrollment"
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    course = models.ForeignKey(Course, null=True, blank=True, on_delete=models.CASCADE)
    subscription_plan = models.ForeignKey(
        SubscriptionPlan,
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    def create_enrollment(self):
        expires_at = None
        order: Order = self.order

        if order.is_paid and self.course:
            if __.get(self, 'enrollment'):
                return 
            expires_at = timezone.now() + timedelta(days=self.course.access_duration_days) if self.course.access_duration_days else None
            enrollment = Enrollment.objects.create(
                user=self.order.user,
                course=self.course,
                order_item=self,
                expires_at=expires_at,
            )
            EnrollmentProgress.objects.get_or_create(enrollment=enrollment)
            
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.create_enrollment()
        

class Cart(models.Model):
    items: models.Manager["CartItem"]
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    course = models.ForeignKey(Course, null=True, blank=True, on_delete=models.CASCADE)