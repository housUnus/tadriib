"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { Quiz, QuizStats, type QuizState } from "@/lib/data/quiz-data"
import { isNil } from "lodash"
import { useRouter } from "next/navigation"


export function isAnswered(value: any) {
  if (isNil(value)) return false
  if (typeof value === "string" && value.trim() === "") return false
  return true
}



export function useQuiz(quiz: Quiz, content: any, client: any) {

  const submissionId = content?.progress?.active_quiz_submission || null

  const router = useRouter()

  const questions = useMemo(() => {
    return quiz.segments
      .sort((a, b) => a.order - b.order)
      .flatMap((segment) =>
        segment.questions.sort((a, b) => a.order - b.order)
      )
  }, [quiz])

  const createInitialState = (): QuizState => ({
    currentQuestion: questions[0]?.id,
    answers: {},
    marked: new Set<number>(),
    flagged: new Set<number>(),
    visited: new Set<number>([questions[0]?.id]),
    status: "not_started",
  })

  const [state, setState] = useState<QuizState>(createInitialState)

  const loadSubmission = useCallback(async () => {
    if (!submissionId) return
    const { data } = await client.get(`/quiz-submissions/${submissionId}`)

    setState({
      currentQuestion: data.current_question ?? questions[0]?.id,
      answers: data.answers ?? {},
      marked: new Set(),
      flagged: new Set(data.flagged ?? []),
      visited: new Set(data.visited ?? []),
      computed_remaining: data.computed_remaining ?? 0,
      status: data.status,
      started_at: data.started_at,
      paused_at: data.paused_at,
      expires_at: data.expires_at,
    })
  }, [submissionId])

  useEffect(() => {
    loadSubmission()
  }, [submissionId])

  const goToQuestion = useCallback(async (questionId: number) => {

    setState(prev => ({
      ...prev,
      currentQuestion: questionId,
      visited: new Set([...prev.visited, questionId]),
    }))

    await client.put(`/quiz-submissions/${submissionId}/navigate/`, {
      question_id: questionId,
    })

  }, [])

  const submitAnswer = async (questionId: number, answer: any) => {
    const formData = new FormData()

    formData.append("question_id", String(questionId))

    if (answer instanceof File) {
      formData.append("answer", answer)
    } else {
      formData.append("answer", JSON.stringify(answer))
    }

    await client.put(`/quiz-submissions/${submissionId}/answer/`, formData)
  }

  const selectAnswer = useCallback(async (questionId: number, answer: any) => {

    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }))

    submitAnswer(questionId, answer)

  }, [])

  const clearAnswer = useCallback((questionId: number) => {
    setState((prev) => {
      const newAnswers = { ...prev.answers }
      delete newAnswers[questionId]
      return { ...prev, answers: newAnswers }
    })
  }, [])

  const toggleMark = useCallback((questionId: number) => {
    setState((prev) => {
      const newMarked = new Set(prev.marked)

      if (newMarked.has(questionId)) newMarked.delete(questionId)
      else newMarked.add(questionId)

      return { ...prev, marked: newMarked }
    })
  }, [])

  const toggleFlag = useCallback((questionId: number) => {
    setState((prev) => {
      const newFlagged = new Set(prev.flagged)

      if (newFlagged.has(questionId)) newFlagged.delete(questionId)
      else newFlagged.add(questionId)


      client.put(`/quiz-submissions/${submissionId}/flag/`, {
        question_id: questionId,
        flagged: newFlagged.has(questionId),
      })


      return { ...prev, flagged: newFlagged }
    })
  }, [])

  const saveAndNext = useCallback(() => {
    setState((prev) => {
      const index = questions.findIndex(q => q.id === prev.currentQuestion)

      const nextQuestion =
        questions[Math.min(index + 1, questions.length - 1)]

      return {
        ...prev,
        currentQuestion: nextQuestion.id,
        visited: new Set([...prev.visited, nextQuestion.id]),
      }
    })
  }, [questions])

  const getQuestionStatus = useCallback(
    (questionId: number) => {
      if (state.flagged.has(questionId)) return "flagged"
      if (state.marked.has(questionId)) return "marked"
      if (isAnswered(state.answers[questionId])) return "answered"
      if (state.visited.has(questionId)) return "visited"
      return "not-visited"
    },
    [state]
  )

  const getStats = useCallback(
    () => ({
      total: questions.length,
      visited: state.visited.size,
      notVisited: questions.length - state.visited.size,
      answered: questions.filter(q => isAnswered(state.answers[q.id])).length,
      notAnswered: questions.length - Object.keys(state.answers).length,
      marked: state.marked.size,
      flagged: state.flagged.size,
      is_paused: state.status === "is_paused",
      computed_remaining: state.computed_remaining,
    }),
    [state, questions]
  )

  const currentQuestion = useMemo(() => {
    return questions.find(q => q.id === state.currentQuestion)
  }, [state.currentQuestion, questions])

  const submitQuiz = async () => {
    await client.post(`/quiz-submissions/${submissionId}/submit/`)
    router.refresh()
    content.invalidate()
  }

  return {
    state,
    questions,
    goToQuestion,
    selectAnswer,
    clearAnswer,
    toggleMark,
    toggleFlag,
    saveAndNext,
    getQuestionStatus,
    getStats,
    currentQuestion,
    submitQuiz,
  }
}