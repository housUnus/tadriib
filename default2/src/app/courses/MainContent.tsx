"use client"
import { useState } from "react"
import dynamic from "next/dynamic"
import { Share2, ChevronDown, PanelRightClose, PanelRightOpen, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VideoContent } from "./contents/Video"
import { QuizContent } from "./contents/Quiz"
import { PdfContent } from "./contents/Document"
import { AssignmentContent } from "./contents/Assignement"
import { ContentTabs } from "./ContentTabs"
import type { ContentItem, Course } from "@/lib/data/course-data"
import { calculateProgress } from "@/lib/data/course-data"
import { ApexOptions } from "apexcharts"
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"
import Link from "next/link"

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

interface CircularProgressProps {
  progress: number
}

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
  course: Course
  activeContent: ContentItem
  onMarkComplete: (contentId: string) => void
  onNavigate: (direction: "previous" | "next") => void
  hasPrevious: boolean
  hasNext: boolean
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

export function MainContent({
  course,
  activeContent,
  onMarkComplete,
  onNavigate,
  hasPrevious,
  hasNext,
  onToggleSidebar,
  sidebarOpen,
}: MainPlayerProps) {
  const progress = calculateProgress(course)
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    const commonProps = {
      content: activeContent,
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
      case "pdf":
        return <PdfContent {...commonProps} />
      case "assignment":
        return <AssignmentContent {...commonProps} />
      default:
        return null
    }
  }

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
        <div className={"bg-background p-6"}>{renderContent()}</div>

        <div className="mt-4">
          <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  )
}
