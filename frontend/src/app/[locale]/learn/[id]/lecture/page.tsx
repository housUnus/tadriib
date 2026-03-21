"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useEnrollmentStore } from "@/app/stores/enrollment"

export default function LecturePage() {
  const router = useRouter()
  const { id, progress, course } = useEnrollmentStore()

  const currentLecture = progress?.active_lecture

  useEffect(() => {
    if (currentLecture) {
      router.replace(`/learn/${id}/lecture/${currentLecture}`)
    } else if (course?.sections?.length) {
      const firstLecture = course.sections[0].contents[0].id
      router.replace(`/learn/${id}/lecture/${firstLecture}`)
    }
  }, [currentLecture, course, id, router])

  return null
}