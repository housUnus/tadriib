"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PanelLeftClose } from "lucide-react"
import { QuestionGrid } from "./question-grid"
import { sections } from "@/lib/data/quiz-data"
import type { QuestionStatus } from "@/lib/data/quiz-data"

interface QuizSidebarLeftProps {
  currentQuestion: number
  getStatus: (id: number) => QuestionStatus
  onSelectQuestion: (id: number) => void
  answers: Record<number, string>
  marked: Set<number>
  flagged: Set<number>
  onCollapse: () => void
}

export function QuizSidebarLeft({
  currentQuestion,
  getStatus,
  onSelectQuestion,
  answers,
  marked,
  flagged,
  onCollapse,
}: QuizSidebarLeftProps) {
  const getSectionStats = (questions: number[]) => ({
    answered: questions.filter((q) => answers[q]).length,
    marked: questions.filter((q) => marked.has(q)).length,
    flagged: questions.filter((q) => flagged.has(q)).length,
  })

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b px-4 py-2">
        <span className="text-sm font-medium">Questions</span>
        <Button variant="ghost" size="icon" onClick={onCollapse} className="h-7 w-7" title="Hide questions panel">
          <PanelLeftClose className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="space-y-6 p-4">
            {sections.map((section) => (
              <QuestionGrid
                key={section.name}
                questions={section.questions}
                sectionName={section.name}
                currentQuestion={currentQuestion}
                getStatus={getStatus}
                onSelect={onSelectQuestion}
                stats={getSectionStats(section.questions)}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
