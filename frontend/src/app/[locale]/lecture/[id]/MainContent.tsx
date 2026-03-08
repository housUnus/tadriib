"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { PanelRightClose, PanelRightOpen, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoContent } from "./contents/Video"
import { QuizContent } from "./contents/Quiz"
import { PdfContent } from "./contents/Document"
import { AssignmentContent } from "./contents/Assignement"
import { ContentTabs } from "./ContentTabs"
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"
import Link from "next/link"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { useQuery } from "@tanstack/react-query"
import { Content, useEnrollmentStore } from "@/app/stores/enrollment"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

function CircularProgress({ progress }: { progress: number }) {
  const data = [{ name: "progress", value: progress, fill: "var(--color-primary)" }]

  return (
    <div className="flex items-center justify-center w-[50px] h-[50px]">
      <RadialBarChart
        width={70}
        height={70}
        innerRadius="83%"
        outerRadius="100%"
        data={data}
        startAngle={90}
        endAngle={-270}
      >
         <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          dataKey="value"
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          dataKey="value"
          cornerRadius={50}
          background
          // background={{ fill: "rgba(0,0,0,0.08)" }}
          isAnimationActive={true}
        />
      </RadialBarChart>

      {/* Center label */}
      <span className="absolute text-[11px] card-subtitle">
        <Trophy className="w-4 h-4" />
      </span>
    </div>
  )
}

interface MainPlayerProps {
  activeContent: Content
  onMarkComplete: (contentId: string) => void
  onNavigate: (direction: "previous" | "next") => void
  hasPrevious: boolean
  hasNext: boolean
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

export function MainContent({
  activeContent,
  onMarkComplete,
  onNavigate,
  hasPrevious,
  hasNext,
  onToggleSidebar,
  sidebarOpen,
}: MainPlayerProps) {

  const client = useClientFetch()
  const {course} = useEnrollmentStore((state) => state)
  const enrollment_id = useEnrollmentStore((state) => state.id)

  const progress = 0
  const [activeTab, setActiveTab] = useState("overview")

  const {data} = useQuery({
    queryKey: ['enrollments', enrollment_id, activeContent.id],
    queryFn: () => client.get(`/enrollments/${enrollment_id}/content/${activeContent.id}/`),
  })



  const loaded_content: any = data?.data
  const renderContent = () => {
    const commonProps = {
      content: ({...activeContent, content: loaded_content.content} as any),
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
      case "article":
        return <PdfContent {...commonProps} />
      case "assignment":
        return <AssignmentContent {...commonProps} />
      default:
        return null
    }
  }

  if(!loaded_content) return null

  return (
    <div className="flex h-full flex-col ">
      <header className="shrink-0 border-b border-border bg-card">
        <div className="flex h-14 items-center justify-between px-4 rounded">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xl font-bold text-primary">Learn</Link>
            <span className="text-sm text-foreground line-clamp-1">{course.title}</span>
          </div>

          <div className="flex items-center gap-2 h-full">
            <Button variant="ghost" size="sm" className="h-full rounded-none">
              <div className="flex items-center">
                <CircularProgress progress={progress} />
                <span className="hidden sm:inline text-sm">2/13 Completed</span>
                {/* <ChevronDown className="h-4 w-4" /> */}
              </div>
            </Button>
            {/* <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button> */}
            <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
              {sidebarOpen ? <PanelRightClose className="h-5 w-5" /> : <PanelRightOpen className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Video/Content Player */}
        <div className={"bg-background p-2"}>{renderContent()}</div>

        <div className="mt-4">
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  )
}
