"use client"

import { FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { ContentItem } from "@/lib/data/course-data"
import { Content } from "@/app/stores/enrollment"

interface ArticleContentProps {
  content: Content
  onMarkComplete: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

export function ArticleContent({
  content,
  onMarkComplete,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: ArticleContentProps) {
  return (
    <div className="space-y-6">
      {/* Article Header */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>

            <div>
              <CardTitle className="text-card-foreground">
                {content.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Article
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Article Body */}
      <Card className="border-border bg-card">
        <CardContent>
          <article
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content.content?.text }}
          />
        </CardContent>
      </Card>

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