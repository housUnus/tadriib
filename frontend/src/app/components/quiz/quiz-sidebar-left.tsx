"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PanelLeftClose } from "lucide-react"
import { QuestionGrid } from "./question-grid"
import type { Question, QuestionStatus, QuizSegment } from "@/lib/data/quiz-data"
import { isAnswered } from "@/hooks/use-quiz"

interface QuizSidebarLeftProps {
  segments: QuizSegment[]
  currentQuestion: number
  getStatus: (id: number) => QuestionStatus
  onSelectQuestion: (id: number) => void
  answers: Record<number, string>
  marked: Set<number>
  flagged: Set<number>
  visited: Set<number>
  onCollapse: () => void
}

export function QuizSidebarLeft({
  segments,
  currentQuestion,
  getStatus,
  onSelectQuestion,
  answers,
  marked,
  flagged,
  visited,
  onCollapse,
}: QuizSidebarLeftProps) {
  const getSectionStats = (questions: Question[]) => ({
    answered: questions.filter((q) => isAnswered(answers[q.id])).length,
    marked: questions.filter((q) => marked.has(q.id)).length,
    flagged: questions.filter((q) => flagged.has(q.id)).length,
    visited: questions.filter((q) => visited.has(q.id)).length,
  })

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b px-4 py-2">
        <span className="text-sm font-medium">Questions</span>
        <Button variant="ghost" size="icon" onClick={onCollapse} className="h-7 w-7" title="Hide questions panel">
          <PanelLeftClose className="h-4 w-4 rtl:rotate-180" />
        </Button>
      </div>

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="space-y-6 p-2">
            {segments.map((segment: QuizSegment) => (
              <QuestionGrid
                key={segment.title}
                questions={segment.questions}
                sectionName={segment.title}
                currentQuestion={currentQuestion}
                getStatus={getStatus}
                onSelect={onSelectQuestion}
                stats={getSectionStats(segment.questions)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
