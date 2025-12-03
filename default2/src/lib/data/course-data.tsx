export type ContentType = "video" | "quiz" | "pdf" | "assignment"

export interface ContentItem {
  id: string
  title: string
  type: ContentType
  duration?: string
  completed: boolean
  description?: string
  videoUrl?: string
  pdfUrl?: string
  attachments?: { name: string; url: string }[]
  quiz?: Quiz
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
  contents: ContentItem[]
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  sections: Section[]
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
      contents: [
        {
          id: "content-1",
          title: "Welcome to the Course",
          type: "video",
          duration: "5:32",
          completed: true,
          description:
            "Welcome to the Complete React & Next.js Developer Course! In this video, we'll cover what you'll learn throughout this comprehensive program.",
          videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          attachments: [
            { name: "Course Slides.pdf", url: "#" },
            { name: "Resource Links.txt", url: "#" },
          ],
        },
        {
          id: "content-2",
          title: "Course Overview",
          type: "pdf",
          completed: true,
          description: "A comprehensive PDF guide covering all topics in this course.",
          pdfUrl: "/course-overview.pdf",
          duration: "10:15",
        },
        {
          id: "content-3",
          title: "Prerequisites Check",
          type: "quiz",
          completed: false,
          description: "Test your knowledge before starting the course.",
          quiz: {
            id: "quiz-1",
            title: "Prerequisites Check",
            description: "Let's make sure you have the foundational knowledge needed for this course.",
            timeLimit: 10,
            questions: [
              {
                id: "q1",
                text: "What is the correct syntax to create a function in JavaScript?",
                options: ["function myFunction()", "create myFunction()", "function:myFunction()", "def myFunction()"],
                correctAnswer: 0,
              },
              {
                id: "q2",
                text: "Which of the following is a JavaScript framework?",
                options: ["Python", "React", "HTML", "CSS"],
                correctAnswer: 1,
              },
              {
                id: "q3",
                text: "What does JSX stand for?",
                options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"],
                correctAnswer: 0,
              },
            ],
          },
        },
      ],
    },
    {
      id: "section-2",
      title: "React Fundamentals",
      contents: [
        {
          id: "content-4",
          title: "Understanding Components",
          type: "video",
          duration: "12:45",
          completed: false,
          description:
            "Learn the fundamentals of React components. We'll explore functional components, JSX syntax, and how to structure your React applications.",
          videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          attachments: [{ name: "Component Examples.zip", url: "#" }],
        },
        {
          id: "content-5",
          title: "State and Props",
          type: "video",
          duration: "18:20",
          completed: false,
          description:
            "Deep dive into React state management and props. Learn how data flows through your application.",
          videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        },
        {
          id: "content-6",
          title: "React Hooks Deep Dive",
          type: "video",
          duration: "25:00",
          completed: false,
          description: "Master React Hooks including useState, useEffect, useContext, and custom hooks.",
          videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        },
        {
          id: "content-7",
          title: "React Fundamentals Quiz",
          type: "quiz",
          completed: false,
          description: "Test your understanding of React fundamentals.",
          quiz: {
            id: "quiz-2",
            title: "React Fundamentals Quiz",
            description: "Let's test what you've learned about React basics.",
            timeLimit: 15,
            questions: [
              {
                id: "q4",
                text: "Which hook is used for side effects in React?",
                options: ["useState", "useEffect", "useContext", "useReducer"],
                correctAnswer: 1,
              },
              {
                id: "q5",
                text: "What is the correct way to pass a prop to a child component?",
                options: [
                  "<Child props={value} />",
                  "<Child value={value} />",
                  "<Child>value</Child>",
                  "Child.value = value",
                ],
                correctAnswer: 1,
              },
            ],
          },
        },
      ],
    },
    {
      id: "section-3",
      title: "Next.js Essentials",
      contents: [
        {
          id: "content-8",
          title: "Introduction to Next.js",
          type: "video",
          duration: "15:30",
          completed: false,
          description:
            "Get started with Next.js and understand its powerful features for building production-ready React applications.",
          videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        },
        {
          id: "content-9",
          title: "App Router & Routing",
          type: "video",
          duration: "22:15",
          completed: false,
          description: "Learn about the Next.js App Router and how to create dynamic routes in your application.",
          videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        },
        {
          id: "content-10",
          title: "Server Components",
          type: "video",
          duration: "20:00",
          completed: false,
          description: "Understand React Server Components and how they revolutionize data fetching in Next.js.",
          videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          attachments: [
            { name: "Server Components Guide.pdf", url: "#" },
            { name: "Example Project.zip", url: "#" },
          ],
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
    section.contents.forEach((content) => {
      total++
      if (content.completed) completed++
    })
  })

  return total > 0 ? Math.round((completed / total) * 100) : 0
}
