export type QuestionStatus = "not-visited" | "visited" | "answered" | "marked" | "flagged"

export interface QuestionBlock {
  id: number
  type: "text" | "image" | "file"
  text?: string
  image?: string
  file?: string
}

export interface QuizSuggestion {
  text: string
  label: string
  id: number
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
  suggestions?: QuizSuggestion[]
  file_upload?: any
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
  segments: QuizSegment[]
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
  computed_remaining?: number
  status: "not_started" | "in_progress" | "is_paused" | "submitted" | "in_review" | "completed"
  started_at?: string
  paused_at?: string
  expires_at?: string
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