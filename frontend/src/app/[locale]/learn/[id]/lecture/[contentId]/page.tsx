"use client"

import { useParams, useRouter } from "next/navigation"
import { useEnrollmentStore } from "@/stores/enrollment"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { MainContent } from "./MainContent"

export default function ContentPage() {
  const { progress } = useEnrollmentStore()
  const { contentId } = useParams()
  const activeContentId = contentId || progress?.active_lecture
  const router = useRouter()
  const client = useClientFetch()

  const { course, markLectureCompleted } = useEnrollmentStore()

  const allContents = course.sections.flatMap(s => s.contents)
  const currentIndex = allContents.findIndex(c => c.id === activeContentId)
  const activeContent = allContents[currentIndex]

  const handleNavigate = (direction: "previous" | "next") => {
    const newIndex =
      direction === "previous" ? currentIndex - 1 : currentIndex + 1

    if (allContents[newIndex]) {
      router.push(`/course/${course.id}/learn/${allContents[newIndex].id}`)
    }
  }

  if(!activeContent) return null

  return (
    <MainContent
      key={(contentId as string) || ""}
      activeContent={activeContent}
      onMarkComplete={(id) => markLectureCompleted(client, id)}
      onNavigate={handleNavigate}
      hasPrevious={currentIndex > 0}
      hasNext={currentIndex < allContents.length - 1}
    />
  )
}