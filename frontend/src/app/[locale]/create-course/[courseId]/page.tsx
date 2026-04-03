"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save, Loader2, Send } from "lucide-react"
import { CourseSidebar } from "../components/course-sidebar"
import { CurriculumBuilder } from "../components/curriculum-builder"
import { GoalsSection } from "../components/sections/goals-section"
import { RequirementsSection } from "../components/sections/requirements-section"
import { PricingSection } from "../components/sections/pricing-section"
import { MessagesSection } from "../components/sections/messages-section"
import { useCourseStore } from "@/stores/course"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

export default function CourseEditorPage() {
  const params = useParams()
  const courseId = params.courseId as string
  
  const [activeSection, setActiveSection] = useState("curriculum")
  const client = useClientFetch()

  const {
    course,
    status,
    initCourse,
    updateCourseMetadata,
    saveCourse,
    submitForReview,
  } = useCourseStore()

  useEffect(() => {
    if (courseId) {
      initCourse(courseId)
    }
  }, [courseId, initCourse])

  const renderSection = () => {
    switch (activeSection) {
      case "goals":
        return <GoalsSection />
      case "requirements":
        return <RequirementsSection />
      case "curriculum":
        return <CurriculumBuilder />
      case "pricing":
        return <PricingSection />
      case "messages":
        return <MessagesSection />
      default:
        return <CurriculumBuilder />
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Input
            value={course.title}
            onChange={(e) => updateCourseMetadata(client, { title: e.target.value })}
            className="text-lg font-semibold border-none bg-transparent focus-visible:ring-0 px-0 h-auto max-w-md"
            placeholder="Course title..."
          />
        </div>
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <span className={`text-xs px-2 py-1 rounded-full ${
            status.status === "draft" ? "bg-muted text-muted-foreground" :
            status.status === "review" ? "bg-amber-100 text-amber-700" :
            status.status === "published" ? "bg-emerald-100 text-emerald-700" :
            "bg-red-100 text-red-700"
          }`}>
            {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
          </span>

          {/* Saving indicator */}
          {status.isSaving && (
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </span>
          )}
          {!status.isSaving && status.lastSaved && (
            <span className="text-xs text-muted-foreground">
              Saved
            </span>
          )}

          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => saveCourse(client)}
            disabled={status.isSaving}
          >
            <Save className="h-4 w-4" />
            Save
          </Button>

          {status.status === "draft" && (
            <Button 
              size="sm" 
              className="gap-2"
              onClick={() => submitForReview(client)}
              disabled={status.isSaving}
            >
              <Send className="h-4 w-4" />
              Submit for Review
            </Button>
          )}
        </div>
      </header>

      {/* Error display */}
      {status.error && (
        <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm border-b">
          {status.error}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <CourseSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  )
}
