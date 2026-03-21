"use client"

import { Loader2 } from "lucide-react"

export default function ContentLoader({
  title = "Loading...",
  description,
  fullScreen = false,
}: {
  title?: string
  description?: string
  fullScreen?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen ? "h-full min-h-screen" : "py-16"
      }`}
    >
      {/* Spinner */}
      <Loader2 className="h-8 w-8 animate-spin text-primary" />

      {/* Text */}
      <div className="text-center space-y-1">
        <p className="text-sm font-medium">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}