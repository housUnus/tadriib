"use client"
import { useEffect, useRef, useState } from "react"
import { VideoContent } from "./contents/Video"
import { QuizContent } from "./contents/Quiz"
import { PdfContent } from "./contents/Document"
import { AssignmentContent } from "./contents/Assignement"
import { ContentTabs } from "./ContentTabs"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Content, useEnrollmentStore } from "@/app/stores/enrollment"
import { ArticleContent } from "./contents/Article"
import { useSearchParams } from "next/navigation"

interface MainPlayerProps {
  activeContent: Content
  onMarkComplete: (contentId: string) => void
  onNavigate: (direction: "previous" | "next") => void
  hasPrevious: boolean
  hasNext: boolean
}

export function MainContent({
  activeContent,
  onMarkComplete,
  onNavigate,
  hasPrevious,
  hasNext,
}: MainPlayerProps) {
  console.log("🚀 ~ MainContent ~ activeContent:", activeContent)


  const client = useClientFetch()
  const queryClient = useQueryClient()
  const scrollRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()

  const submissionId = searchParams.get("submission")
  const enrollment_id = useEnrollmentStore((state) => state.id)

  const [activeTab, setActiveTab] = useState("overview")

  const { data } = useQuery({
    queryKey: ['enrollments', activeContent.id],
    queryFn: () => client.get(`/enrollments/${enrollment_id}/content/${activeContent.id}/`),
  })

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [submissionId])

  const loaded_content: any = data?.data
  const renderContent = () => {
    const commonProps = {
      content: ({
        ...activeContent,
        content: loaded_content.content,
        progress: loaded_content.progress,
        invalidate: () => queryClient.invalidateQueries({ queryKey: ['enrollments', activeContent.id] })
      } as any),
      onMarkComplete: () => onMarkComplete(activeContent.id),
      onPrevious: () => onNavigate("previous"),
      onNext: () => onNavigate("next"),
      hasPrevious,
      hasNext,
    }

    switch (activeContent.type) {
      case "video":
        return <VideoContent {...commonProps} />
      case "quiz":
        return <QuizContent {...commonProps} />
      case "attachment":
        return <PdfContent {...commonProps} />
      case "assignment":
        return <AssignmentContent {...commonProps} />
      case "article":
        return <ArticleContent {...commonProps} />
      default:
        return null
    }
  }

  if (!loaded_content) return null

  return (
    <div className="flex h-full flex-col">
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide" ref={scrollRef}>
        {/* Video/Content Player */}
        <div className={"bg-background p-2"} >{renderContent()}</div>

        <div className="mt-4">
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  )
}
