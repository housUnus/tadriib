"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Clock, HelpCircle, AlertTriangle } from "lucide-react"
import { Content } from "@/app/stores/enrollment"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { useQuery } from "@tanstack/react-query"

interface QuizStartProps {
  content: Content
  onStart: () => Promise<void>
}

export default function QuizStart({
  content,
  onStart,
}: QuizStartProps) {
  console.log("🚀 ~ QuizStart ~ content:", content)

  const client = useClientFetch()

  const { data: submissions } = useQuery({
    queryKey: ["quiz-submissions", content.progress.id],
    queryFn: () => client.get(`/quiz-submissions/?progress_id=${content.progress.id}`).then(res => res.data),
    staleTime: 0,
    refetchOnMount: "always", 
  })
  console.log("🚀 ~ QuizStart ~ submissions:", submissions)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">

      <Card className="w-full max-w-xl shadow-lg">

        <CardHeader>
          <CardTitle className="text-2xl">{content.title}</CardTitle>

          <CardDescription>
            {content.content.description || "Get ready to start the quiz!"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* Quiz Info */}
          <div className="space-y-3 text-sm">

            <div className="flex items-center gap-2">
              <HelpCircle className="size-4 text-muted-foreground"/>
              <span>{content.content.questions?.length || 0} Questions</span>
            </div>

            {content.content.time_limit_minutes && (
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground"/>
                <span>{content.content.time_limit_minutes} minutes</span>
              </div>
            )}

          </div>

          {/* Instructions */}
          <div className="rounded-md border p-4 text-sm space-y-2 bg-muted/40">

            <div className="flex gap-2">
              <AlertTriangle className="size-4 mt-0.5"/>
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
            onClick={onStart}
          >
            Start Quiz
          </Button>

        </CardContent>

      </Card>

    </div>
  )
}