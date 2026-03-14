"use client"

import { cn } from "@/lib/utils"
import type { Question, QuestionStatus } from "@/lib/data/quiz-data"

interface QuestionGridProps {
  questions: Question[]
  sectionName: string
  currentQuestion: number
  getStatus: (id: number) => QuestionStatus
  onSelect: (id: number) => void
  stats: { answered: number; marked: number; flagged: number, visited: number }
}

const statusStyles: Record<QuestionStatus, string> = {
  "not-visited": "bg-card border-border text-foreground hover:border-primary/50",
  visited: "bg-muted border-border text-foreground hover:border-primary/50",
  answered: "bg-success text-white border-success",
  marked: "bg-info text-info-foreground border-info",
  flagged: "bg-error text-white border-error",
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
            <span className="h-2 w-2 rounded-full bg-muted" />
            {stats.visited}
          </span>
          {/* <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-info" />
            {stats.marked}
          </span> */}
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-error" />
            {stats.flagged}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {questions.map((question, idx) => {
          const status = getStatus(question.id)
          const isActive = question.id === currentQuestion
          return (
            <button
              key={question.id}
              onClick={() => onSelect(question.id)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md border text-xs font-medium transition-all",
                statusStyles[status],
                isActive && "ring-1 ring-primary ring-offset-1 ring-offset-background",
              )}
            >
              {idx + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}
