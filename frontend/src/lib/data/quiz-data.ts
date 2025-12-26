export type QuestionStatus = "not-visited" | "visited" | "answered" | "marked" | "flagged"

export interface Question {
  id: number
  text: string
  options: { label: string; text: string }[]
  section: string
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
}

export const sampleQuestions: Question[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  text: `The following question consists of an incomplete sentence or a sentence which is split into four parts. All four parts are jumbled up and are named as P, Q, R and S. These four parts are not given in their proper order. Arrange the jumbled parts of the sentence and find out which of the four combinations from the given options will correctly complete the sentence.

For some people patriotism _________________ as much as to any one country.`,
  options: [
    { label: "a", text: "PQRS - They belong to the world" },
    { label: "b", text: "QRSP - Is a deep emotional feeling" },
    { label: "c", text: "RSPQ - That transcends national boundaries" },
    { label: "d", text: "SPQR - And encompasses all humanity" },
  ],
  section: i < 25 ? "Section A" : i < 50 ? "Section B" : i < 75 ? "Section C" : "Section D",
}))

export const sections: Section[] = [
  {
    name: "Section A",
    questions: Array.from({ length: 25 }, (_, i) => i + 1),
    stats: { total: 25, answered: 0, marked: 0 },
  },
  {
    name: "Section B",
    questions: Array.from({ length: 25 }, (_, i) => i + 26),
    stats: { total: 25, answered: 0, marked: 0 },
  },
  {
    name: "Section C",
    questions: Array.from({ length: 25 }, (_, i) => i + 51),
    stats: { total: 25, answered: 0, marked: 0 },
  },
  {
    name: "Section D",
    questions: Array.from({ length: 25 }, (_, i) => i + 76),
    stats: { total: 25, answered: 0, marked: 0 },
  },
]
