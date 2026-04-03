"use client"

import { format, intervalToDuration, formatDuration } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Play, Eye, Clock, CheckCircle2, PauseCircle, AlertCircle,
    ChevronRight, FileText, Timer, CircleDot, Flag, Circle, CheckCircle
} from "lucide-react"
import { cn } from "@/lib/utils/utils"
import { Submission } from "@/lib/data/quiz-data"




interface SubmissionCardProps {
    submission: Submission
    onContinue?: (id: string) => void
    onReview?: (id: string) => void
    index: number
}

const STATUS = {
    in_progress: { label: "In Progress", icon: Play, color: "emerald" },
    is_paused: { label: "Paused", icon: PauseCircle, color: "amber" },
    completed: { label: "Completed", icon: CheckCircle2, color: "sky" },
    submitted: { label: "Submitted", icon: CheckCircle2, color: "sky" },
    expired: { label: "Expired", icon: AlertCircle, color: "red" }
} as const

const colorClasses = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/30", btn: "bg-emerald-500 hover:bg-emerald-600" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/30", btn: "bg-amber-500 hover:bg-amber-600" },
    sky: { bg: "bg-sky-500/10", text: "text-sky-500", border: "border-sky-500/30", btn: "bg-sky-500 hover:bg-sky-600" },
    red: { bg: "bg-red-500/10", text: "text-red-500", border: "border-red-500/30", btn: "bg-red-500 hover:bg-red-600" }
}

// Format duration in minutes using date-fns
const formatMinutes = (minutes: number): string => {
    const duration = intervalToDuration({ start: 0, end: minutes * 60 * 1000 })
    return formatDuration(duration, { format: ["hours", "minutes"], delimiter: " " })
        .replace(/ hours?/, "h")
        .replace(/ minutes?/, "m") || "0m"
}

export function SubmissionCard({ submission, onContinue, onReview, index }: SubmissionCardProps) {

    const { label, icon: StatusIcon, color } = STATUS[submission.status]
    const colors = colorClasses[color]
    const isActive = submission.status === "in_progress" || submission.status === "is_paused"

    const { total_questions, total_answered, total_flagged, total_visited } = submission
    const skipped = Math.max(0, total_visited - total_answered)
    const notVisited = total_questions - total_visited
    const progress = (total_answered / total_questions) * 100

    return (
        <div className={cn(
            "group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md",
            isActive && `ring-1 ring-inset ring-${color}-500/20`
        )}>

            <div className="p-4 sm:p-5">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", colors.bg)}>
                        <StatusIcon className={cn("h-5 w-5", colors.text)} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="font-semibold truncate">Attempt #{index}</h3>
                            <Badge variant="outline" className={cn("shrink-0 gap-1.5 text-xs px-2 py-0.5", colors.bg, colors.text, colors.border)}>
                                {label}
                            </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground mt-0.5">
                            {format(new Date(submission.started_at), "MMM d, h:mm a")}
                            {!isActive && submission.submitted_at && (
                                <> → {format(new Date(submission.submitted_at), "MMM d, h:mm a")}</>
                            )}
                        </p>
                    </div>

                    {/* Score */}
                    {!isActive && submission.score_percent !== null && (
                        <div className={cn("shrink-0 flex flex-col items-center rounded-xl px-3 py-1.5",
                            submission.score_percent >= 70 ? "bg-emerald-500/10" : "bg-red-500/10"
                        )}>
                            <span className={cn("text-xl font-bold leading-none",
                                submission.score_percent >= 70 ? "text-emerald-500" : "text-red-500"
                            )}>
                                {Math.round(submission.score_percent)}%
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">Score</span>
                        </div>
                    )}
                </div>

                {/* Stats */}
                <div className="mt-4 flex flex-wrap gap-2">
                    <StatPill icon={FileText} value={total_questions} label="questions" />
                    <StatPill icon={Clock} value={formatMinutes(submission.total_duration)} label="duration" />
                </div>

                {/* Progress for active */}
                {isActive && (
                    <div className="mt-4 space-y-3">
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-semibold tabular-nums">{Math.round(progress)}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-muted overflow-hidden">
                                <div
                                    className={cn("h-full rounded-full transition-all bg-gradient-to-r",
                                        color === "emerald" && "from-emerald-600 to-emerald-400",
                                        color === "amber" && "from-amber-600 to-amber-400"
                                    )}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
                            <StateChip icon={CheckCircle} iconColor="text-emerald-500" count={total_answered} label="answered" />
                            {total_flagged > 0 && <StateChip icon={Flag} iconColor="text-amber-500" count={total_flagged} label="flagged" />}
                            {skipped > 0 && <StateChip icon={Circle} count={skipped} label="skipped" />}
                            {notVisited > 0 && <StateChip icon={CircleDot} count={notVisited} label="not visited" />}
                        </div>
                    </div>
                )}

                {/* Action */}
                <div className="mt-4 flex justify-end">
                    {isActive ? (
                        <Button onClick={() => onContinue?.(submission.id)} size="sm" className={cn("gap-1.5", colors.btn, "text-white")}>
                            {submission.status === "is_paused" ? "Resume" : "Continue"}
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => onReview?.(submission.id)} className="gap-1.5">
                            <Eye className="h-4 w-4" />
                            Review
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

function StatPill({ icon: Icon, value, label }: { icon: React.ElementType; value: string | number; label: string; }) {
    return (
        <div className={cn("flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs")}>
            <Icon className={cn("h-3.5 w-3.5", "text-muted-foreground")} />
            <span className={cn("font-medium")}>{value}</span>
            <span className={cn("text-muted-foreground")}>{label}</span>
        </div>
    )
}

function StateChip({ icon: Icon, iconColor, count, label }: { icon: React.ElementType; iconColor?: string; count: number; label: string }) {
    return (
        <div className="flex items-center gap-1.5">
            <Icon className={cn("h-3.5 w-3.5", iconColor || "text-muted-foreground")} />
            <span className="text-muted-foreground">{count} {label}</span>
        </div>
    )
}
