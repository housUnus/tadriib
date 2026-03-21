"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PanelRightClose, PanelRightOpen, Trophy } from "lucide-react"
import { useEnrollmentStore } from "@/app/stores/enrollment"
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"

function CircularProgress({ progress }: { progress: number }) {
    const data = [{ name: "progress", value: progress, fill: progress === 100 ? "var(--color-success)" : "var(--color-primary)" }]

    return (
        <div className="flex items-center justify-center w-[50px] h-[50px] opacity-60">
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
                <Trophy className={`w-4 h-4 ${progress === 100 ? "text-success" : "text-primary"}`} />
            </span>
        </div>
    )
}

export function LearnHeader({
    sidebarOpen,
    onToggleSidebar,
}: {
    sidebarOpen: boolean
    onToggleSidebar: () => void
}) {
    const { course, progress } = useEnrollmentStore()

    return (
        <header className="shrink-0 border-b border-border bg-card">
            <div className="flex h-14 items-center justify-between px-4 rounded">
                <div className="flex items-center gap-3">
                    <Link href="/" className="text-xl font-bold text-primary">
                        Learn
                    </Link>

                    <span className="text-sm text-foreground line-clamp-1 leading-normal">
                        {course.title}
                    </span>
                </div>

                <div className="flex items-center gap-2 h-full">
                    <Button variant="ghost" size="sm" className="h-full rounded-none">
                        <div className="flex items-center">
                            <CircularProgress progress={progress?.progress_percent || 0} />

                            <span
                                className={`hidden sm:inline text-sm opacity-60 ${(progress?.progress_percent || 0) === 100
                                    ? "text-success"
                                    : "text-primary"
                                    }`}
                            >
                                {progress?.completed_lectures || 0}/
                                {progress?.total_lectures || 0} Completed
                            </span>
                        </div>
                    </Button>

                    <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
                        {sidebarOpen ? (
                            <PanelRightClose className="h-5 w-5" />
                        ) : (
                            <PanelRightOpen className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>
        </header>
    )
}