export type ContentType = "video" | "article" | "conference" | "quiz"

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

export interface Attachment {
  id?: string
  tempId: string
  name: string
  type: string
  size: number
  url?: string
  file?: File
}

export interface Options {
  text: string
  id?: string
  is_correct?: boolean
}

export interface QuizQuestion {
  _id: string
  id?: string
  order: number
  answer_type: QuestionType
  text: string // HTML content from rich text editor
  options?: Options[] // For multiple choice
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
  description?: string
  show_correct_answers?: boolean
  show_final_score?: boolean
  max_attempts?: number | null
  can_pause?: boolean
  can_retake?: boolean
  require_review?: boolean
  time_limit_minutes?: number | null
  // For webinar
  webinarSchedule?: WebinarSchedule
  webinarDescription?: string
  
}

export interface CurriculumItem {
  id: string
  type: ContentType
  title: string
  isComplete: boolean
  is_expanded?: boolean
  // Attachments for any item
  attachments?: Attachment[]
  content?: Data
  asFormData?: boolean
  is_preview?: boolean
  is_main_preview?: boolean
}

export interface Section {
  id: string
  title: string
  items: CurriculumItem[]
  isExpanded: boolean
}

export interface CourseLearningOutcomes {
  id?: string
  text: string
}

export interface CourseRequirements {
  id?: string
  text: string
} 

// Course Goals
export interface CourseGoals {
  learningObjectives: string[] // What will students learn
  prerequisites: string[] // Requirements/prerequisites
  targetAudience: string[] // Who is this course for
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
  sub_category?: string
  level: "beginner" | "intermediate" | "advanced" | "all"
  language: string
  thumbnail: string | null
  poster?: string
  // Extended data
  learning_outcomes: CourseLearningOutcomes[]
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
