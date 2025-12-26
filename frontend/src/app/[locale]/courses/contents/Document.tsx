"use client"

import { Download, FileText, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ContentItem } from "@/lib/data/course-data"

interface PdfContentProps {
  content: ContentItem
  onMarkComplete: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

const SAMPLE_PDF_URL = "https://www.w3.org/WAI/WCAG21/Techniques/pdf/img/table-word.pdf"

export function PdfContent({ content, onMarkComplete, onPrevious, onNext, hasPrevious, hasNext }: PdfContentProps) {
  const pdfUrl = content.pdfUrl || SAMPLE_PDF_URL

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.target = "_blank"
    link.download = content.title || "document.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, "_blank")
  }

  return (
    <div className="relative flex h-full flex-col bg-muted/30">
      {/* Header with icon and actions */}
      <div className="flex shrink-0 items-center justify-between border-b bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{content.title}</h3>
            <p className="text-sm text-muted-foreground">PDF Document</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleOpenInNewTab} variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in New Tab
          </Button>
          <Button onClick={handleDownload} size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* PDF Viewer Area */}
      <div className="relative flex-1">
        {/* Navigation Arrows */}
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-primary p-2 text-primary-foreground transition-opacity hover:bg-primary/90 disabled:opacity-30"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-primary p-2 text-primary-foreground transition-opacity hover:bg-primary/90 disabled:opacity-30"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <object data={pdfUrl} type="application/pdf" className="h-full w-full min-h-[500px]">
          {/* Fallback content if PDF cannot be embedded */}
          <div className="flex h-full min-h-[500px] flex-col items-center justify-center gap-4 bg-muted/50 p-8">
            <FileText className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <h4 className="font-medium text-foreground">Unable to preview PDF</h4>
              <p className="mt-1 text-sm text-muted-foreground">Your browser cannot display this PDF inline.</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleOpenInNewTab} variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in Browser
              </Button>
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </object>
      </div>
    </div>
  )
}
