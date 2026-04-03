"use client"

import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { ReviewSubmitDialog } from "./review-submit-dialog"
import { ExitDialog } from "./exit-dialog"
import { QuizTimer } from "./quiz-timer"
import { CalculatorDialog } from "./calculator-dialog"
import { Content } from "@/stores/enrollment"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { useEffect } from "react"
import { QuizState, QuizStats } from "@/lib/data/quiz-data"
import { Button } from "@/components/ui/button"

interface QuizHeaderProps {
  content: Content
  state: QuizState
  stats: QuizStats
  isReadOnly: boolean
  onExit?: () => void
  onSubmit?: () => void
  onBack?: () => void

}

export function QuizHeader({ content, stats, state, isReadOnly, onExit, onSubmit, onBack }: QuizHeaderProps) {
  console.log("🚀 ~ QuizHeader ~ stats:", stats)
  const progress = (stats.answered / stats.total) * 100
  const client = useClientFetch()

  useEffect(() => {
    if (isReadOnly) return
    if (stats?.computed_remaining !== undefined && stats?.computed_remaining <= 0) {
      onSubmit?.()
    }
  }, [])

  const current_submission = state?.current_submission
  console.log("🚀 ~ QuizHeader ~ current_submission:", current_submission)

  if(!current_submission) return null

  if (isReadOnly)
    return (
      (
        <header className="border-b bg-card">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center px-4 py-2">

            {/* Back */}
            <div>
              <Button variant="ghost" onClick={onBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </div>

            {/* Center Stats */}
            <div className="flex justify-center">
              <div className="flex items-center gap-3 rounded-lg border px-3 py-1.5 text-sm">

                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">
                    {stats.answered}/{stats.total}
                  </span>
                  <span className="hidden sm:inline text-muted-foreground">
                    answered
                  </span>
                </div>

                {current_submission.score_percent !== undefined && (
                  <div className="flex items-center gap-1 border-l pl-3">
                    <span className="font-medium">
                      {current_submission.score_percent}%
                    </span>
                    <span className="hidden sm:inline text-muted-foreground">
                      score
                    </span>
                  </div>
                )}

              </div>
            </div>

            {/* Right Dates */}
            <div className="hidden md:flex justify-end text-xs text-muted-foreground">
              <div className="flex flex-col items-end leading-tight">
                <span>
                  Started: {new Date(current_submission.started_at).toLocaleDateString()}
                </span>
                {current_submission.submitted_at && (
                  <span>
                    Completed: {new Date(current_submission.submitted_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

          </div>
        </header>
      )
    )

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
                await client.post(`/quiz-submissions/${current_submission.id}/pause/`, {})
              }}

              onResume={async () => {
                await client.post(`/quiz-submissions/${current_submission.id}/resume/`, {})
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
