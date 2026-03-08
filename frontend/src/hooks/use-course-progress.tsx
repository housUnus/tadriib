"use client"

import { useEffect, useRef, useCallback } from "react"
import { useClientFetch } from "./auth/use-client-fetch"

interface Options {
  courseId: string
}

export function useEnrollmentProgress({ courseId }: Options) {
  const client = useClientFetch()

  const heartbeatInterval = useRef<NodeJS.Timeout | null>(null)
  const isSending = useRef(false)

  // -----------------------------
  // Set Active Lecture
  // -----------------------------
  const setActiveLecture = useCallback(
    async (lectureId: string) => {
      await client.post(`/enrollments-progress/${courseId}/set_active/`, {
        lecture_id: lectureId,
      })
    },
    [client, courseId]
  )

  // -----------------------------
  // Mark Lecture Completed
  // -----------------------------
  const markCompleted = useCallback(
    async (lectureId: string) => {
      const { data, error } = await client.post(`/enrollments-progress/${courseId}/complete/`, {
        lecture_id: lectureId,
      })
      return !error
    },
    [client, courseId]
  )

  // -----------------------------
  // Start Heartbeat
  // -----------------------------
  const startHeartbeat = useCallback(
    (lectureId: string, getPosition: () => number) => {
      if (heartbeatInterval.current) return

      heartbeatInterval.current = setInterval(async () => {
        if (isSending.current) return

        isSending.current = true
        try {
          await client.post(`/enrollments-progress/${courseId}/heartbeat/`, {
            lecture_id: lectureId,
            position: Math.floor(getPosition()),
          })
        } finally {
          isSending.current = false
        }
      }, 10000) // every 10 seconds
    },
    [client, courseId]
  )

  // -----------------------------
  // Stop Heartbeat
  // -----------------------------
  const stopHeartbeat = useCallback(() => {
    if (heartbeatInterval.current) {
      clearInterval(heartbeatInterval.current)
      heartbeatInterval.current = null
    }
  }, [])

  // -----------------------------
  // Cleanup on unmount
  // -----------------------------
  useEffect(() => {
    return () => {
      stopHeartbeat()
    }
  }, [stopHeartbeat])

  return {
    setActiveLecture,
    markCompleted,
    startHeartbeat,
    stopHeartbeat,
  }
}