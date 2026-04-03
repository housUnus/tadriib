"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Play } from "lucide-react"
import { useDebounce } from "use-debounce"

interface VideoEditorProps {
  url?: string
  preview?: string
  onUrlChange: (url: string) => void
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function VideoEditor({ url: videoUrl, preview: videoPreview, onUrlChange, onFileUpload }: VideoEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadMode, setUploadMode] = useState<"upload" | "url">("upload")

  const [innerVideoUrl, setInnerVideoUrl] = useState(videoUrl || "")
  const [videoUrlDebouncedValue] = useDebounce(innerVideoUrl, 500)


  useEffect(() => {
    onUrlChange(videoUrlDebouncedValue)
  }, [videoUrlDebouncedValue])

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
          <Input
            value={innerVideoUrl || ""}
            onChange={(e) => setInnerVideoUrl(e.target.value)}
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
    </div>
  )
}
