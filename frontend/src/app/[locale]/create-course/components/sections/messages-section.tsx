"use client"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MessageSquare, PartyPopper, Info } from "lucide-react"
import { useCourseStore } from "@/stores/course"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

export function MessagesSection() {
  const { course, updateCourseMetadata } = useCourseStore()
  const client = useClientFetch()

  const messages = course.messages || {
    welcomeMessage: "",
    completionMessage: "",
  }

  const updateMessages = (field: string, value: string) => {
    updateCourseMetadata(client,
      {
        messages: { ...messages, [field]: value },
      })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Course Messages</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Customize the messages students receive
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Welcome Message</CardTitle>
          </div>
          <CardDescription>
            This message is sent to students when they enroll in your course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={messages.welcomeMessage}
            onChange={(e) => updateMessages("welcomeMessage", e.target.value)}
            placeholder="Welcome to the course! I'm excited to have you here. In this course, you'll learn..."
            rows={5}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {messages.welcomeMessage.length}/1000 characters
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-primary" />
            <CardTitle className="text-base">Completion Message</CardTitle>
          </div>
          <CardDescription>
            This message is shown when students complete your course
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            value={messages.completionMessage}
            onChange={(e) => updateMessages("completionMessage", e.target.value)}
            placeholder="Congratulations on completing the course! You've learned so much. Here are some next steps you can take..."
            rows={5}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {messages.completionMessage.length}/1000 characters
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-3 p-4 bg-muted/50 rounded-lg">
        <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p>
            Personal messages help create a connection with your students. Include your name,
            what they can expect, and how to get help if they need it.
          </p>
        </div>
      </div>
    </div>
  )
}
