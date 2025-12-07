"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "../VideoPlayer"
import type { ContentItem } from "@/lib/data/course-data"

interface VideoContentProps {
  content: ContentItem
  onMarkComplete: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

export function VideoContent({ content, onMarkComplete, onPrevious, onNext, hasPrevious, hasNext }: VideoContentProps) {
  return (
    <div className="space-y-6">
      {/* Video Player */}
      <VideoPlayer videoUrl={content.videoUrl} title={content.title} key={content.id}/>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={onMarkComplete}
          className={content.completed ? "bg-success hover:bg-success/90 " : ""}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          {content.completed ? "Completed" : "Mark as Complete"}
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrevious} disabled={!hasPrevious}>
            Previous
          </Button>
          <Button onClick={onNext} disabled={!hasNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
