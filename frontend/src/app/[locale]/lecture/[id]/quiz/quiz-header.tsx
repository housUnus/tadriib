"use client"

import { Progress } from "@/components/ui/progress"
import { ChevronRight, Clock } from "lucide-react"
import { ReviewSubmitDialog } from "./review-submit-dialog"
import { ExitDialog } from "./exit-dialog"
import { QuizTimer } from "./quiz-timer"
import { CalculatorDialog } from "./calculator-dialog"

interface QuizHeaderProps {
  testName: string
  sectionName: string
  stats: {
    total: number
    answered: number
    notAnswered: number
    marked: number
    flagged: number
    visited: number
  }
  onExit?: () => void
  onSubmit?: () => void
}

export function QuizHeader({ testName, sectionName, stats, onExit, onSubmit }: QuizHeaderProps) {
  const progress = (stats.answered / stats.total) * 100

  return (
    <header className="border-b bg-card">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section with breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-medium">
          <span className="text-foreground">{testName}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{sectionName}</span>
        </div>

        {/* Center section with timer and calculator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-1.5">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <QuizTimer compact />
          </div>
          <CalculatorDialog variant="icon" />
        </div>

        <div className="flex items-center gap-3">
          <ExitDialog stats={stats} onConfirmExit={onExit || (() => {})} />
          <ReviewSubmitDialog stats={stats} onSubmit={onSubmit} />
        </div>
      </div>

      <div className="px-4 pb-2">
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
