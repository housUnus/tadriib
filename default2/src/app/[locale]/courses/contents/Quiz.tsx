"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { QuizHeader } from "@/app/components/quiz/quiz-header"
import { QuizSidebarLeft } from "@/app/components/quiz/quiz-sidebar-left"
import { QuizSidebarRight } from "@/app/components/quiz/quiz-sidebar-right"
import { QuestionDisplay } from "@/app/components/quiz/question-display"
import { SidebarExpandButton } from "@/app/components/quiz/sidebar-expand-button"
import { useQuiz } from "@/hooks/use-quiz"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { ContentItem } from "@/lib/data/course-data"


interface QuizContentProps {
  content: ContentItem
  onMarkComplete: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

type QuizState = "intro" | "in-progress" | "completed"

export function QuizContent({ content, onMarkComplete, onPrevious, onNext, hasPrevious, hasNext }: QuizContentProps) {
  const router = useRouter()
  const {
    state,
    currentQuestion,
    goToQuestion,
    selectAnswer,
    clearAnswer,
    toggleFlag,
    saveAndNext,
    getQuestionStatus,
    getStats,
  } = useQuiz()

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [fontSize, setFontSize] = useState(16)

  const stats = getStats()

  if (!currentQuestion) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading quiz...</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <QuizHeader
        testName="AFCAT Test Series 2023 I"
        sectionName="Reasoning"
        stats={stats}
        onExit={() => router.push("/")}
        onSubmit={() => router.push("/")}
      />

      <div className="relative flex-1 overflow-hidden">
        {!leftSidebarOpen && <SidebarExpandButton side="left" onClick={() => setLeftSidebarOpen(true)} />}
        {!rightSidebarOpen && <SidebarExpandButton side="right" onClick={() => setRightSidebarOpen(true)} />}

        <ResizablePanelGroup direction="horizontal" className="h-full">
          {leftSidebarOpen && (
            <>
              <ResizablePanel defaultSize={18} minSize={12} maxSize={25}>
                <div className="h-full border-r bg-card">
                  <QuizSidebarLeft
                    currentQuestion={state.currentQuestion}
                    getStatus={getQuestionStatus}
                    onSelectQuestion={goToQuestion}
                    answers={state.answers}
                    marked={state.marked}
                    flagged={state.flagged}
                    onCollapse={() => setLeftSidebarOpen(false)}
                  />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}

          <ResizablePanel
            defaultSize={leftSidebarOpen && rightSidebarOpen ? 60 : leftSidebarOpen || rightSidebarOpen ? 80 : 100}
            minSize={50}
          >
            <ScrollArea className="h-full">
              <div className="mx-auto max-w-3xl p-2">
                <QuestionDisplay
                  question={currentQuestion}
                  selectedAnswer={state.answers[currentQuestion.id]}
                  isFlagged={state.flagged.has(currentQuestion.id)}
                  fontSize={fontSize}
                  onSelectAnswer={(answer) => selectAnswer(currentQuestion.id, answer)}
                  onClearAnswer={() => clearAnswer(currentQuestion.id)}
                  onToggleFlag={() => toggleFlag(currentQuestion.id)}
                  onSaveAndNext={saveAndNext}
                />
              </div>
            </ScrollArea>
          </ResizablePanel>

          {rightSidebarOpen && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={22} minSize={15} maxSize={28}>
                <div className="h-full border-l bg-card">
                  <QuizSidebarRight
                    stats={stats}
                    fontSize={fontSize}
                    onFontSizeChange={setFontSize}
                    onCollapse={() => setRightSidebarOpen(false)}
                  />
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
