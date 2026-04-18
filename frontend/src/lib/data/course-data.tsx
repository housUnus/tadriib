export type ContentType = "video" | "quiz" | "article" | "assignment"

export interface ContentItem {
  id: string
  title: string
  type: ContentType
  duration_minutes?:number
  description?: string,
  completed: boolean
  content?: any
}

export interface Quiz {
  id: string
  title: string
  description: string
  timeLimit?: number
  questions: Question[]
}

export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
}

export interface Section {
  id: string
  title: string
  items: ContentItem[]
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  sections: Section[]
}
export interface Enrolment {
  id: string
  course: Course
  progress: any
}

export const mockCourse: Course = {
  id: "course-1",
  title: "Complete React & Next.js Developer Course",
  description: "Master modern web development with React 18 and Next.js 14",
  instructor: "Sarah Johnson",
  sections: [
    {
      id: "section-1",
      title: "Introduction",
      items: [
        {
          id: "content-1",
          title: "Welcome to the Course",
          type: "video",
          duration_minutes: 2,
          completed: true,
          description:"Welcome to the Complete React & Next.js Developer Course! In this video, we'll cover what you'll learn throughout this comprehensive program."
        },
        {
          id: "content-2",
          title: "Course Overview",
          type: "article",
          completed: true,
          description: "A comprehensive PDF guide covering all topics in this course.",
          duration_minutes: 2,
        },
        {
          id: "content-3",
          title: "Prerequisites Check",
          type: "quiz",
          completed: false,
          description: "Test your knowledge before starting the course.",
        },
      ],
    },
    {
      id: "section-2",
      title: "React Fundamentals",
      items: [
        {
          id: "content-4",
          title: "Understanding Components",
          type: "video",
          duration_minutes: 2,
          completed: false,
          description:
            "Learn the fundamentals of React components. We'll explore functional components, JSX syntax, and how to structure your React applications.",
        },
        {
          id: "content-5",
          title: "State and Props",
          type: "video",
          duration_minutes: 2,
          completed: false,
          description:
            "Deep dive into React state management and props. Learn how data flows through your application.",
        },
        {
          id: "content-6",
          title: "React Hooks Deep Dive",
          type: "video",
          duration_minutes: 2,
          completed: false,
          description: "Master React Hooks including useState, useEffect, useContext, and custom hooks.",
        },
        {
          id: "content-7",
          title: "React Fundamentals Quiz",
          type: "quiz",
          completed: false,
          description: "Test your understanding of React fundamentals.",
        },
      ],
    },
    {
      id: "section-3",
      title: "Next.js Essentials",
      items: [
        {
          id: "content-8",
          title: "Introduction to Next.js",
          type: "video",
          duration_minutes: 22,
          completed: false,
          description:
            "Get started with Next.js and understand its powerful features for building production-ready React applications.",
        },
        {
          id: "content-9",
          title: "App Router & Routing",
          type: "video",
          duration_minutes: 21,
          completed: false,
          description: "Learn about the Next.js App Router and how to create dynamic routes in your application.",
        },
        {
          id: "content-10",
          title: "Server Components",
          type: "video",
          duration_minutes: 12,
          completed: false,
          description: "Understand React Server Components and how they revolutionize data fetching in Next.js.",
        },
        {
          id: "content-11",
          title: "Final Project Assignment",
          type: "assignment",
          completed: false,
          description:
            "Build a complete Next.js application using everything you've learned. Submit your project for review.",
        },
      ],
    },
  ],
}

export function calculateProgress(course: Course): number {
  let completed = 0
  let total = 0

  course.sections.forEach((section) => {
    section.items.forEach((content:any) => {
      total++
      if (content.completed) completed++
    })
  })

  return total > 0 ? Math.round((completed / total) * 100) : 0
}
