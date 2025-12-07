"use client"

import { useState } from "react"
import { Clock, CheckCircle, XCircle, ArrowLeft, ArrowRight, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
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
  const [quizState, setQuizState] = useState<QuizState>("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(content.quiz?.timeLimit ? content.quiz.timeLimit * 60 : 0)

  const quiz = content.quiz
  if (!quiz) return null

  const handleStartQuiz = () => {
    setQuizState("in-progress")
    setAnswers(new Array(quiz.questions.length).fill(null))
  }

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleSubmit = () => {
    setQuizState("completed")
    onMarkComplete()
  }

  const calculateScore = () => {
    let correct = 0
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++
    })
    return { correct, total: quiz.questions.length }
  }

  const QuizBadge = () => (
    <div className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-lg bg-black/70 px-3 py-2">
      <HelpCircle className="h-5 w-5 text-white" />
      <span className="text-sm font-medium text-white">Quiz</span>
    </div>
  )

  const NavArrows = () => (
    <>
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-primary p-2 text-primary-foreground transition-opacity hover:bg-primary/90 disabled:opacity-30"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-primary p-2 text-primary-foreground transition-opacity hover:bg-primary/90 disabled:opacity-30"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </>
  )

  // Intro Screen
  if (quizState === "intro") {
    return (
      <div className="relative flex h-full min-h-[500px] items-center justify-center bg-muted/30 py-12">
        <QuizBadge />
        <NavArrows />
        <Card className="w-full max-w-lg border-border bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-card-foreground">{quiz.title}</CardTitle>
            <CardDescription className="text-muted-foreground">{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center gap-8 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{quiz.questions.length}</p>
                <p className="text-muted-foreground">Questions</p>
              </div>
              {quiz.timeLimit && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{quiz.timeLimit}</p>
                  <p className="text-muted-foreground">Minutes</p>
                </div>
              )}
            </div>
            <Button onClick={handleStartQuiz} className="w-full" size="lg">
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Completed Screen
  if (quizState === "completed") {
    const score = calculateScore()
    const percentage = Math.round((score.correct / score.total) * 100)
    const passed = percentage >= 70

    return (
      <div className="relative flex h-full min-h-[500px] items-center justify-center bg-muted/30 py-12">
        <QuizBadge />
        <NavArrows />
        <Card className="w-full max-w-lg border-border bg-card">
          <CardHeader className="text-center">
            <div
              className={cn(
                "mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full",
                passed ? "bg-success/20" : "bg-destructive/20",
              )}
            >
              {passed ? (
                <CheckCircle className="h-8 w-8 text-success" />
              ) : (
                <XCircle className="h-8 w-8 text-destructive" />
              )}
            </div>
            <CardTitle className="text-2xl text-card-foreground">
              {passed ? "Congratulations!" : "Keep Practicing"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {passed ? "You passed the quiz!" : "You need 70% to pass. Try again!"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-foreground">{percentage}%</p>
              <p className="text-muted-foreground">
                {score.correct} of {score.total} correct
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setQuizState("intro")
                  setCurrentQuestion(0)
                  setAnswers([])
                }}
              >
                Retry Quiz
              </Button>
              <Button className="flex-1" onClick={onNext} disabled={!hasNext}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // In Progress
  const question = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="relative h-full min-h-[500px] bg-muted/30 p-6">
      <QuizBadge />
      <NavArrows />

      <div className="mx-auto max-w-2xl space-y-6 pt-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{quiz.title}</h2>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          {quiz.timeLimit && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>

        <Progress value={progress} className="h-2" />

        {/* Question Card */}
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h3 className="mb-6 text-lg font-medium text-card-foreground">{question.text}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={cn(
                    "w-full rounded-lg border p-4 text-left transition-colors",
                    answers[currentQuestion] === index
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-secondary hover:border-primary/50 text-secondary-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full border text-sm font-medium",
                        answers[currentQuestion] === index
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground text-muted-foreground",
                      )}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <Button onClick={handleSubmit} disabled={answers.includes(null)}>
              Submit Quiz
            </Button>
          ) : (
            <Button onClick={() => setCurrentQuestion((prev) => prev + 1)} disabled={answers[currentQuestion] === null}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
