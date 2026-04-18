import { CourseMetadata } from "@/stores/course"
import type {
  Section,
  CurriculumItem,
  CourseType,
  CourseRequirements,
  CourseLearningOutcomes,
  Attachment,
} from "@/types/course"
import { serialize } from 'object-to-formdata';

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// API helper functions (these would connect to your actual backend)
export const api = {
  async createCourse(client: any, data: Partial<CourseMetadata>): Promise<ApiResponse<{ id: string }>> {
    // Simulate API call - replace with actual fetch
    await new Promise((r) => setTimeout(r, 500))
    return { success: true, data: { id: crypto.randomUUID() } }
  },

  async getCourse(client: any, courseId: string): Promise<ApiResponse<{ course: CourseMetadata; sections: Section[] }>> {
    const { data: course, error } = await client.get(`/course-create/${courseId}/`)
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true, data: { course: course, sections: course.sections } }
    // Return mock data - replace with actual fetch
  },

  async updateCourse(client: any, courseId: string, data: Partial<CourseMetadata>): Promise<ApiResponse<void>> {

    const payload = serialize(data)
    
    const { response: result, error } = await client.patch(`/course-create/${courseId}/`, payload)
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },

  async updateRequirements(client: any, courseId: string, requirements: CourseRequirements[]): Promise<ApiResponse<void>> {
    const { response: result, error } = await client.put(`/course-create/${courseId}/update_requirements/`, { requirements })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },

  async updateLearningOutcomes(client: any, courseId: string, learning_outcomes: CourseLearningOutcomes[]): Promise<ApiResponse<void>> {
    const { response: result, error } = await client.put(`/course-create/${courseId}/update_learning_outcomes/`, { learning_outcomes })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },


  async createSection(client: any, courseId: string, data: Partial<Section>): Promise<ApiResponse<{ id: string }>> {
    const { data: result, error } = await client.post(`/course-create/${courseId}/sections/`, data)
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true, data: { id: result.id } }
  },

  async updateSection(client: any, courseId: string, sectionId: string, data: Partial<Section>): Promise<ApiResponse<void>> {
    const { data: result, error } = await client.put(`/course-create/${courseId}/sections/update/`, { ...data, sectionId: sectionId })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },

  async deleteSection(client: any, courseId: string, sectionId: string): Promise<ApiResponse<void>> {
    const { data: result, error } = await client.post(`/course-create/${courseId}/sections/delete/`, { sectionId: sectionId })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },

  async reorderSections(client: any, courseId: string, sectionIds: string[]): Promise<ApiResponse<void>> {
    const { data: result, error } = await client.post(`/course-create/${courseId}/sections/reorder/`, { sectionIds: sectionIds })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },

  async createItem(client: any, courseId: string, sectionId: string, data: Partial<CurriculumItem>): Promise<ApiResponse<{ id: string }>> {
    const { data: result, error } = await client.post(`/course-create/${courseId}/items/`, { ...data, sectionId: sectionId })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true, data: { id: result.id } }
  },

  async updateItem(client: any, courseId: string, sectionId: string, itemId: string, data: Partial<CurriculumItem>): Promise<ApiResponse<void>> {
    const asFormData = data.asFormData || false

    let payload: any = { ...data, sectionId: sectionId, itemId: itemId }
    if (asFormData) {
      payload = serialize(payload)
    }

    const { data: result, error } = await client.patch(`/course-create/${courseId}/items/update/`, payload)
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },

  async deleteItem(client: any, courseId: string, sectionId: string, itemId: string): Promise<ApiResponse<void>> {
    const { data: result, error } = await client.post(`/course-create/${courseId}/items/delete/`, { sectionId: sectionId, itemId: itemId })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },

  async reorderItems(client: any, courseId: string, sectionId: string, itemIds: string[]): Promise<ApiResponse<void>> {
    const { data: result, error } = await client.post(`/course-create/${courseId}/items/reorder/`, { sectionId: sectionId, itemIds: itemIds })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },

  async uploadAttachment(client: any, courseId: string, itemId: string, attachment: Attachment): Promise<ApiResponse<{ url: string }>> {
    let payload: any = { ...attachment, itemId: itemId }
    payload = serialize(payload)
    const { data: result, error } = await client.post(`/course-create/${courseId}/documents/`, payload)
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true, data: { url: result.url } }
  },

  async deleteAttachment(client: any, courseId: string, itemId: string, attachmentId: string): Promise<ApiResponse<void>> {
    const { data: result, error } = await client.post(`/course-create/${courseId}/documents/delete/`, { itemId: itemId, attachmentId: attachmentId })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },

  async submitForReview(client: any, courseId: string): Promise<ApiResponse<void>> {
    const { data: result, error } = await client.patch(`/course-create/${courseId}/`, { status: "review" })
    if (error) {
      return { success: false, error: error.message }
    }
    return { success: true }
  },
}
