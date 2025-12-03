"use client"

import { useState, useMemo } from "react"
import { CourseSidebar } from "./Sidebar"
import { MainContent } from "./MainContent"
import { mockCourse, type ContentItem, type Course } from "@/lib/data/course-data"

export default function CoursePlayerPage() {
  const [course, setCourse] = useState<Course>(mockCourse)
  const [activeContentId, setActiveContentId] = useState<string>(mockCourse.sections[0].contents[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Flatten all content items for navigation
  const allContents = useMemo(() => {
    return course.sections.flatMap((section) => section.contents)
  }, [course])

  const activeContent = useMemo(() => {
    return allContents.find((c) => c.id === activeContentId) || allContents[0]
  }, [allContents, activeContentId])

  const currentIndex = allContents.findIndex((c) => c.id === activeContentId)

  const handleContentSelect = (content: ContentItem) => {
    setActiveContentId(content.id)
  }

  const handleMarkComplete = (contentId: string) => {
    setCourse((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => ({
        ...section,
        contents: section.contents.map((content) =>
          content.id === contentId ? { ...content, completed: !content.completed } : content,
        ),
      })),
    }))
  }

  const handleNavigate = (direction: "previous" | "next") => {
    const newIndex = direction === "previous" ? currentIndex - 1 : currentIndex + 1
    if (newIndex >= 0 && newIndex < allContents.length) {
      setActiveContentId(allContents[newIndex].id)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-1 overflow-hidden">
        <MainContent
          course={course}
          activeContent={activeContent}
          onMarkComplete={handleMarkComplete}
          onNavigate={handleNavigate}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < allContents.length - 1}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
      </main>

      <CourseSidebar
        course={course}
        activeContentId={activeContentId}
        onContentSelect={handleContentSelect}
        onToggleComplete={handleMarkComplete}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  )
}
