"use client"

import { useEffect, useState } from "react"
import { useEnrollmentStore } from "@/stores/enrollment"
import { LearnHeader } from "./Header"
import { CourseSidebar } from "./Sidebar"

export default function LayoutWrapper({
  enrollment,
  children,
}: any) {
  console.log("🚀 ~ LayoutWrapper ~ enrollment:", enrollment)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { setState, id } = useEnrollmentStore()

  useEffect(() => {
    setState(enrollment)
  }, [enrollment])

  if(!id) return null

  return (
    <div className="flex h-screen flex-col">
      <LearnHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-hidden">
          {children}
        </main>

        <CourseSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggleComplete={() => {}}
        />
      </div>
    </div>
  )
}