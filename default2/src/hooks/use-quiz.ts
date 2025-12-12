"use client"

import { useState, useCallback, useMemo } from "react"
import { sampleQuestions, type QuizState } from "@/lib/data/quiz-data"

const createInitialState = (): QuizState => ({
  currentQuestion: 1,
  answers: {},
  marked: new Set<number>(),
  flagged: new Set<number>(),
  visited: new Set<number>([1]),
})

export function useQuiz() {
  const [state, setState] = useState<QuizState>(createInitialState)

  const goToQuestion = useCallback((questionId: number) => {
    setState((prev) => ({
      ...prev,
      currentQuestion: questionId,
      visited: new Set([...prev.visited, questionId]),
    }))
  }, [])

  const selectAnswer = useCallback((questionId: number, answer: string) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }))
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
      if (newMarked.has(questionId)) {
        newMarked.delete(questionId)
      } else {
        newMarked.add(questionId)
      }
      return { ...prev, marked: newMarked }
    })
  }, [])

  const toggleFlag = useCallback((questionId: number) => {
    setState((prev) => {
      const newFlagged = new Set(prev.flagged)
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId)
      } else {
        newFlagged.add(questionId)
      }
      return { ...prev, flagged: newFlagged }
    })
  }, [])

  const saveAndNext = useCallback(() => {
    setState((prev) => {
      const nextQuestion = Math.min(prev.currentQuestion + 1, sampleQuestions.length)
      return {
        ...prev,
        currentQuestion: nextQuestion,
        visited: new Set([...prev.visited, nextQuestion]),
      }
    })
  }, [])

  const getQuestionStatus = useCallback(
    (questionId: number) => {
      if (state.flagged.has(questionId)) return "flagged"
      if (state.marked.has(questionId)) return "marked"
      if (state.answers[questionId]) return "answered"
      if (state.visited.has(questionId)) return "visited"
      return "not-visited"
    },
    [state],
  )

  const getStats = useCallback(
    () => ({
      total: sampleQuestions.length,
      visited: state.visited.size,
      notVisited: sampleQuestions.length - state.visited.size,
      answered: Object.keys(state.answers).length,
      notAnswered: sampleQuestions.length - Object.keys(state.answers).length,
      marked: state.marked.size,
      flagged: state.flagged.size,
    }),
    [state],
  )

  const currentQuestion = useMemo(() => {
    return sampleQuestions.find((q) => q.id === state.currentQuestion)
  }, [state.currentQuestion])

  return {
    state,
    goToQuestion,
    selectAnswer,
    clearAnswer,
    toggleMark,
    toggleFlag,
    saveAndNext,
    getQuestionStatus,
    getStats,
    currentQuestion,
  }
}
