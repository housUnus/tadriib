"use client"

import { Button } from "@/components/ui/button"
import { Play, FileText, X } from "lucide-react"
import { cn } from "@/lib/utils/utils"
import type { ContentType } from "@/types/course"

interface ContentTypePickerProps {
  onSelect: (type: ContentType) => void
  onClose: () => void
}

const contentTypes: { type: ContentType; icon: typeof Play; label: string; description: string }[] = [
  { type: "video", icon: Play, label: "Video", description: "Upload or link a video" },
  { type: "article", icon: FileText, label: "Article", description: "Write text content" },
]

export function ContentTypePicker({ onSelect, onClose }: ContentTypePickerProps) {
  return (
    <div className="p-4 bg-muted/30 border border-t-0 border-dashed rounded-b-lg">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground">
          Select the main type of content
        </p>
        <Button
          size="icon"
          variant="ghost"
          className="h-6 w-6"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-3">
        {contentTypes.map(({ type, icon: ContentIcon, label, description }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-transparent",
              "bg-background hover:border-primary transition-colors min-w-[100px]"
            )}
          >
            <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
              <ContentIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
