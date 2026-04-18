from django.db import models

class OrderStatus(models.TextChoices):
    DRAFT = "draft", "Draft"
    PENDING = "pending", "Pending"
    PAID = "paid", "Paid"
    FAILED = "failed", "Failed"
    
class PlanStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    INACTIVE = "inactive", "Inactive"
    
class SubscriptionStatus(models.TextChoices):
    ACTIVE = "active", "Active"
    EXPIRED = "expired", "Expired"
    CANCELED = "canceled", "Canceled"
    

class SubscriptionFrequency(models.TextChoices):
    ONCE = '0', 'once'
    SECOND = '1', 'second'
    MINUTE = '2', 'minute'
    HOUR = '3', 'hour'
    DAY = '4', 'day'
    WEEK = '5', 'week'
    MONTH = '6', 'month'
    YEAR = '7', 'year'
    
class PaymentStatus(models.TextChoices):
    PENDING = "pending", "Pending"
    COMPLETED = "completed", "Completed"
    FAILED = "failed", "Failed"
    CANCELLED = "cancelled", "Cancelled"