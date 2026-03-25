from rest_framework.routers import DefaultRouter
from django.urls import path
from subscriptions.payments.views import GenericPaymentViewSet, GenericWebhookView

router = DefaultRouter()
router.register("payments", GenericPaymentViewSet, basename="payments")

urlpatterns = [
    path("webhooks/<str:provider_name>/", GenericWebhookView.as_view()),
]
urlpatterns += router.urls
