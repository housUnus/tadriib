"use client"

import { Textarea } from "@/components/ui/textarea"
import { VideoEditor } from "./video-editor"
import type { ContentType, CurriculumItem } from "@/types/course"
import { DebouncedInput } from "@/components/common/forms/generic/DebounceInput"
import { RichTextEditor } from "../rich-text-editor"

interface LectureEditorProps {
  item: CurriculumItem
  onVideoUrlChange: (url: string) => void
  onVideoFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onArticleChange: (content: string) => void
  onUpdate: (data: Partial<CurriculumItem>) => void
}

export function LectureEditor({
  item,
  onVideoUrlChange,
  onVideoFileUpload,
  onArticleChange,
  onUpdate,
}: LectureEditorProps) {

  if (item?.type === "video") {
    return (
      <VideoEditor
        content={item.content}
        onUrlChange={onVideoUrlChange}
        onFileUpload={onVideoFileUpload}
        onUpdate={onUpdate}
        is_main_preview={item.is_main_preview}
      />
    )
  }

  if (item?.type === "article") {
    return (
      <div className="space-y-2 flex gap-1 flex-col">
        <label className="text-sm font-medium">Article Content</label>
        <RichTextEditor
          value={item.content?.text || ""}
          onChange={onArticleChange}
          placeholder="Write your article content here..."
          className="resize-none"
        />
      </div>
    )
  }

  return null
}
