"use client"

import { Search, MessageSquare, StickyNote, Bell, Star, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContentTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "overview", label: "Overview", icon: null },
  { id: "qa", label: "Q&A", icon: MessageSquare },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "announcements", label: "Announcements", icon: Bell },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "learning-tools", label: "Learning tools", icon: Lightbulb },
]

export function ContentTabs({ activeTab, onTabChange }: ContentTabsProps) {
  return (
    <div className="border-b border-border bg-background">
      {/* Tab Bar */}
      <div className="flex items-center gap-1 px-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.icon && <tab.icon className="h-4 w-4" />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <TabContent activeTab={activeTab} />
      </div>
    </div>
  )
}

function TabContent({ activeTab }: { activeTab: string }) {
  switch (activeTab) {
    case "overview":
      return (
        <div className="max-w-3xl space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">About this course</h2>
            <p className="text-muted-foreground">
              Learn the fundamentals and advanced concepts in this comprehensive course. You'll gain practical skills
              through hands-on exercises and real-world projects.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Lessons</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold">2.5h</div>
              <div className="text-sm text-muted-foreground">Video</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Quizzes</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold">1</div>
              <div className="text-sm text-muted-foreground">Assignment</div>
            </div>
          </div>
        </div>
      )
    case "qa":
      return (
        <div className="max-w-3xl">
          <h2 className="text-lg font-semibold mb-4">Questions & Answers</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                  JD
                </div>
                <div className="flex-1">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Can you explain the concept in lesson 3 more clearly?
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>2 days ago</span>
                    <span>3 replies</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full py-3 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
              Ask a new question
            </button>
          </div>
        </div>
      )
    case "notes":
      return (
        <div className="max-w-3xl">
          <h2 className="text-lg font-semibold mb-4">Your Notes</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-primary">Lesson 1 • 2:34</span>
                <span className="text-xs text-muted-foreground">Yesterday</span>
              </div>
              <p className="text-sm">Remember to review the key concepts mentioned here.</p>
            </div>
            <button className="w-full py-3 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
              Create a note at the current timestamp
            </button>
          </div>
        </div>
      )
    case "announcements":
      return (
        <div className="max-w-3xl">
          <h2 className="text-lg font-semibold mb-4">Announcements</h2>
          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="h-4 w-4 text-primary" />
              <span className="font-medium">Course Update</span>
            </div>
            <p className="text-sm text-muted-foreground">
              New content has been added! Check out the new lessons in Section 3.
            </p>
            <span className="text-xs text-muted-foreground mt-2 block">1 week ago</span>
          </div>
        </div>
      )
    case "reviews":
      return (
        <div className="max-w-3xl">
          <h2 className="text-lg font-semibold mb-4">Student Reviews</h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl font-bold">4.8</div>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn("h-5 w-5", star <= 4 ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground")}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">Based on 234 reviews</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-border">
              <div className="flex items-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-sm">Excellent course! Very well structured and easy to follow.</p>
              <span className="text-xs text-muted-foreground mt-2 block">Jane S. • 3 days ago</span>
            </div>
          </div>
        </div>
      )
    case "learning-tools":
      return (
        <div className="max-w-3xl">
          <h2 className="text-lg font-semibold mb-4">Learning Tools</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors">
              <Lightbulb className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium">Learning reminders</h3>
              <p className="text-sm text-muted-foreground mt-1">Set up daily reminders to keep learning</p>
            </div>
            <div className="p-4 rounded-lg border border-border hover:border-primary cursor-pointer transition-colors">
              <StickyNote className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-medium">Flashcards</h3>
              <p className="text-sm text-muted-foreground mt-1">Review key concepts with flashcards</p>
            </div>
          </div>
        </div>
      )
    default:
      return null
  }
}
