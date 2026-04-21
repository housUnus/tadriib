export type QuestionStatus = "not-visited" | "visited" | "answered" | "marked" | "flagged"
export type SubmissionStatus = "in_progress" | "is_paused" | "completed" | "submitted" | "expired" | "in_review"

export interface Submission {
    id: string
    status: SubmissionStatus
    total_questions: number
    total_visited: number
    total_answered: number
    total_flagged: number
    total_duration: number // in minutes
    started_at: string
    expires_at: string
    paused_at: string | null
    submitted_at: string | null
    score: number | null
    score_percent: number | null
    computed_remaining: number | null
}

export interface QuestionBlock {
  id: number
  type: "text" | "image" | "file"
  text?: string
  image?: string
  file?: string
}

export interface QuizOption {
  text: string
  label: string
  id: string
  is_correct: boolean
}

export interface Question {
  id: number
  order: number
  text: string
  section: string
  answer_type: string
  allow_multiple_answers: boolean
  blocks?: QuestionBlock[]
  options?: QuizOption[]
  file_upload?: any
  correct_answer?: string | string[]
  answer_explanation?: string
  answer_hint?: string
}

export interface QuizSegment {
  id: number
  title: string
  order: number
  questions: Question[]
}

export interface Quiz {
  id: number
  time_limit_minutes: number
  description: string
  duration:  number
  can_pause?: boolean
  show_correct_answers?: boolean
  questions: Question[]
  max_attempts?: number
}

export interface Section {
  name: string
  questions: number[]
  stats: {
    total: number
    answered: number
    marked: number
  }
}

export interface QuizState {
  currentQuestion: number
  answers: Record<number, string>
  marked: Set<number>
  flagged: Set<number>
  visited: Set<number>
  correct_answers: Record<number, string | string[]>
  answers_is_correct: Record<number, boolean>
  computed_remaining?: number
  current_submission: Submission | null
}

export interface QuizStats {
  total: number,
  visited: number,
  notVisited: number,
  answered: number,
  notAnswered: number,
  marked: number,
  flagged: number,
  is_paused: boolean,
  computed_remaining?: number,
}