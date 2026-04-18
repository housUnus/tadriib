"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Play } from "lucide-react"
import { useDebounce } from "use-debounce"
import { DebouncedInput } from "@/components/common/forms/generic/DebounceInput"
import { Field, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { CurriculumItem, Data } from "@/types/course"

interface VideoEditorProps {
  content?: Data
  onUrlChange: (url: string) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onUpdate: (data: Partial<CurriculumItem>) => void
  is_main_preview?: boolean
}

export function VideoEditor({ content, onUrlChange, onFileUpload, onUpdate, is_main_preview }: VideoEditorProps) {
  const { url: videoUrl, preview: videoPreview } = content || {}
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadMode, setUploadMode] = useState<"upload" | "url">("upload")

  useEffect(() => {
    if (videoUrl) {
      setUploadMode("url")
    } else if (videoPreview) {
      setUploadMode("upload")
    }
  }, [videoUrl, videoPreview])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={uploadMode === "upload" ? "default" : "outline"}
          size="sm"
          onClick={() => setUploadMode("upload")}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Video
        </Button>
        <Button
          variant={uploadMode === "url" ? "default" : "outline"}
          size="sm"
          onClick={() => setUploadMode("url")}
        >
          <Play className="h-4 w-4 mr-2" />
          Video URL
        </Button>
      </div>

      {uploadMode === "upload" && (
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={onFileUpload}
            className="hidden"
          />

          {videoPreview ? (
            <div className="space-y-2">
              <video
                src={videoPreview}
                controls
                className="w-full max-h-[300px] rounded-lg bg-black"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Video
              </Button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
            >
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium">Click to upload video</p>
              <p className="text-xs text-muted-foreground mt-1">MP4, WebM, MOV up to 500MB</p>
            </div>
          )}
        </div>
      )}

      {uploadMode === "url" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Video URL</label>
          <DebouncedInput
            value={videoUrl}
            onChange={onUrlChange}
            placeholder="Paste YouTube, Vimeo, or direct video URL"
          />
          {videoUrl && (videoUrl.includes("youtube") || videoUrl.includes("vimeo")) && (
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                src={videoUrl.includes("youtube")
                  ? videoUrl.replace("watch?v=", "embed/")
                  : videoUrl.includes("vimeo")
                    ? videoUrl.replace("vimeo.com", "player.vimeo.com/video")
                    : videoUrl
                }
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          )}
        </div>
      )}
      <Field orientation="horizontal">
        <div className="flex items-center gap-2">
          <Checkbox
            id="is_main_preview"
            name="is_main_preview"
            checked={is_main_preview}
            onCheckedChange={(checked) => onUpdate({ is_main_preview: !!checked})}
          />
          <FieldLabel htmlFor="is_main_preview" className="cursor-pointer mb-0">
            Use as Course Preview 
          </FieldLabel>
        </div>
      </Field>
    </div>
  )
}
