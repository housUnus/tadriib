"use client"

import { useEffect, useState } from "react"
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
import { useIsMobile } from "@/hooks/use-mobile"


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

  const isMobile = useIsMobile()

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [fontSize, setFontSize] = useState(16)

  const stats = getStats()

  useEffect(() => {
    if (isMobile) {
      setLeftSidebarOpen(false)
      setRightSidebarOpen(false)
    }
  }, [isMobile])

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
        {/* Desktop resizable layout */}
        <div className="hidden lg:block h-full">
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
                <div className="mx-auto max-w-3xl p-6">
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

        {/* Mobile overlay layout */}
        <div className="lg:hidden h-full flex flex-col">
          {/* Main content always full width on mobile */}
          <ScrollArea className="flex-1">
            <div className="p-4">
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

          {/* Left sidebar overlay */}
          {leftSidebarOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setLeftSidebarOpen(false)} />
              <div className="fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-card shadow-xl border-r animate-in slide-in-from-left duration-200">
                <QuizSidebarLeft
                  currentQuestion={state.currentQuestion}
                  getStatus={getQuestionStatus}
                  onSelectQuestion={(id) => {
                    goToQuestion(id)
                    setLeftSidebarOpen(false)
                  }}
                  answers={state.answers}
                  marked={state.marked}
                  flagged={state.flagged}
                  onCollapse={() => setLeftSidebarOpen(false)}
                />
              </div>
            </>
          )}

          {/* Right sidebar overlay */}
          {rightSidebarOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setRightSidebarOpen(false)} />
              <div className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-card shadow-xl border-l animate-in slide-in-from-right duration-200">
                <QuizSidebarRight
                  stats={stats}
                  fontSize={fontSize}
                  onFontSizeChange={setFontSize}
                  onCollapse={() => setRightSidebarOpen(false)}
                />
              </div>
            </>
          )}

          {/* Mobile expand buttons */}
          {!leftSidebarOpen && <SidebarExpandButton side="left" onClick={() => setLeftSidebarOpen(true)} />}
          {!rightSidebarOpen && <SidebarExpandButton side="right" onClick={() => setRightSidebarOpen(true)} />}
        </div>
      </div>
    </div>
  )
}
