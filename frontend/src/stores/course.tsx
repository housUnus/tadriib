import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { 
  Section, 
  CurriculumItem, 
  QuizQuestion, 
  Attachment,
  CourseType,
  CourseCategory,
  CourseGoals,
  CourseRequirements,
  CoursePricing,
  CourseMessages,
  CourseLearningOutcomes,
} from "@/types/course"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { api } from "@/lib/utils/course-api"
import { pick, pickBy } from "lodash"

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export type Status = "draft" | "review" | "published" | "rejected"

export interface CourseStatus {
  status: Status
  lastSaved: Date | null
  isSaving: boolean
  error: string | null
}

export interface CourseMetadata {
  id: string | null
  title: string
  subtitle: string
  description: string
  type: CourseType
  category: string
  sub_category?: string
  level: string
  language: string
  price?: number
  thumbnail: string | null
  poster?: string
  learning_outcomes: CourseLearningOutcomes[]
  requirements: CourseRequirements[]
  pricing: CoursePricing
  messages: CourseMessages
  status: Status
}

export interface CourseStore {
  // Course metadata
  course: CourseMetadata
  status: CourseStatus
  sections: Section[]

  // Actions - Course
  initCourse: (client: any, courseId?: string) => Promise<void>
  updateCourseMetadata: (client: any, data: Partial<CourseMetadata>) => Promise<void>
  updateRequirements: (client: any, requirements: CourseRequirements[]) => Promise<void>
  updateLearningOutcomes: (client: any, learning_outcomes: CourseLearningOutcomes[]) => Promise<void>
  saveCourse: (client: any, ) => Promise<void>
  submitForReview: (client: any, ) => Promise<void>

  // Actions - Sections
  addSection: (client: any) => Promise<void>
  updateSection: (client: any, sectionId: string, data: Partial<Section>) => Promise<void>
  deleteSection: (client: any, sectionId: string) => Promise<void>
  reorderSections: (client: any, oldIndex: number, newIndex: number) => Promise<void>

  // Actions - Items
  addItem: (client: any, sectionId: string, type: "video" | "quiz" | "conference" | "article") => Promise<void>
  updateItem: (client: any, sectionId: string, itemId: string, data: Partial<CurriculumItem>) => Promise<void>
  deleteItem: (client: any, sectionId: string, itemId: string) => Promise<void>
  reorderItems: (client: any, sectionId: string, oldIndex: number, newIndex: number) => Promise<void>

  // Actions - Questions
  addQuestion: (client: any, sectionId: string, itemId: string) => Promise<void>
  updateQuestion: (client: any, sectionId: string, itemId: string, questionId: string, data: Partial<QuizQuestion>) => Promise<void>
  deleteQuestion: (client: any, sectionId: string, itemId: string, questionId: string) => Promise<void>


  updateItemAttachments: (client: any, sectionId: string, itemId: string, data: Partial<Attachment>) => Promise<void>
  // Actions - Attachments
  addAttachment: (client: any, sectionId: string, itemId: string, attachment: Attachment) => Promise<void>
  removeAttachment: (client: any, sectionId: string, itemId: string, attachmentId: string) => Promise<void>
  // Helpers
  setSaving: (isSaving: boolean) => void
  setError: (error: string | null) => void
}

// Debounce helper for auto-save
function debounce<T extends (...args: unknown[]) => unknown>(fn: T, ms: number) {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), ms)
  }
}

export const useCourseStore = create<CourseStore>()(
  devtools(
    (set, get) => {

      // Debounced auto-save for metadata changes
      const debouncedSaveMetadata = debounce(async (client) => {
        const { course } = get()
        let fieldsToUpdate = [
          "title", 
          "subtitle",
          "description",
          "type",
          "category",
          "sub_category",
          "level",
          "language",
          "poster",
          "price"
        ]

        if(course.poster && typeof course.poster === "string") {
          fieldsToUpdate = fieldsToUpdate.filter(f => f !== "poster")
        }
        const payload = pickBy(
          pick(course, fieldsToUpdate),
          (value) => value !== null && value !== ""
        );

        if (!course.id) return
        set((state) => ({ status: { ...state.status, isSaving: true } }))
        const result = await api.updateCourse(client, course.id, payload)
        set((state) => ({
          status: {
            ...state.status,
            isSaving: false,
            lastSaved: result.success ? new Date() : state.status.lastSaved,
            error: result.error || null,
          },
        }))
      }, 1000)

      return {
        // Initial state
        course: {
          id: null,
          title: "Untitled Course",
          subtitle: "",
          description: "",
          type: "course" as CourseType,
          category: "",
          level: "beginner",
          language: "English",
          thumbnail: null,
          requirements: [],
          learning_outcomes: [],
          pricing: {
            isFree: true,
            price: 0,
            currency: "USD",
            hasDiscount: false,
          },
          messages: {
            welcomeMessage: "",
            completionMessage: "",
          },
        },
        status: {
          status: "draft",
          lastSaved: null,
          isSaving: false,
          error: null,
        },
        sections: [],

        // Course actions
        initCourse: async (client, courseId) => {
          console.log("🚀 ~ courseId:", courseId)
          if (courseId) {
            // Load existing course
            const result = await api.getCourse(client, courseId)
            if (result.success && result.data) {
              set({
                course: result.data.course,
                sections: result.data.sections,
                status: {
                  ...get().status,
                  status: result.data.course?.status,
                }
              })
            }
          } else {
            // Create new draft course
            const result = await api.createCourse(client, { title: "Untitled Course" })
            if (result.success && result.data) {
              set((state) => ({
                course: { ...state.course, id: result.data!.id },
                status: { ...state.status, status: "draft", lastSaved: new Date() },
              }))
            }
          }
        },

        updateRequirements: async (client, requirements) => {
          set((state) => ({
            course: { ...state.course, requirements },
          }))
          api.updateRequirements(client, get().course.id!, requirements) // Fire and forget - no need to await
        },

        updateLearningOutcomes: async (client, learning_outcomes) => {
          set((state) => ({
            course: { ...state.course, learning_outcomes },
          })) 
          api.updateLearningOutcomes(client, get().course.id!, learning_outcomes) // Fire and forget - no need to await
        },

        updateCourseMetadata: async (client, data) => {
          set((state) => ({
            course: { ...state.course, ...data },
          }))
          debouncedSaveMetadata(client)
        },

        saveCourse: async (client) => {
          const { course, sections } = get()
          if (!course.id) return

          set((state) => ({ status: { ...state.status, isSaving: true } }))

          const result = await api.updateCourse(client, course.id, { ...course })
          
          set((state) => ({
            status: {
              ...state.status,
              isSaving: false,
              lastSaved: result.success ? new Date() : state.status.lastSaved,
              error: result.error || null,
            },
          }))
        },

        submitForReview: async (client) => {
          const { course } = get()
          if (!course.id) return

          set((state) => ({ status: { ...state.status, isSaving: true } }))
          const result = await api.submitForReview(client, course.id)

          if (result.success) {
            set((state) => ({
              status: { ...state.status, status: "review", isSaving: false },
            }))
          } else {
            set((state) => ({
              status: { ...state.status, isSaving: false, error: result.error || "Failed to submit" },
            }))
          }
        },

        // Section actions
        addSection: async (client) => {
          const { course } = get()
          const tempId = `temp-${crypto.randomUUID()}`

          // Optimistic update
          const newSection: Section = {
            id: tempId,
            title: "",
            isExpanded: true,
            items: [],
          }
          set((state) => ({ sections: [...state.sections, newSection] }))

          // API call
          if (course.id) {
            set((state) => ({ status: { ...state.status, isSaving: true } }))
            const result = await api.createSection(client, course.id, { title: "" })

            if (result.success && result.data) {
              // Update with real ID from server
              set((state) => ({
                sections: state.sections.map((s) =>
                  s.id === tempId ? { ...s, id: result.data!.id } : s
                ),
                status: { ...state.status, isSaving: false, lastSaved: new Date() },
              }))
            } else {
              // Rollback on error
              set((state) => ({
                sections: state.sections.filter((s) => s.id !== tempId),
                status: { ...state.status, isSaving: false, error: result.error || "Failed to create section" },
              }))
            }
          }
        },

        updateSection: async (client, sectionId, data) => {
          const { course } = get()

          // Optimistic update
          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === sectionId ? { ...s, ...data } : s
            ),
          }))

          // API call (debounced for title changes)
          if (course.id && !sectionId.startsWith("temp-")) {
            set((state) => ({ status: { ...state.status, isSaving: true } }))
            const result = await api.updateSection(client, course.id, sectionId, data)
            set((state) => ({
              status: {
                ...state.status,
                isSaving: false,
                lastSaved: result.success ? new Date() : state.status.lastSaved,
              },
            }))
          }
        },

        deleteSection: async (client, sectionId) => {
          const { course, sections } = get()
          const sectionToDelete = sections.find((s) => s.id === sectionId)

          // Optimistic update
          set((state) => ({
            sections: state.sections.filter((s) => s.id !== sectionId),
          }))

          // API call
          if (course.id && !sectionId.startsWith("temp-")) {
            set((state) => ({ status: { ...state.status, isSaving: true } }))
            const result = await api.deleteSection(client, course.id, sectionId)

            if (!result.success && sectionToDelete) {
              // Rollback on error
              set((state) => ({
                sections: [...state.sections, sectionToDelete],
                status: { ...state.status, isSaving: false, error: result.error || "Failed to delete section" },
              }))
            } else {
              set((state) => ({
                status: { ...state.status, isSaving: false, lastSaved: new Date() },
              }))
            }
          }
        },

        reorderSections: async (client,oldIndex, newIndex) => {
          const { course, sections } = get()
          const reordered = [...sections]
          const [removed] = reordered.splice(oldIndex, 1)
          reordered.splice(newIndex, 0, removed)

          // Optimistic update
          set({ sections: reordered })

          // API call
          if (course.id) {
            const result = await api.reorderSections(
              client,
              course.id,
              reordered.map((s) => s.id)
            )
            if (!result.success) {
              // Rollback on error
              set({ sections })
            }
          }
        },

        // Item actions
        addItem: async (client, sectionId, type) => {
          const { course } = get()
          const tempId = `temp-${crypto.randomUUID()}`

          const newItem: CurriculumItem = {
            id: tempId,
            type,
            title: "",
            is_expanded: true,
            isComplete: false,
            ...(type === "quiz" ? { content:{questions: []} } : {}),
          }

          // Optimistic update
          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
            ),
          }))

          // API call
          if (course.id && !sectionId.startsWith("temp-")) {
            set((state) => ({ status: { ...state.status, isSaving: true } }))
            const result = await api.createItem(client, course.id, sectionId, { type, title: "" })

            if (result.success && result.data) {
              set((state) => ({
                sections: state.sections.map((s) =>
                  s.id === sectionId
                    ? {
                        ...s,
                        items: s.items.map((i) =>
                          i.id === tempId ? { ...i, id: result.data!.id } : i
                        ),
                      }
                    : s
                ),
                status: { ...state.status, isSaving: false, lastSaved: new Date() },
              }))
            } else {
              // Rollback
              set((state) => ({
                sections: state.sections.map((s) =>
                  s.id === sectionId
                    ? { ...s, items: s.items.filter((i) => i.id !== tempId) }
                    : s
                ),
                status: { ...state.status, isSaving: false, error: result.error || "Failed to create item" },
              }))
            }
          }
        },

        updateItem: async (client, sectionId, itemId, data) => {
          console.log("🚀 ~ sectionId:", sectionId)
          const { course } = get()

          // Optimistic update
          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) => (i.id === itemId ? { ...i, ...data } : i)),
                  }
                : s
            ),
          }))

          // API call
          if (course.id && !sectionId.startsWith("temp-") && !itemId.startsWith("temp-")) {
            set((state) => ({ status: { ...state.status, isSaving: true } }))
            const result = await api.updateItem(client, course.id, sectionId, itemId, data)
            set((state) => ({
              status: {
                ...state.status,
                isSaving: false,
                lastSaved: result.success ? new Date() : state.status.lastSaved,
              },
            }))
          }
        },

        deleteItem: async (client, sectionId, itemId) => {
          const { course, sections } = get()
          const section = sections.find((s) => s.id === sectionId)
          const itemToDelete = section?.items.find((i) => i.id === itemId)

          // Optimistic update
          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === sectionId
                ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
                : s
            ),
          }))

          // API call
          if (course.id && !sectionId.startsWith("temp-") && !itemId.startsWith("temp-")) {
            set((state) => ({ status: { ...state.status, isSaving: true } }))
            const result = await api.deleteItem(client, course.id, sectionId, itemId)

            if (!result.success && itemToDelete) {
              // Rollback
              set((state) => ({
                sections: state.sections.map((s) =>
                  s.id === sectionId ? { ...s, items: [...s.items, itemToDelete] } : s
                ),
                status: { ...state.status, isSaving: false, error: result.error || "Failed to delete item" },
              }))
            } else {
              set((state) => ({
                status: { ...state.status, isSaving: false, lastSaved: new Date() },
              }))
            }
          }
        },

        reorderItems: async (client, sectionId, oldIndex, newIndex) => {
          const { course, sections } = get()
          const section = sections.find((s) => s.id === sectionId)
          if (!section) return

          const reorderedItems = [...section.items]
          const [removed] = reorderedItems.splice(oldIndex, 1)
          reorderedItems.splice(newIndex, 0, removed)

          // Optimistic update
          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === sectionId ? { ...s, items: reorderedItems } : s
            ),
          }))

          // API call
          if (course.id && !sectionId.startsWith("temp-")) {
            const result = await api.reorderItems(
              client,
              course.id,
              sectionId,
              reorderedItems.map((i) => i.id)
            )
            if (!result.success) {
              // Rollback
              set((state) => ({
                sections: state.sections.map((s) =>
                  s.id === sectionId ? { ...s, items: section.items } : s
                ),
              }))
            }
          }
        },

        // Question actions
        addQuestion: async (client, sectionId, itemId) => {
          const newQuestion: QuizQuestion = {
            _id: `temp-${crypto.randomUUID()}`,
            order: 0,
            answer_type: "multiple_choice",
            text: "",
            options: [{text: "Option 1"}, {text: "Option 2"}],
            correct_answer: '',
            allow_multiple_answers: false,
          }

          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === itemId
                        ? { ...i, content: {
                          ...i.content,
                          questions: [{...newQuestion, order: (i.content?.questions || []).length}, ...(i.content?.questions || [])] }
                        }
                        : i
                    ),
                  }
                : s
            ),
          }))

          // Trigger item update to save
          const { updateItem, sections } = get()
          const section = sections.find((s) => s.id === sectionId)
          const item = section?.items.find((i) => i.id === itemId)
          if (item) {
            await updateItem(client, sectionId, itemId, {content: {...item.content, questions: item.content?.questions}})
          }
        },

        updateQuestion: async (client, sectionId, itemId, questionId, data) => {
          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === itemId
                        ? {
                            ...i,
                            content:{
                              ...i.content,
                              questions: (i.content?.questions || []).map((q) =>
                                q._id === questionId ? { ...q, ...data } : q
                              ),
                            }
                          }
                        : i
                    ),
                  }
                : s
            ),
          }))

          // Trigger item update to save (debounced)
          const { updateItem, sections } = get()
          const section = sections.find((s) => s.id === sectionId)
          const item = section?.items.find((i) => i.id === itemId)
          if (item) {
            await updateItem(client, sectionId, itemId, { content: {...item.content, questions: item.content?.questions} })
          }
        },

        deleteQuestion: async (client, sectionId, itemId, questionId) => {
          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === itemId
                        ? { ...i, 
                          content: {...i.content, questions: (i.content?.questions || []).filter((q) => q._id !== questionId) }}
                        : i
                    ),
                  }
                : s
            ),
          }))

          // Trigger item update to save
          const { updateItem, sections } = get()
          const section = sections.find((s) => s.id === sectionId)
          const item = section?.items.find((i) => i.id === itemId)
          if (item) {
            await updateItem(client, sectionId, itemId, { content: {...item.content, questions: item.content?.questions} })
          }
        },

        // Attachment actions
        addAttachment: async (client, sectionId, itemId, attachment) => {
          const { course } = get()

          // Optimistic update
          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === itemId
                        ? { ...i, attachments: [...(i.attachments || []), attachment] }
                        : i
                    ),
                  }
                : s
            ),
          }))

          // Upload file if present
          if (attachment.file && course.id) {
            const result = await api.uploadAttachment(client, course.id, itemId, attachment)
            if (result.success && result.data) {
              // Update with server URL
              set((state) => ({
                sections: state.sections.map((s) =>
                  s.id === sectionId
                    ? {
                        ...s,
                        items: s.items.map((i) =>
                          i.id === itemId
                            ? {
                                ...i,
                                attachments: (i.attachments || []).map((a) =>
                                  a.tempId === attachment.tempId ? { ...a, ...result.data } : a
                                ),
                              }
                            : i
                        ),
                      }
                    : s
                ),
              }))
            }
          }
        },

        removeAttachment: async (client, sectionId, itemId, attachmentId) => {
          const { course } = get()

          set((state) => ({
            sections: state.sections.map((s) =>
              s.id === sectionId
                ? {
                    ...s,
                    items: s.items.map((i) =>
                      i.id === itemId
                        ? { ...i, attachments: (i.attachments || []).filter((a) => a.id !== attachmentId) }
                        : i
                    ),
                  }
                : s
            ),
          }))
          console.log("xxxxxxxxxxx 🚀 ~ attachmentId:", attachmentId)
          
          if (course.id) {
            await api.deleteAttachment(client, course.id, itemId, attachmentId)
          }
        },

        // Helpers
        setSaving: (isSaving) => {
          set((state) => ({ status: { ...state.status, isSaving } }))
        },

        setError: (error) => {
          set((state) => ({ status: { ...state.status, error } }))
        },
      }
    },
    { name: "course-store" }
  )
)
