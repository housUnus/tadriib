"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils/utils"
import { intervalToDuration } from "date-fns"

interface QuizTimerProps {
  remainingSeconds?: number
  compact?: boolean
  isPaused?: boolean
  allowPause?: boolean
  onPause?: () => Promise<void>
  onResume?: () => Promise<void>
}

export function QuizTimer({
  remainingSeconds = 10800,
  isPaused: initialPaused = false,
  allowPause = false,
  compact = true,
  onPause,
  onResume,
}: QuizTimerProps) {
  const [seconds, setSeconds] = useState(remainingSeconds)
  const [isPaused, setIsPaused] = useState(initialPaused)
  const [loading, setLoading] = useState(false)

  /* -------------------------
     Sync with backend
  -------------------------- */
  useEffect(() => {
    setSeconds(remainingSeconds)
  }, [remainingSeconds])

  useEffect(() => {
    setIsPaused(initialPaused)
  }, [initialPaused])

  /* -------------------------
     Timer
  -------------------------- */
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setSeconds((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused])

  /* -------------------------
     Pause / Resume
  -------------------------- */
  const togglePause = async () => {
    if (!allowPause || loading) return

    setLoading(true)

    try {
      if (isPaused) {
        setIsPaused(false)
        await onResume?.()
      } else {
        setIsPaused(true)
        await onPause?.()
      }
    } catch {
      setIsPaused((prev) => !prev)
    } finally {
      setLoading(false)
    }
  }

  /* -------------------------
     Format with date-fns
  -------------------------- */
  const duration = intervalToDuration({
    start: 0,
    end: seconds * 1000,
  })


  const pad = (n?: number) => String(n ?? 0).padStart(2, "0")

  const hh = pad(duration.hours)
  const mm = pad(duration.minutes)
  const ss = pad(duration.seconds)

  if (compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-1 md:gap-2 rounded-lg px-2 py-0 transition-all duration-300",
          isPaused && "bg-amber-500/5",
        )}
      >
        <div className={cn("flex items-center gap-1 font-mono", isPaused && "animate-pulse")}>
          <span className="text-lg font-semibold text-foreground">{hh}</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-lg font-semibold text-foreground">{mm}</span>
          <span className="text-muted-foreground">:</span>
          <span className="text-lg font-semibold text-foreground">{ss}</span>
        </div>
        {allowPause && <Button
          variant="ghost"
          size="icon"
          className={cn("h-7 w-7 transition-colors", isPaused && "bg-amber-500/10 hover:bg-amber-500/20")}
          onClick={togglePause}
        >
          {isPaused ? (
            <Play className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Pause className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </Button>}
        {isPaused && (
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 hidden md:block">
            Paused
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="text-center">
      <div
        className={cn(
          "inline-flex flex-col items-center rounded-xl px-6 py-4 transition-all duration-300",
          isPaused && "bg-amber-500/5",
        )}
      >
        <div className={cn("flex items-baseline justify-center gap-1 font-mono", isPaused && "animate-pulse")}>
          <span className="text-3xl font-bold text-foreground">{hh}</span>
          <span className="text-xl text-muted-foreground">:</span>
          <span className="text-3xl font-bold text-foreground">{mm}</span>
          <span className="text-xl text-muted-foreground">:</span>
          <span className="text-3xl font-bold text-foreground">{ss}</span>
        </div>
        <div className="mt-1 flex justify-center gap-6 text-xs text-muted-foreground">
          <span>Hrs</span>
          <span>Min</span>
          <span>Sec</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={togglePause}
          className={cn(
            "gap-1.5 transition-colors",
            isPaused ? "border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10" : "bg-transparent",
          )}
        >
          {isPaused ? (
            <>
              <Play className="h-3.5 w-3.5 text-emerald-500" />
              Resume
            </>
          ) : (
            <>
              <Pause className="h-3.5 w-3.5" />
              Pause
            </>
          )}
        </Button>
        {isPaused && (
          <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400">
            Timer Paused
          </span>
        )}
      </div>
    </div>
  )
}
