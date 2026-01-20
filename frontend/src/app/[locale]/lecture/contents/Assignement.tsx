"use client"

import { Upload, FileCode, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { ContentItem } from "@/lib/data/course-data"

interface AssignmentContentProps {
  content: ContentItem
  onMarkComplete: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

export function AssignmentContent({
  content,
  onMarkComplete,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: AssignmentContentProps) {
  return (
    <div className="space-y-6">
      {/* Assignment Header */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <FileCode className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-card-foreground">{content.title}</CardTitle>
              <CardDescription className="text-muted-foreground">Assignment</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{content.description}</p>
        </CardContent>
      </Card>

      {/* Submission Area */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg text-card-foreground">Submit Your Work</CardTitle>
          <CardDescription className="text-muted-foreground">
            Upload your project files or paste a link to your repository
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload Area */}
          <div className="rounded-lg border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary/50">
            <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-foreground">Drag and drop your files here</p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
            <Button variant="outline" className="mt-4 bg-transparent">
              Browse Files
            </Button>
          </div>

          {/* Or Link */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Repository Link */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Repository URL</label>
            <Textarea placeholder="https://github.com/username/project" className="resize-none" />
          </div>

          <Button className="w-full">Submit Assignment</Button>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={onMarkComplete}
          variant="outline"
          className={content.completed ? "bg-success hover:bg-success/90 text-success-foreground border-success" : ""}
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