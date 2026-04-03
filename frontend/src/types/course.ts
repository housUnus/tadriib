import { id } from "zod/v4/locales"

export type ContentType = "video" | "article" | "webinar"

export type QuestionType = "multiple_choice" | "true_false" | "fill_blank"

export type CourseType = "course" | "quiz" | "webinar"

export interface CourseCategory {
  id: string
  name: string
  slug: string
  path_name: string
  path_url: string
  children: CourseCategory[]
}

export type string =
  | "development"
  | "business"
  | "finance"
  | "it-software"
  | "design"
  | "marketing"
  | "lifestyle"
  | "photography"
  | "health"
  | "music"
  | "teaching"
  | "other"

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
  file?: File
}

export interface QuizQuestion {
  id: string
  index: number
  type: QuestionType
  question: string // HTML content from rich text editor
  options?: string[]
  correct_answer?: number[] | number | string | string[] | boolean
  allow_multiple_answers?: boolean
  answer_hint?: string
  answer_explanation?: string
}

export interface WebinarSchedule {
  date: string
  startTime: string
  endTime: string
  timezone: string
  meetingUrl?: string
  recordingUrl?: string
}

export interface Data {
// For video content
  file?: File | null
  url?: string
  preview?: string
  // For article content
  text?: string
  // For quiz
  questions?: QuizQuestion[]
  duration?: number
  // For webinar
  webinarSchedule?: WebinarSchedule
  webinarDescription?: string
}

export interface CurriculumItem {
  id: string
  type: "lecture" | "quiz" | "webinar"
  title: string
  contentType?: ContentType
  isComplete: boolean
  // Attachments for any item
  attachments?: Attachment[]
  content?: Data
}

export interface Section {
  id: string
  title: string
  items: CurriculumItem[]
  isExpanded: boolean
}

// Course Goals
export interface CourseGoals {
  learningObjectives: string[] // What will students learn
  prerequisites: string[] // Requirements/prerequisites
  targetAudience: string[] // Who is this course for
}

// Course Requirements
export interface CourseRequirements {
  requirements: string[]
  tools: string[]
  skillLevel: "beginner" | "intermediate" | "advanced" | "all"
}

// Course Pricing
export interface CoursePricing {
  isFree: boolean
  price: number
  currency: string
  hasDiscount: boolean
  discountPrice?: number
  discountEndDate?: string
}

// Course Messages
export interface CourseMessages {
  welcomeMessage: string
  completionMessage: string
}

// Full Course Data
export interface CourseData {
  // Basic Info (from wizard)
  title: string
  subtitle: string
  description: string
  type: CourseType
  category: string
  level: "beginner" | "intermediate" | "advanced" | "all"
  language: string
  thumbnail: string | null
  promoVideo?: string
  // Extended data
  goals: CourseGoals
  requirements: CourseRequirements
  pricing: CoursePricing
  messages: CourseMessages
  // Curriculum
  sections: Section[]
}

// Wizard Step Data
export interface CourseWizardData {
  title: string
  type: CourseType
  category: string
  subcategory?: string
}
