"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { QuizHeader } from "@/app/components/quiz/quiz-header"
import { QuizSidebarLeft } from "@/app/components/quiz/quiz-sidebar-left"
import { QuizSidebarRight } from "@/app/components/quiz/quiz-sidebar-right"
import { QuestionDisplay } from "@/app/components/quiz/question-display"
import { SidebarExpandButton } from "@/app/components/quiz/sidebar-expand-button"
import { useQuiz } from "@/hooks/use-quiz"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useIsMobile } from "@/hooks/use-mobile"
import { Content } from "@/stores/enrollment"
import { Quiz, QuizStats } from "@/lib/data/quiz-data"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

interface QuizContentProps {
  content: Content
  selectedSubmission: string
  onBack: () => void
}

export function QuizWrapper({ content, selectedSubmission, onBack }: QuizContentProps) {
  const router = useRouter()
  const client = useClientFetch()
  const quiz = content.content as Quiz

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
    submitQuiz
  } = useQuiz(quiz, content.invalidate, content.progress.active_quiz_submission || selectedSubmission, client)
  const stats: QuizStats = getStats()
  const isMobile = useIsMobile()

  const isReadOnly: boolean = state.current_submission?.status !== 'in_progress' && state.current_submission?.status !== 'is_paused'
  console.log("🚀 ~ QuizWrapper ~ state.current_submission?.status:", state.current_submission?.status)

  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [isPaused, setIsPaused] = useState(stats.is_paused)

  useEffect(() => {
    if (leftSidebarOpen) {
      setRightSidebarOpen(false)
    }
  }, [leftSidebarOpen])

  useEffect(() => {
    if (rightSidebarOpen) {
      setLeftSidebarOpen(false)
    }
  }, [rightSidebarOpen])


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
    <div className="flex h-full flex-col bg-background">
      <QuizHeader
        content={content}
        state={state}
        stats={stats}
        isReadOnly={isReadOnly}
        onExit={() => router.replace(`?submission=`)}
        onBack={onBack}
        onSubmit={submitQuiz}
        onPause={(state) => setIsPaused(state)}
      />

      <div className="relative flex-1 overflow-hidden">
        {/* Desktop resizable layout */}
        <div className="hidden lg:block h-full">
          {!leftSidebarOpen && <SidebarExpandButton side="left" onClick={() => setLeftSidebarOpen(true)} />}
          {!rightSidebarOpen && <SidebarExpandButton side="right" onClick={() => setRightSidebarOpen(true)} />}

          <ResizablePanelGroup direction="horizontal" className="h-full">
            {leftSidebarOpen && (
              <>
                <ResizablePanel defaultSize={25} minSize={12} maxSize={25}>
                  <div className="h-full border-r bg-card">
                    <QuizSidebarLeft
                      segments={[{ title: "Questions", questions: quiz.questions, id: 1, order: 0 }]}
                      currentQuestion={state.currentQuestion}
                      getStatus={getQuestionStatus}
                      onSelectQuestion={goToQuestion}
                      answers={state.answers}
                      answers_is_correct={state.answers_is_correct}
                      marked={state.marked}
                      flagged={state.flagged}
                      visited={state.visited}
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
                    key={currentQuestion.id}
                    isReadOnly={isReadOnly}
                    question={currentQuestion}
                    selectedAnswer={state.answers[currentQuestion.id]}
                    isFlagged={state.flagged.has(currentQuestion.id)}
                    isCorrect = {state.answers_is_correct[currentQuestion.id]}
                    correctAnswer={state.correct_answers[currentQuestion.id]}
                    fontSize={fontSize}
                    onSelectAnswer={(answer) => selectAnswer(currentQuestion.id, answer)}
                    onClearAnswer={() => clearAnswer(currentQuestion.id)}
                    onToggleFlag={() => toggleFlag(currentQuestion.id)}
                    onSaveAndNext={saveAndNext}
                    isPaused={isPaused}
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
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="p-4 min-w-0 w-full">
              <QuestionDisplay
                isReadOnly={isReadOnly || state.current_submission?.status === 'is_paused'}
                question={currentQuestion}
                selectedAnswer={state.answers[currentQuestion.id]}
                isFlagged={state.flagged.has(currentQuestion.id)}
                isCorrect = {state.answers_is_correct[currentQuestion.id]}
                correctAnswer={state.correct_answers[currentQuestion.id]}
                fontSize={fontSize}
                onSelectAnswer={(answer) => selectAnswer(currentQuestion.id, answer)}
                onClearAnswer={() => clearAnswer(currentQuestion.id)}
                onToggleFlag={() => toggleFlag(currentQuestion.id)}
                onSaveAndNext={saveAndNext}
                isPaused={isPaused}
              />
            </div>
          </div>

          {/* Left sidebar overlay */}
          {leftSidebarOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setLeftSidebarOpen(false)} />
              <div className="fixed left-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] bg-card shadow-xl border-r animate-in slide-in-from-left duration-200">
                <QuizSidebarLeft
                  segments={[{ title: "Questions", questions: quiz.questions, id: 1, order: 0 }]}
                  currentQuestion={state.currentQuestion}
                  getStatus={getQuestionStatus}
                  onSelectQuestion={(id) => {
                    goToQuestion(id)
                    setLeftSidebarOpen(false)
                  }}
                  answers={state.answers}
                  answers_is_correct={state.answers_is_correct}
                  marked={state.marked}
                  flagged={state.flagged}
                  visited={state.visited}
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
