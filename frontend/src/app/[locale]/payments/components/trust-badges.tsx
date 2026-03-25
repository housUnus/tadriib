import { Shield, RefreshCw, Lock } from "lucide-react"

export function TrustBadges() {
  const badges = [
    { icon: Lock, label: "Secure Payment", description: "256-bit SSL encryption" },
    { icon: Shield, label: "Money Back", description: "30-day refund policy" },
    { icon: RefreshCw, label: "Instant Access", description: "Start learning immediately" },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {badges.map((badge) => (
        <div key={badge.label} className="text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted mb-2">
            <badge.icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-xs font-medium text-foreground">{badge.label}</p>
          <p className="text-xs text-muted-foreground hidden sm:block">{badge.description}</p>
        </div>
      ))}
    </div>
  )
}
