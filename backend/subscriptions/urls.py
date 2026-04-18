from rest_framework.routers import DefaultRouter
from django.urls import path
from subscriptions.payments.views import GenericPaymentViewSet, GenericWebhookView
from subscriptions.views import OrderViewSet

router = DefaultRouter()
router.register("payments", GenericPaymentViewSet, basename="payments")
router.register("orders", OrderViewSet, basename="orders")

urlpatterns = [
    path("webhooks/<str:provider_name>/", GenericWebhookView.as_view()),
]
urlpatterns += router.urls
