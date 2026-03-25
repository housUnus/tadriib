import requests
from django.conf import settings

SANDBOX_URL = "https://sandbox.paddle.com"
PRODUCTION_URL = "https://api.paddle.com"

DEBUG = settings.DEBUG

class PaddleProvider:
    BASE_URL = SANDBOX_URL if DEBUG else PRODUCTION_URL

    def create_payment(self, amount, currency, user, metadata):
        url = f"{self.BASE_URL}/transactions"

        payload = {
            "items": [
                {
                    "price_id": metadata["price_id"],
                    "quantity": 1
                }
            ],
            "customer": {
                "email": user.email
            },
            "custom_data": {
                "user_id": user.id,
                "lecture_id": metadata.get("lecture_id"),
                "payment_id": metadata.get("payment_id"),
            }
        }

        headers = {
            "Authorization": f"Bearer {settings.PADDLE_API_KEY}",
            "Content-Type": "application/json"
        }

        response = requests.post(url, json=payload, headers=headers)
        data = response.json()

        return {
            "payment_url": data["data"]["checkout"]["url"],
            "provider_payment_id": data["data"]["id"]
        }
        
    def handle_webhook(self, request):
        data = request.data

        if data.get("event_type") != "transaction.completed":
            return None

        transaction = data["data"]
        custom_data = transaction.get("custom_data", {})

        return {
            "payment_id": custom_data.get("payment_id"),
            "status": "completed"
        }