import { Spinner } from "@/components/ui/spinner"

export function PaymentProcessing() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative">
        <Spinner className="h-12 w-12" />
      </div>
      <h2 className="mt-6 text-xl font-semibold text-foreground">
        Processing Payment
      </h2>
      <p className="mt-2 text-muted-foreground text-center max-w-sm">
        Redirecting to secure payment. Please do not close this window.
      </p>
    </div>
  )
}
