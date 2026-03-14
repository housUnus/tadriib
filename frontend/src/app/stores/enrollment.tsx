import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { create } from "zustand"

export type ContentType = "video" | "quiz" | "article" | "assignment" | "attachment"

export type CourseProgress = {
    active_lecture: string | null
    completed_lectures: number
    progress_percent: number
    total_lectures: number
}

export type QuizSubmission = {
    id: number
}

export type LectureProgress = {
    completed_at: string | null
    course_progress: number | null
    is_completed: boolean
    last_accessed_at: string | null
    last_position_seconds: number
    lecture: string
    active_quiz_submission?: QuizSubmission
}

export type Content = {
    id: string
    title: string
    description?: string
    duration_minutes: number
    type: ContentType
    content?: any
    progress: LectureProgress
}

export type Section = {
    id: string
    title: string
    contents: Content[]
}

export type Course = {
    id: string
    title: string
    description: string
    sections: Section[]
}

export type EnrollmentStore = {
    progress: CourseProgress | null
    course: Course
    id: string

    setProgress: (progress: CourseProgress) => void
    setActiveLecture: (client:any, lectureId: string) => void
    updateLectureProgress: (lectureId: string, position: number) => void
    markLectureCompleted: (client: any, lectureId: string) => void
    setState: (state: any) => void
    startHeartbeat: (client: any, lectureId: string, getPosition: () => number) => void
    stopHeartbeat: () => void
}

export const useEnrollmentStore = create<EnrollmentStore>((set, get) => {
    let heartbeatInterval: NodeJS.Timeout | null = null
    let isSending = false

    return {
        progress: null,
        id: "",
        course: {
            id: "",
            title: "",
            description: "",
            sections: [],
        },

        setState: (state) => set(state),

        setProgress: (progress) => set({ progress }),

        // -----------------------------
        // Set Active Lecture
        // -----------------------------
        setActiveLecture: async (client, lectureId) => {
            const { course } = get()

            await client.post(`/enrollments-progress/${course.id}/set_active/`, {
                lecture_id: lectureId,
            })

            set((state) => ({
                progress: state.progress
                    ? { ...state.progress, active_lecture: lectureId }
                    : null,
            }))
        },

        // -----------------------------
        // Update Lecture Position (local)
        // -----------------------------
        updateLectureProgress: (lectureId, position) =>
            set((state) => ({
                course: {
                    ...state.course,
                    sections: state.course.sections.map((section) => ({
                        ...section,
                        contents: section.contents.map((content) =>
                            content.id === lectureId
                                ? {
                                    ...content,
                                    progress: {
                                        ...content.progress,
                                        last_position_seconds: position,
                                    },
                                }
                                : content
                        ),
                    })),
                },
            })),

        // -----------------------------
        // Mark Lecture Completed
        // -----------------------------
        markLectureCompleted: async (client, lectureId) => {
            const { course } = get()

            const { error } = await client.post(`/enrollments-progress/${course.id}/complete/`, {
                lecture_id: lectureId,
            })

            if (error) {
                console.error("Failed to mark lecture as completed:", error)
                return
            }

            set((state) => {
                let completedLectures = 0
                let totalLectures = 0

                const sections = state.course.sections.map((section) => ({
                    ...section,
                    contents: section.contents.map((content) => {
                        totalLectures++

                        const updated =
                            content.id === lectureId
                                ? {
                                    ...content,
                                    progress: {
                                        ...content.progress,
                                        is_completed: !content.progress?.is_completed,
                                    },
                                }
                                : content

                        if (updated.progress?.is_completed) completedLectures++

                        return updated
                    }),
                }))

                return {
                    course: {
                        ...state.course,
                        sections,
                    },
                    progress: state.progress
                        ? {
                            ...state.progress,
                            completed_lectures: completedLectures,
                            progress_percent: (completedLectures / totalLectures) * 100,
                        }
                        : null,
                }
            })
        },

        // -----------------------------
        // Start Heartbeat
        // -----------------------------
        startHeartbeat: (client: any, lectureId: string, getPosition: () => number) => {
            const { course, updateLectureProgress } = get()

            if (heartbeatInterval) clearInterval(heartbeatInterval)

            heartbeatInterval = setInterval(async () => {
                if (isSending) return

                isSending = true
                try {
                    const position = Math.floor(getPosition())
                    const { error } = await client.post(`/enrollments-progress/${course.id}/heartbeat/`, {
                        lecture_id: lectureId,
                        position,
                    })
                    if (error) {
                        console.error("Failed to send heartbeat:", error)
                        return
                    }

                    updateLectureProgress(lectureId, position)

                } finally {
                    isSending = false
                }
            }, 30000)
        },

        // -----------------------------
        // Stop Heartbeat
        // -----------------------------
        stopHeartbeat: () => {
            if (heartbeatInterval) {
                clearInterval(heartbeatInterval)
                heartbeatInterval = null
            }
        },
    }
})
