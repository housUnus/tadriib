"use client"

import { Textarea } from "@/components/ui/textarea"
import { VideoEditor } from "./video-editor"
import type { ContentType } from "@/types/course"
import { DebouncedInput } from "@/components/common/forms/generic/DebounceInput"

interface LectureEditorProps {
  contentType?: ContentType
  url?: string
  preview?: string
  text?: string
  onVideoUrlChange: (url: string) => void
  onVideoFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onArticleChange: (content: string) => void
}

export function LectureEditor({
  contentType,
  url,
  preview,
  text,
  onVideoUrlChange,
  onVideoFileUpload,
  onArticleChange,
}: LectureEditorProps) {

  if (contentType === "video") {
    return (
      <VideoEditor
        url={url}
        preview={preview}
        onUrlChange={onVideoUrlChange}
        onFileUpload={onVideoFileUpload}
      />
    )
  }

  if (contentType === "article") {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">Article Content</label>
        <DebouncedInput
          component={Textarea}
          value={text || ""}
          onChange={onArticleChange}
          placeholder="Write your article content here..."
          rows={8}
          className="resize-none"
        />
      </div>
    )
  }

  return null
}
