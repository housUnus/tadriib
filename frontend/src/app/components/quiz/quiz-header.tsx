"use client"

import { Progress } from "@/components/ui/progress"
import { ChevronRight, Clock } from "lucide-react"
import { ReviewSubmitDialog } from "./review-submit-dialog"
import { ExitDialog } from "./exit-dialog"
import { QuizTimer } from "./quiz-timer"
import { CalculatorDialog } from "./calculator-dialog"
import { Content } from "@/app/stores/enrollment"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { useEffect } from "react"
import { QuizStats } from "@/lib/data/quiz-data"

interface QuizHeaderProps {
  content: Content
  stats: QuizStats
  onExit?: () => void
  onSubmit?: () => void
}

export function QuizHeader({ content, stats, onExit, onSubmit }: QuizHeaderProps) {
  console.log("🚀 ~ QuizHeader ~ stats:", stats)
  const progress = (stats.answered / stats.total) * 100
  const active_quiz_submission = content.progress.active_quiz_submission
  const client = useClientFetch()

  useEffect(() => {
    if(stats?.computed_remaining !== undefined && stats?.computed_remaining <= 0) {
      onSubmit?.()
    }
  }, [])

  if (!active_quiz_submission) 
    return null

  return (
    <header className="border-b bg-card">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:items-center px-3">
        {/* Left section with breadcrumb */}
        <div className="flex items-center justify-between col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-foreground">{content.title}</span>
            {/* <ChevronRight className="h-4 w-4 text-muted-foreground" /> */}
            {/* <span className="text-muted-foreground">{sectionName}</span> */}
          </div>
        </div>
        {/* Center section with timer and calculator */}
        <div className="md:col-start-2 flex justify-center mx-3">
          <div className="flex items-center gap-2 rounded-lg border bg-background px-2 py-1.5">
            <Clock className="h-4 w-4 text-muted-foreground hidden md:block" />
            <QuizTimer
              compact
              remainingSeconds={stats.computed_remaining}
              isPaused={stats.is_paused}
              allowPause={content.content?.can_pause}

              onPause={async () => {
                await client.post(`/quiz-submissions/${active_quiz_submission}/pause/`, {})
              }}

              onResume={async () => {
                await client.post(`/quiz-submissions/${active_quiz_submission}/resume/`, {})
              }}
            />
          </div>
        </div>
        <div className="flex justify-end items-center md:gap-2">
          <CalculatorDialog variant="icon" />
          <ExitDialog stats={stats} onConfirmExit={onExit || (() => { })} />
          <ReviewSubmitDialog stats={stats} onSubmit={onSubmit} />
        </div>
      </div>

      <div className="px-3 pb-2 pt-2">
        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-xs font-medium text-muted-foreground">
            {stats.answered}/{stats.total} answered
          </span>
        </div>
      </div>
    </header>
  )
}
