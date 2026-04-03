"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { File, FileText, FileImage, FileVideo, Trash2, Paperclip, Download } from "lucide-react"
import { cn } from "@/lib/utils/utils"
import type { Attachment } from "@/types/course"

interface AttachmentsManagerProps {
  attachments: Attachment[]
  onChange: (attachments: Attachment[]) => void
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const getFileIcon = (type: string) => {
  if (type.startsWith("image/")) return FileImage
  if (type.startsWith("video/")) return FileVideo
  if (type === "application/pdf") return FileText
  return File
}

export function AttachmentsManager({ attachments, onChange }: AttachmentsManagerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newAttachments: Attachment[] = files.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      file,
    }))
    onChange([...attachments, ...newAttachments])
    if (inputRef.current) inputRef.current.value = ""
  }

  const removeAttachment = (id: string) => {
    onChange(attachments.filter(a => a.id !== id))
  }

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.zip,.mp3,.mp4,.png,.jpg,.jpeg"
        onChange={handleFileSelect}
        className="hidden"
      />

      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((attachment) => {
            const FileIcon = getFileIcon(attachment.type)
            return (
              <div
                key={attachment.id}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg group"
              >
                <div className="h-10 w-10 rounded bg-background flex items-center justify-center shrink-0">
                  <FileIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{attachment.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8"
                    onClick={() => window.open(attachment.url, "_blank")}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeAttachment(attachment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={() => inputRef.current?.click()}
        className="gap-2 border-dashed"
      >
        <Paperclip className="h-4 w-4" />
        Add Attachment
      </Button>
      <p className="text-xs text-muted-foreground">
        Add resources like PDFs, transcripts, slides, or other files
      </p>
    </div>
  )
}
