"use client"

import { cn } from "@/lib/utils"
import type { QuestionStatus } from "@/lib/data/quiz-data"

interface QuestionGridProps {
  questions: number[]
  sectionName: string
  currentQuestion: number
  getStatus: (id: number) => QuestionStatus
  onSelect: (id: number) => void
  stats: { answered: number; marked: number; flagged: number }
}

const statusStyles: Record<QuestionStatus, string> = {
  "not-visited": "bg-card border-border text-foreground hover:border-primary/50",
  visited: "bg-muted border-border text-foreground hover:border-primary/50",
  answered: "bg-success text-success-foreground border-success",
  marked: "bg-info text-info-foreground border-info",
  flagged: "bg-violet-600 text-white border-violet-600",
}

export function QuestionGrid({
  questions,
  sectionName,
  currentQuestion,
  getStatus,
  onSelect,
  stats,
}: QuestionGridProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">{sectionName}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-success" />
            {stats.answered}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-info" />
            {stats.marked}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-violet-600" />
            {stats.flagged}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {questions.map((id) => {
          const status = getStatus(id)
          const isActive = id === currentQuestion
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md border text-xs font-medium transition-all",
                statusStyles[status],
                isActive && "ring-2 ring-primary ring-offset-1 ring-offset-background",
              )}
            >
              {id}
            </button>
          )
        })}
      </div>
    </div>
  )
}
