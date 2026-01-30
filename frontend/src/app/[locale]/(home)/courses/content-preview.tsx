"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, FileText, X } from "lucide-react"

interface ContentPreviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  content: {
    title: string
    type: string
    duration: string
    isPreview?: boolean
    videoUrl?: string
    articleContent?: string
  } | null
}

export function ContentPreviewModal({ open, onOpenChange, content }: ContentPreviewModalProps) {
  if (!content) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden gap-0">
        <DialogHeader className="p-4 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="capitalize">
                  {content.type}
                </Badge>
                <span className="text-sm text-muted-foreground">{content.duration}</span>
              </div>
              <DialogTitle className="text-xl pr-8">{content.title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>
        
        <div className="p-0">
          {content.type === "video" && (
            <div className="aspect-video bg-neutral-900 relative">
              {content.videoUrl ? (
                <video
                  src={content.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
                  <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center">
                    <Play className="h-10 w-10 ml-1" />
                  </div>
                  <p className="text-lg font-medium">Video Preview</p>
                  <p className="text-sm text-neutral-400">This is a demo preview placeholder</p>
                </div>
              )}
            </div>
          )}
          
          {content.type === "article" && (
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {content.articleContent ? (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: content.articleContent }}
                />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground mb-6">
                    <FileText className="h-8 w-8" />
                    <span>Article Preview</span>
                  </div>
                  <h2 className="text-xl font-bold">Getting Started</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    This is a preview of the article content. In a real implementation, 
                    the full article would be displayed here with proper formatting, 
                    code snippets, images, and other rich content.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Articles provide in-depth written explanations to complement 
                    the video content, helping you understand concepts at your own pace.
                  </p>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm font-mono">// Sample code snippet</p>
                    <p className="text-sm font-mono text-primary">const greeting = "Hello, World!";</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {content.type === "quiz" && (
            <div className="p-6">
              <div className="text-center py-8 space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-amber-500/10 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-amber-500" />
                </div>
                <h3 className="text-lg font-semibold">Quiz Preview</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This quiz contains {content.duration}. Enroll in the course to take 
                  the full quiz and track your progress.
                </p>
                <Button className="mt-4">Enroll to Take Quiz</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
