"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { ChevronDown, ChevronRight, Play, FileText, HelpCircle, CheckCircle, FileCode, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Course, ContentItem, Section } from "@/lib/data/course-data"

interface CourseSidebarProps {
  course: Course
  activeContentId: string
  onContentSelect: (content: ContentItem) => void
  onToggleComplete: (contentId: string) => void
  isOpen: boolean
  onClose: () => void
}

const contentIcons = {
  video: Play,
  quiz: HelpCircle,
  pdf: FileText,
  assignment: FileCode,
}

export function CourseSidebar({
  course,
  activeContentId,
  onContentSelect,
  onToggleComplete,
  isOpen,
  onClose,
}: CourseSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(course.sections.map((s) => s.id))
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return course.sections

    const query = searchQuery.toLowerCase()
    return course.sections
      .map((section) => {
        const matchingContents = section.contents.filter(
          (content) =>
            content.title.toLowerCase().includes(query) || content.description?.toLowerCase().includes(query),
        )

        if (section.title.toLowerCase().includes(query) || matchingContents.length > 0) {
          return {
            ...section,
            contents: matchingContents.length > 0 ? matchingContents : section.contents,
          }
        }
        return null
      })
      .filter(Boolean) as Section[]
  }, [course.sections, searchQuery])

  const displayExpandedSections = searchQuery.trim() ? filteredSections.map((s) => s.id) : expandedSections

  if (!isOpen) return null

  return (
    <aside className="w-80 shrink-0 border-l border-border bg-card h-full overflow-hidden flex flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Course content</h2>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative mt-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search course content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9 h-9 bg-muted/50 border-muted focus-visible:ring-primary/30"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto">
        {searchQuery.trim() && (
          <div className="px-4 py-2 bg-muted/30 border-b border-border">
            <p className="text-xs text-muted-foreground">
              {filteredSections.reduce((acc, s) => acc + s.contents.length, 0)} results found
            </p>
          </div>
        )}

        {searchQuery.trim() && filteredSections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <Search className="h-10 w-10 text-muted-foreground/50 mb-3" />
            <p className="text-sm font-medium text-foreground">No results found</p>
            <p className="text-xs text-muted-foreground mt-1">Try searching for a different term</p>
          </div>
        ) : (
          filteredSections.map((section) => (
            <SectionItem
              key={section.id}
              section={section}
              isExpanded={displayExpandedSections.includes(section.id)}
              onToggle={() => toggleSection(section.id)}
              activeContentId={activeContentId}
              onContentSelect={onContentSelect}
              onToggleComplete={onToggleComplete}
              searchQuery={searchQuery}
            />
          ))
        )}
      </div>
    </aside>
  )
}

interface SectionItemProps {
  section: Section
  isExpanded: boolean
  onToggle: () => void
  activeContentId: string
  onContentSelect: (content: ContentItem) => void
  onToggleComplete: (contentId: string) => void
  searchQuery?: string
}

function SectionItem({
  section,
  isExpanded,
  onToggle,
  activeContentId,
  onContentSelect,
  onToggleComplete,
  searchQuery = "",
}: SectionItemProps) {
  const completedCount = section.contents.filter((c) => c.completed).length
  const totalDuration = section.contents
    .filter((c) => c.duration)
    .reduce((acc, c) => {
      const mins = Number.parseInt(c.duration?.replace("min", "") || "0")
      return acc + mins
    }, 0)

  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-accent/50"
      >
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-foreground">
            <HighlightText text={section.title} query={searchQuery} />
          </span>
          <div className="text-xs text-muted-foreground mt-0.5">
            {completedCount} / {section.contents.length} | {totalDuration}min
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="bg-muted/30">
          {section.contents.map((content) => (
            <ContentItemButton
              key={content.id}
              content={content}
              isActive={activeContentId === content.id}
              onSelect={() => onContentSelect(content)}
              onToggleComplete={() => onToggleComplete(content.id)}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface ContentItemButtonProps {
  content: ContentItem
  isActive: boolean
  onSelect: () => void
  onToggleComplete: () => void
  searchQuery?: string
}

function ContentItemButton({
  content,
  isActive,
  onSelect,
  onToggleComplete,
  searchQuery = "",
}: ContentItemButtonProps) {
  const Icon = contentIcons[content.type]

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleComplete()
  }

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors border-l-2",
        isActive ? "border-l-primary bg-primary/10" : "border-l-transparent hover:bg-accent/50",
      )}
    >
      {/* Checkbox - only toggles completion */}
      <button onClick={handleCheckboxClick} className="mt-0.5 shrink-0 hover:scale-110 transition-transform">
        {content.completed ? (
          <CheckCircle className="h-4 w-4 text-primary" />
        ) : (
          <div className="h-4 w-4 rounded border border-muted-foreground hover:border-primary" />
        )}
      </button>

      {/* Content info - navigates to content */}
      <button onClick={onSelect} className="flex-1 min-w-0 text-left">
        <p className={cn("text-sm", isActive ? "text-primary font-medium" : "text-foreground")}>
          <HighlightText text={content.title} query={searchQuery} />
        </p>
        {content.duration && (
          <div className="flex items-center gap-1.5 mt-1">
            <Icon className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{content.duration}</span>
          </div>
        )}
      </button>
    </div>
  )
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escapedQuery})`, "gi")
  const parts = text.split(regex)

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-200 dark:bg-yellow-800 text-inherit rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}
