"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuizStatsProps {
  stats: {
    total: number
    visited: number
    notVisited: number
    answered: number
    notAnswered: number
    marked: number
    flagged: number
  }
}

export function QuizStats({ stats }: QuizStatsProps) {
  const items = [
    { label: "Total Questions", value: stats.total, color: "text-foreground" },
    { label: "Visited", value: stats.visited, color: "text-muted-foreground" },
    { label: "Not Visited", value: stats.notVisited, color: "text-muted-foreground" },
    { label: "Answered", value: stats.answered, color: "text-success" },
    { label: "Not Answered", value: stats.notAnswered, color: "text-destructive" },
    { label: "Marked to review", value: stats.marked, color: "text-info" },
    { label: "Flagged for Later", value: stats.flagged, color: "text-violet-600" },
  ]

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-card-foreground">Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span className={`font-medium ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
