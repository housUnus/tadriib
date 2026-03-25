"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CreditCard } from "lucide-react"
import Link from "next/link"
import { OrderSummary } from "../components/order-summary"
import { TrustBadges } from "../components/trust-badges"
import { PaymentProcessing } from "../components/payment-processing"
import { LectureCard } from "../components/lecture-card"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

// Mock lecture data - in real app, this would come from API
const lectureData: any = {
  id: "lec-001",
  title: "Advanced React Patterns & Performance Optimization",
  instructor: "Dr. Sarah Chen",
  date: "March 28, 2026",
  duration: "2 hours",
  price: 49.99,
  originalPrice: 79.99,
}

export default function CheckoutPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const client = useClientFetch()

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await client.post(`/payments/create_payment`, {
      amount: 49.99,
      currency: "usd",
      provider: "stripe",
      metadata: { course_id: "crs-001" },
    })
    await new Promise(resolve => setTimeout(resolve, 2000))
    // In real app: redirect to payment provider or handle payment
    router.push("/payments/success")
  }

  if (isProcessing) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-lg mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-0">
              <PaymentProcessing />
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to lecture
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-6">
            <section>
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                Lecture Details
              </h2>
              <LectureCard lecture={lectureData} />
            </section>
            <section className="lg:hidden">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
                Order Summary
              </h2>
              <OrderSummary lecture={lectureData} />
            </section>

            <section>
              <Card className="border-border/50">
                <CardContent className="p-5">
                  <TrustBadges />
                </CardContent>
              </Card>
            </section>

            <Button
              size="lg"
              className="w-full lg:hidden"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Payment
            </Button>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-2 space-y-6">
            <div className="sticky top-8 space-y-6">
              <OrderSummary lecture={lectureData} />

              <Button
                size="lg"
                className="w-full"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Payment
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By completing this purchase, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-foreground">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-foreground">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
