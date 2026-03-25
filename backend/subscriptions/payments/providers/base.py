class BasePaymentProvider:
    def create_payment(self, amount: float, currency: str, user, metadata: dict) -> dict:
        """
        Create a payment and return a dict:
        {
            "payment_url": "https://...",
            "provider_payment_id": "abc123"
        }
        """
        raise NotImplementedError()

    def verify_payment(self, provider_payment_id: str) -> dict:
        """
        Verify the payment status. Return:
        {
            "status": "completed" | "failed" | "pending"
        }
        """
        raise NotImplementedError()
    
    def handle_webhook(self, request: dict) -> dict:
        """
        Handle webhook data and return a dict:
        {
            "status": "completed" | "failed" | "pending"
        }
        """
        raise NotImplementedError()