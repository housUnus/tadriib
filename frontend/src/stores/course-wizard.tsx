import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CourseType, CourseCategory } from "@/types/course"

interface WizardState {
  step: number
  title: string
  type: CourseType
  category: string
  subcategory: string
  isComplete: boolean
  courseId: string | null
}

interface WizardStore extends WizardState {
  setStep: (step: number) => void
  submitWizard: (client: any, course: WizardState) => Promise<string | null>
  reset: () => void
}

const initialState: WizardState = {
  step: 1,
  title: "",
  type: "course",
  category: "development",
  subcategory: "",
  isComplete: false,
  courseId: null,
}

// API call to create course draft
async function createCourseDraft(client: any, data: {
  title: string
  type: CourseType
  category: string
  subcategory: string
}): Promise<{ success: boolean; courseId?: string; error?: string }> {
  // Simulate API call - replace with actual endpoint
  const {data: result, error} = await client.post("/course-create/", data)
  console.log("[API] Creating course draft:", data)
  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true, courseId: result.id }
}

export const useCourseWizardStore = create<WizardStore>()(
  (set, get) => ({
    ...initialState,

    setStep: (step) => set({ step }),

    submitWizard: async (client: any, course: WizardState) => {
      const { title, type, category, subcategory } = course

      if (!title.trim()) {
        return null
      }

      const result = await createCourseDraft(client, { title, type, category, subcategory })

      if (result.success && result.courseId) {
        set({ isComplete: true, courseId: result.courseId })
        return result.courseId
      }

      return null
    },

    reset: () => set(initialState),
  }),
)
