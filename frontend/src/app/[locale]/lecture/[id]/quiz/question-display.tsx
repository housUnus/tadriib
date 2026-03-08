"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RotateCcw, ArrowRight, Flag } from "lucide-react"
import type { Question } from "@/lib/data/quiz-data"

interface QuestionDisplayProps {
  question: Question
  selectedAnswer?: string
  isFlagged: boolean
  fontSize: number
  onSelectAnswer: (answer: string) => void
  onClearAnswer: () => void
  onToggleFlag: () => void
  onSaveAndNext: () => void
}

export function QuestionDisplay({
  question,
  selectedAnswer,
  isFlagged,
  fontSize,
  onSelectAnswer,
  onClearAnswer,
  onToggleFlag,
  onSaveAndNext,
}: QuestionDisplayProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <p className="leading-relaxed text-card-foreground whitespace-pre-line" style={{ fontSize: `${fontSize}px` }}>
            {question.text}
          </p>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.label}
            onClick={() => onSelectAnswer(option.label)}
            className={cn(
              "flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-all",
              selectedAnswer === option.label
                ? "border-primary bg-primary/5 text-foreground"
                : "border-border bg-card text-card-foreground hover:border-primary/50 hover:bg-muted/50",
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-medium",
                selectedAnswer === option.label
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted text-muted-foreground",
              )}
              style={{ fontSize: `${fontSize - 2}px` }}
            >
              {option.label}
            </span>
            <span style={{ fontSize: `${fontSize}px` }}>{option.text}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center gap-2">
          <Button
            variant={isFlagged ? "secondary" : "outline"}
            size="sm"
            onClick={onToggleFlag}
            className={cn(isFlagged && "bg-violet-600 text-white hover:bg-violet-700")}
          >
            <Flag className={cn("mr-2 h-4 w-4", isFlagged && "fill-current")} />
            {isFlagged ? "Flagged" : "Flag for Later"}
          </Button>
          <Button variant="outline" size="sm" onClick={onClearAnswer}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear Response
          </Button>
        </div>
        <Button onClick={onSaveAndNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
          Save and Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
