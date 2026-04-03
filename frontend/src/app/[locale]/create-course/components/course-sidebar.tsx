"use client"

import { cn } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"
import { useCourseStore } from "@/stores/course"
import {
  Target,
  ClipboardList,
  LayoutList,
  DollarSign,
  MessageSquare,
  CheckCircle2,
  Circle,
  Loader2,
} from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { id: "goals", label: "Course Goals", icon: Target },
  { id: "requirements", label: "Requirements", icon: ClipboardList },
  { id: "curriculum", label: "Curriculum", icon: LayoutList },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "messages", label: "Course Messages", icon: MessageSquare },
]

interface CourseSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function CourseSidebar({ activeSection, onSectionChange }: CourseSidebarProps) {
  const { course, sections, status, submitForReview } = useCourseStore()

  // Calculate completion status for each section
  const getCompletionStatus = (sectionId: string): boolean => {
    switch (sectionId) {
      case "goals":
        return (
          (course.goals?.learningObjectives?.filter(Boolean).length || 0) >= 1 &&
          (course.goals?.targetAudience?.filter(Boolean).length || 0) >= 1
        )
      case "requirements":
        return !!course.requirements?.skillLevel
      case "curriculum":
        return sections.length > 0 && sections.some(s => s.items.length > 0)
      case "pricing":
        return course.pricing?.isFree || (course.pricing?.price || 0) > 0
      case "messages":
        return !!(course.messages?.welcomeMessage && course.messages?.completionMessage)
      default:
        return false
    }
  }

  const completedCount = navItems.filter((item) => getCompletionStatus(item.id)).length
  const progress = Math.round((completedCount / navItems.length) * 100)
  const canSubmit = completedCount === navItems.length

  return (
    <div className="w-64 border-r bg-card h-full flex flex-col">
      {/* Course Title */}
      <div className="p-4 border-b">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          {course.type === "webinar" ? "Live Session" : course.type === "quiz" ? "Practice Test" : "Course"}
        </p>
        <h2 className="font-semibold text-sm line-clamp-2">{course.title || "Untitled"}</h2>
      </div>

      {/* Progress Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Setup Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {completedCount} of {navItems.length} sections complete
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          const isComplete = getCompletionStatus(item.id)
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isComplete ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="h-4 w-4 shrink-0" />
              )}
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Status & Submit Button */}
      <div className="p-4 border-t space-y-3">
        {status.lastSaved && (
          <p className="text-xs text-muted-foreground text-center">
            {status.isSaving ? (
              <span className="flex items-center justify-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
              </span>
            ) : (
              `Last saved ${new Date(status.lastSaved).toLocaleTimeString()}`
            )}
          </p>
        )}
        <Button 
          className="w-full" 
          size="lg" 
          disabled={!canSubmit || status.isSaving}
          onClick={submitForReview}
        >
          {status.status === "review" ? "In Review" : "Submit for Review"}
        </Button>
        {!canSubmit && (
          <p className="text-xs text-muted-foreground text-center">
            Complete all sections to submit
          </p>
        )}
      </div>
    </div>
  )
}
