"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Video, Calendar, Clock, Globe, Link2 } from "lucide-react"
import type { WebinarSchedule } from "@/types/course"

interface WebinarEditorProps {
  schedule?: WebinarSchedule
  description?: string
  onScheduleChange: (schedule: WebinarSchedule) => void
  onDescriptionChange: (description: string) => void
}


export function WebinarEditor({ schedule, description, onScheduleChange, onDescriptionChange }: WebinarEditorProps) {
  const currentSchedule: WebinarSchedule = schedule || {
    date: "",
    startTime: "",
    endTime: "",
    timezone: "UTC",
  }

  const updateSchedule = (field: keyof WebinarSchedule, value: string) => {
    onScheduleChange({ ...currentSchedule, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800 rounded-lg p-4 flex gap-3">
        <Video className="h-5 w-5 text-violet-600 shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium text-violet-900 dark:text-violet-100">Live Webinar Session</p>
          <p className="text-violet-800 dark:text-violet-200 mt-1">
            Schedule your live session and provide the meeting details for students to join.
          </p>
        </div>
      </div>

      {/* Schedule */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Schedule
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Date</Label>
            <Input
              type="date"
              value={currentSchedule.date}
              onChange={(e) => updateSchedule("date", e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              Start Time
            </Label>
            <Input
              type="time"
              value={currentSchedule.startTime}
              onChange={(e) => updateSchedule("startTime", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              End Time
            </Label>
            <Input
              type="time"
              value={currentSchedule.endTime}
              onChange={(e) => updateSchedule("endTime", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Meeting Link */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Link2 className="h-4 w-4" />
          Meeting Link
        </Label>
        <Input
          type="url"
          value={currentSchedule.meetingUrl || ""}
          onChange={(e) => updateSchedule("meetingUrl", e.target.value)}
          placeholder="https://zoom.us/j/123456789 or Google Meet link"
        />
        <p className="text-xs text-muted-foreground">
          Add your Zoom, Google Meet, or other video conferencing link
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Session Description</Label>
        <Textarea
          value={description || ""}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe what will be covered in this live session..."
          rows={4}
        />
      </div>

      {/* Recording URL (optional) */}
      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Recording URL (Optional)
        </Label>
        <Input
          type="url"
          value={currentSchedule.recordingUrl || ""}
          onChange={(e) => updateSchedule("recordingUrl", e.target.value)}
          placeholder="Add recording link after the session"
        />
        <p className="text-xs text-muted-foreground">
          Add the recording URL after the live session for students who missed it
        </p>
      </div>
    </div>
  )
}
