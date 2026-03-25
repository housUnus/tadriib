import stripe
from django.conf import settings
from .base import BasePaymentProvider

class StripeProvider(BasePaymentProvider):
    def __init__(self):
        stripe.api_key = settings.STRIPE_SECRET_KEY

    def create_payment(self, amount, currency, user, metadata):
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': currency,
                    'product_data': {'name': metadata.get('title', 'Payment')},
                    'unit_amount': int(amount * 100),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f"{settings.FRONTEND_URL}/success",
            cancel_url=f"{settings.FRONTEND_URL}/cancel",
            metadata=metadata,
        )
        return {
            "payment_url": session.url,
            "provider_payment_id": session.id
        }

    def verify_payment(self, provider_payment_id):
        session = stripe.checkout.Session.retrieve(provider_payment_id)
        return {"status": "completed" if session.payment_status == "paid" else session.payment_status}