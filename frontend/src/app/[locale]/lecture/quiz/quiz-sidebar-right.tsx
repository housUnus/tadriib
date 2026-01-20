"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PanelRightClose } from "lucide-react"
import { QuizStats } from "./quiz-stats"
import { FontSizeControl } from "./font-size-control"

interface QuizSidebarRightProps {
  stats: {
    total: number
    visited: number
    notVisited: number
    answered: number
    notAnswered: number
    marked: number
    flagged: number
  }
  fontSize: number
  onFontSizeChange: (size: number) => void
  onCollapse: () => void
}

export function QuizSidebarRight({ stats, fontSize, onFontSizeChange, onCollapse }: QuizSidebarRightProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b px-4 py-2">
        <span className="text-sm font-medium">Overview</span>
        <Button variant="ghost" size="icon" onClick={onCollapse} className="h-7 w-7" title="Hide info panel">
          <PanelRightClose className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Tools</span>
              <FontSizeControl fontSize={fontSize} onFontSizeChange={onFontSizeChange} />
            </div>

            <QuizStats stats={stats} />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
