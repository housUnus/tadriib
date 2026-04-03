"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DollarSign, Tag, Calendar, Info } from "lucide-react"
import { useCourseStore } from "@/stores/course"
import { format } from "date-fns"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

const currencies = [
  { value: "USD", label: "USD ($)", symbol: "$" },
  { value: "EUR", label: "EUR (€)", symbol: "€" },
  { value: "GBP", label: "GBP (£)", symbol: "£" },
  { value: "INR", label: "INR (₹)", symbol: "₹" },
]

const pricePresets = [19.99, 29.99, 49.99, 79.99, 99.99, 149.99, 199.99]

export function PricingSection() {
  const { course, updateCourseMetadata } = useCourseStore()
  const client = useClientFetch()

  const pricing = course.pricing || {
    isFree: true,
    price: 0,
    currency: "USD",
    hasDiscount: false,
    discountPrice: undefined,
    discountEndDate: undefined,
  }

  const updatePricing = (field: string, value: unknown) => {
    updateCourseMetadata(client,
      {
        pricing: { ...pricing, [field]: value },
      })
  }

  const currentCurrency = currencies.find((c) => c.value === pricing.currency) || currencies[0]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Pricing</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Set your course price and promotional offers
        </p>
      </div>

      {/* Free or Paid Toggle */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Course Type</CardTitle>
          <CardDescription>Is this a free or paid course?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{pricing.isFree ? "Free Course" : "Paid Course"}</p>
                <p className="text-sm text-muted-foreground">
                  {pricing.isFree
                    ? "Students can enroll without payment"
                    : "Students pay to access this course"}
                </p>
              </div>
            </div>
            <Switch
              checked={!pricing.isFree}
              onCheckedChange={(checked) => updatePricing("isFree", !checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing Details */}
      {!pricing.isFree && (
        <>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Base Price</CardTitle>
              <CardDescription>Set your course price</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="w-32">
                  <Label className="text-xs text-muted-foreground">Currency</Label>
                  <Select
                    value={pricing.currency}
                    onValueChange={(value) => updatePricing("currency", value)}
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((curr) => (
                        <SelectItem key={curr.value} value={curr.value}>
                          {curr.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label className="text-xs text-muted-foreground">Price</Label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {currentCurrency.symbol}
                    </span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={pricing.price || ""}
                      onChange={(e) => updatePricing("price", parseFloat(e.target.value) || 0)}
                      className="pl-8"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Quick Presets</Label>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {pricePresets.map((preset) => (
                    <Button
                      key={preset}
                      variant={pricing.price === preset ? "default" : "outline"}
                      size="sm"
                      onClick={() => updatePricing("price", preset)}
                    >
                      {currentCurrency.symbol}{preset}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discount */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Promotional Discount
                  </CardTitle>
                  <CardDescription>Offer a limited-time discount</CardDescription>
                </div>
                <Switch
                  checked={pricing.hasDiscount}
                  onCheckedChange={(checked) => updatePricing("hasDiscount", checked)}
                />
              </div>
            </CardHeader>
            {pricing.hasDiscount && (
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Discounted Price</Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {currentCurrency.symbol}
                      </span>
                      <Input
                        type="number"
                        min="0"
                        max={pricing.price}
                        step="0.01"
                        value={pricing.discountPrice || ""}
                        onChange={(e) => updatePricing("discountPrice", parseFloat(e.target.value) || 0)}
                        className="pl-8"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">End Date</Label>
                    <Input
                      type="date"
                      value={pricing.discountEndDate || ""}
                      onChange={(e) => updatePricing("discountEndDate", e.target.value)}
                      className="mt-1.5"
                      min={format(new Date(), "yyyy-MM-dd")}
                    />
                  </div>
                </div>

                {pricing.discountPrice && pricing.price > 0 && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                    <p className="text-sm text-emerald-800 dark:text-emerald-200">
                      <span className="font-medium">
                        {Math.round((1 - pricing.discountPrice / pricing.price) * 100)}% off
                      </span>{" "}
                      — Students will pay{" "}
                      <span className="font-medium">
                        {currentCurrency.symbol}{pricing.discountPrice}
                      </span>{" "}
                      instead of{" "}
                      <span className="line-through">
                        {currentCurrency.symbol}{pricing.price}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </>
      )}

      {/* Info */}
      <div className="flex gap-3 p-4 bg-muted/50 rounded-lg">
        <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p>
            {pricing.isFree
              ? "Free courses are great for building your audience and getting initial reviews."
              : "Price your course based on the value it provides. Consider your target audience's willingness to pay and competitor pricing."}
          </p>
        </div>
      </div>
    </div>
  )
}
