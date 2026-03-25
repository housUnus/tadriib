from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Payment
# from subscriptions.payments.providers.stripe import StripeProvider
from subscriptions.payments.providers.paddle import PaddleProvider
from rest_framework.views import APIView
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from subscriptions.models import Order, OrderItem
from subscriptions.constants import PaymentStatus, OrderStatus

PROVIDERS = {
    # 'stripe': StripeProvider(),
    'paddle': PaddleProvider(),
}

class GenericPaymentViewSet(viewsets.GenericViewSet):
    queryset = Payment.objects.all()
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def create_payment(self, request):
        """
        Request body: { "amount": 50, "currency": "usd", "provider": "stripe", "metadata": {...} }
        """
        provider_name = request.data.get('provider')
        provider = PROVIDERS.get(provider_name)
        if not provider:
            return Response({"error": "Invalid provider"}, status=status.HTTP_400_BAD_REQUEST)

        amount = request.data.get('amount')
        currency = request.data.get('currency', 'usd')
        metadata = request.data.get('metadata', {})
        
        if float(amount) == 0:
            payment = Payment.objects.create(
                user=request.user,
                amount=0,
                currency=currency,
                provider="free",
                status=PaymentStatus.COMPLETED,
                metadata=metadata
            )

            course_id = payment.metadata.get("course_id")
            if course_id:
                order = Order.objects.get_or_create(
                    user=payment.user,
                    payment=payment,
                    status=OrderStatus.PAID
                )
                order_item = OrderItem(
                    course_id=course_id,
                    user=payment.user,
                    order=order,
                )
                order_item.save()
                
            return Response({
                "status": "completed",
                "payment_id": payment.pk
            })

        payment = Payment.objects.create(
            user=request.user,
            amount=amount,
            currency=currency,
            provider=provider_name,
            metadata=metadata
        )

        result = provider.create_payment(amount, currency, request.user, metadata)
        payment.provider_payment_id = result['provider_payment_id']
        payment.save()

        return Response({"payment_url": result['payment_url'], "payment_id": payment.pk})
    
    
@method_decorator(csrf_exempt, name='dispatch')
class GenericWebhookView(APIView):

    def post(self, request, provider_name):
        provider = PROVIDERS.get(provider_name)
        if not provider:
            return HttpResponse(status=400)

        result = provider.handle_webhook(request)

        if not result:
            return HttpResponse(status=200)

        payment_id = result.get("payment_id")
        status = result.get("status")

        try:
            payment = Payment.objects.get(id=payment_id)
        except Payment.DoesNotExist:
            return HttpResponse(status=404)

        # 🔒 prevent duplicate processing
        if payment.status == "completed":
            return HttpResponse(status=200)

        if status == "completed":
            payment.status = PaymentStatus.COMPLETED
            payment.save()
            
            # 🎯 grant access
            course_id = payment.metadata.get("course_id")
            if course_id:
                order = Order.objects.get_or_create(
                    user=payment.user,
                    payment=payment,
                    status=OrderStatus.PAID,
                )
                order_item = OrderItem(
                    course_id=course_id,
                    user=payment.user,
                    order=order,
                )
                order_item.save()
                
            # 🎟️ update discount usage
            # if payment.discount:
            #     payment.discount.used_count += 1
            #     payment.discount.save()

        elif status == "failed":
            payment.status = PaymentStatus.FAILED
            payment.save()

        return HttpResponse(status=200)