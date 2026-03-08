"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "../VideoPlayer"
import { Content, useEnrollmentStore } from "@/app/stores/enrollment"
import throttle from "lodash/throttle";
import { useEnrollmentProgress } from "@/hooks/use-course-progress"
import { useRef } from "react"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

interface VideoContentProps {
  content: Content
  onMarkComplete: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

const SAMPLE_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export function VideoContent({ content, onMarkComplete, onPrevious, onNext, hasPrevious, hasNext }: VideoContentProps) {
  const client = useClientFetch()
  if (!content.content?.file) {
    return null
  }

  const startHeartbeat = useEnrollmentStore(s => s.startHeartbeat)
  const stopHeartbeat = useEnrollmentStore(s => s.stopHeartbeat)
  const updateLectureProgress = useEnrollmentStore(s => s.updateLectureProgress)
  const markLectureCompleted = useEnrollmentStore(s => s.markLectureCompleted)

  const timeRef = useRef(0)

  return (
    <div className="space-y-6">
      {/* Video Player */}

      <VideoPlayer
        videoUrl={SAMPLE_VIDEO_URL || content.content.file}
        last_position_seconds={content.progress?.last_position_seconds}

        onTimeUpdate={(time) => {
          timeRef.current = time
          updateLectureProgress(content.id, time)
        }}

        onPlay={() => {
          startHeartbeat(client, content.id, () => timeRef.current)
        }}

        onPause={() => {
          stopHeartbeat()
        }}

        onEnded={() => {
          stopHeartbeat()
          markLectureCompleted(client, content.id)
        }}
      />

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={onMarkComplete}
          className={content.progress?.is_completed ? "bg-success hover:bg-success/90 " : ""}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          {content.progress?.is_completed ? "Completed" : "Mark as Complete"}
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
