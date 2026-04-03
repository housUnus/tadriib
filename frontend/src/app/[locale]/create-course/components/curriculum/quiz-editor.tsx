"use client"

import { QuestionEditor } from "./question-editor"
import type { QuizQuestion } from "@/types/course"

interface QuizEditorProps {
  questions: QuizQuestion[]
  onUpdateQuestion: (questionId: string, data: Partial<QuizQuestion>) => void
  onDeleteQuestion: (questionId: string) => void
}

export function QuizEditor({ questions, onUpdateQuestion, onDeleteQuestion }: QuizEditorProps) {
  if (questions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        No questions yet. Click "+ Questions" to add your first question.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {questions.map((q, qIndex) => (
        <QuestionEditor
          key={q.id}
          question={q}
          index={qIndex}
          onUpdate={(updated) => onUpdateQuestion(q.id, updated)}
          onDelete={() => onDeleteQuestion(q.id)}
        />
      ))}
    </div>
  )
}
