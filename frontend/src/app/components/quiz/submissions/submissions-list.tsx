import { Content } from "@/stores/enrollment"
import { SubmissionCard } from "./submission-card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Sparkles, TrendingUp, HelpCircle, Clock, AlertTriangle } from "lucide-react"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { useQuery } from "@tanstack/react-query"
import { Quiz, Submission } from "@/lib/data/quiz-data"
import { useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal"
import { Modal } from "@/components/common/Modal/modal"
import { CardContent } from "@/components/ui/card"

interface SubmissionsListProps {
    content: Content
    onStartNew?: () => void
    onContinue?: (id: string) => void
    onReview?: (id: string) => void
}

export function SubmissionsList({
    content,
    onStartNew,
    onContinue,
    onReview,
}: SubmissionsListProps) {

    const client = useClientFetch()

    const { isOpen, open, close } = useModal()

    const quiz: Quiz = content.content

    const { data } = useQuery({
        queryKey: ["quiz-submissions", content.progress.id],
        queryFn: () => client.get(`/quiz-submissions/?progress_id=${content.progress.id}`).then(res => res.data),
        staleTime: 0,
        refetchOnMount: "always",
    })

    if (!data) return null

    const submissions = (data as Submission[])

    const activeSubmissions = submissions.filter(
        s => s.status === "in_progress" || s.status === "is_paused"
    )
    const completedSubmissions = submissions.filter(
        s => s.status === "completed" || s.status === "submitted" || s.status === "expired"
    )

    const canStartNew = quiz.max_attempts ? submissions.length < quiz.max_attempts : true
    const hasActiveSubmission = activeSubmissions.length > 0

    // Calculate best score
    const scores = completedSubmissions
        .map(s => s.score)
        .filter((s): s is number => s !== null)
    const bestScore = scores.length > 0 ? Math.max(...scores) : null

    return (
        <div className="mx-auto max-w-2xl space-y-6">
            {/* Header Card */}
            <div className="rounded-2xl border bg-card p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold text-foreground">{content.content.title || "Get ready to start the quiz!"}</h1>
                            {content.content.description && (
                                <p className="mt-1 text-sm text-muted-foreground">{content.content.description}</p>
                            )}
                        </div>
                    </div>

                    {canStartNew && !hasActiveSubmission && (
                        <Button onClick={open} className="shrink-0 gap-2">
                            <Plus className="h-4 w-4" />
                            New Attempt
                        </Button>
                    )}
                </div>

                {/* Stats Row */}
                <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t pt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Attempts:</span>
                        <span className="font-semibold">
                            {submissions.length}
                            {quiz.max_attempts && <span className="text-muted-foreground font-normal"> / {quiz.max_attempts}</span>}
                        </span>
                    </div>
                    {activeSubmissions.length > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-emerald-600 font-medium">{activeSubmissions.length} active</span>
                        </div>
                    )}
                    {bestScore !== null && (
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Best:</span>
                            <span className="font-semibold text-emerald-600">{bestScore}%</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Completed Submissions */}
            {submissions.length > 0 && (
                <section className="space-y-3">
                    <h2 className="text-sm font-medium text-muted-foreground px-1">Past Attempts</h2>
                    <div className="space-y-3">
                        {submissions.map((submission, index) => (
                            <SubmissionCard
                                key={submission.id}
                                submission={submission}
                                onContinue={onContinue}
                                onReview={onReview}
                                index={submissions.length - index}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {submissions.length === 0 && (
                <div className="rounded-2xl border-2 border-dashed bg-muted/30 p-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Sparkles className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Ready to begin?</h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
                        Start your first attempt to test your knowledge. You can pause and resume anytime.
                    </p>
                    <Button onClick={open} className="mt-5 gap-2">
                        <Plus className="h-4 w-4" />
                        Start Assessment
                    </Button>
                </div>
            )}

            <Modal
                isOpen={isOpen}
                close={close}
                title={"Get ready to start the quiz!"}
                footer={null} >
                <CardContent className="space-y-6">

                    {/* Quiz Info */}
                    <div className="space-y-3 text-sm">

                        <div className="flex items-center gap-2">
                            <HelpCircle className="size-4 text-muted-foreground" />
                            <span>{content.content.questions?.length || 0} Questions</span>
                        </div>

                        {content.content.time_limit_minutes && (
                            <div className="flex items-center gap-2">
                                <Clock className="size-4 text-muted-foreground" />
                                <span>{content.content.time_limit_minutes} minutes</span>
                            </div>
                        )}

                    </div>

                    {/* Instructions */}
                    <div className="rounded-md border p-4 text-sm space-y-2 bg-muted/40">

                        <div className="flex gap-2">
                            <AlertTriangle className="size-4 mt-0.5" />
                            <p>
                                Once the quiz starts, the timer will begin immediately.
                            </p>
                        </div>

                        <p>
                            You can navigate between questions using the sidebar.
                        </p>

                        <p>
                            Your answers are automatically saved.
                        </p>

                        <p>
                            Do not refresh the page during the quiz.
                        </p>

                    </div>

                    {/* Start Button */}
                    <Button
                        className="w-full"
                        size="lg"
                        onClick={onStartNew}
                    >
                        Start Quiz
                    </Button>

                </CardContent>
            </Modal>
        </div>
    )
}
