"use client"

import { Button } from "@/components/ui/button"
import { PanelLeftOpen, PanelRightOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import {useLocale} from 'next-intl';

interface SidebarExpandButtonProps {
  side: "left" | "right"
  onClick: () => void
}

export function SidebarExpandButton({ side, onClick }: SidebarExpandButtonProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const isLeft = isRTL ? !(side === "left"): (side === "left");

  return (
    <div className={cn("absolute top-4 z-10", isLeft ? "left-0" : "right-0")}>
      <Button
        variant="secondary"
        size="sm"
        onClick={onClick}
        className={cn(
          "h-10 w-8 border bg-card shadow-md transition-all hover:w-10 hover:bg-accent text-primary",
          isLeft ? "rounded-l-none rounded-r-lg border-l-0" : "rounded-l-lg rounded-r-none border-r-0",
        )}
        title={isLeft ? "Show questions panel" : "Show overview panel"}
      >
        {isLeft ? <PanelLeftOpen className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
      </Button>
    </div>
  )
}
