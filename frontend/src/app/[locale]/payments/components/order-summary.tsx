"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tag, Check } from "lucide-react"


export interface OrderSummary {
  lecture: any
  promoCode?: string
  discount?: number
  total: number
}

interface OrderSummaryProps {
  order: any
  showPromoInput?: boolean
}

export function OrderSummary({ order, showPromoInput = false }: OrderSummaryProps) {
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null)
  const [isApplying, setIsApplying] = useState(false)

  const discount = appliedPromo ? order?.total_amount * 0.1 : 0
  const total = order?.total_amount - discount

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return
    setIsApplying(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    setAppliedPromo(promoCode)
    setIsApplying(false)
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {order.items.map((item: any) => (
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-medium text-sm">{item?.course_detail.title}</p>
              <p className="text-xs text-muted-foreground">Access to live lecture</p>
            </div>
            <div className="text-right">
              {item?.course_detail.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                  ${item?.course_detail.originalPrice.toFixed(2)}
                </p>
              )}
              <p className="font-medium">${item?.course_detail.price}</p>
            </div>
          </div>
        ))}

        {showPromoInput && (
          <>
            <Separator />
            <div className="space-y-2">
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{appliedPromo}</span>
                  </div>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleApplyPromo}
                    disabled={isApplying || !promoCode.trim()}
                  >
                    {isApplying ? "..." : "Apply"}
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${order.total_amount}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-primary">
              <span>Discount (10%)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-bold">${total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
