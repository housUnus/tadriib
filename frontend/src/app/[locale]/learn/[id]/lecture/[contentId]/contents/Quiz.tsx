"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Content } from "@/stores/enrollment"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { SubmissionsList } from "@/app/components/quiz/submissions/submissions-list"
import { QuizWrapper } from "@/app/components/quiz/wraper"


interface QuizContentProps {
  content: Content
}

export function QuizContent({ content }: QuizContentProps) {
  const router = useRouter()
  const client = useClientFetch()

  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(content.progress?.active_quiz_submission)

  const searchParams = useSearchParams()

  const submissionId = searchParams.get("submission")

  useEffect(() => {
    setSelectedSubmission(content.progress?.active_quiz_submission || submissionId)
  }, [content.progress?.active_quiz_submission, submissionId])

  if (!selectedSubmission) {
    return (
      <SubmissionsList
        content={content}
        onStartNew={async () => {
          await client.post(`/quiz-submissions/start/`, {
            lecture_id: content.id,
          })
          content.invalidate()
          router.refresh()
          setSelectedSubmission(null)
        }}
        onReview={(id) => router.replace(`?submission=${id}`)}
        onContinue={(id) => router.replace(`?submission=${id}`)}
        key={selectedSubmission}
      />
    )
  }

  return (
    <QuizWrapper
      content={content} selectedSubmission={selectedSubmission || ""}
      key={selectedSubmission}
      onBack={()=>router.replace(`?submission=`)}
    />
  )
}
