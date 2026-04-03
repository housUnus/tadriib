"use client"

import { useEffect, useState } from "react"
import { Video, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Conference, Content, useEnrollmentStore } from "@/stores/enrollment"

import { DailyProvider, DailyVideo } from "@daily-co/daily-react"
import DailyIframe from "@daily-co/daily-js"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"

interface ConferenceContentProps {
    content: Content
    onMarkComplete: () => void
    onPrevious: () => void
    onNext: () => void
    hasPrevious: boolean
    hasNext: boolean
}

export function ConferenceContent({
    content,
    onMarkComplete,
    onPrevious,
    onNext,
    hasPrevious,
    hasNext,
}: ConferenceContentProps) {
    const [joining, setJoining] = useState(false)
    const [joined, setJoined] = useState(false)
    const [callObject, setCallObject] = useState<any>(null)

    const conference = (content.content as Conference)
    const client = useClientFetch()
    const { course } = useEnrollmentStore()


    const handleJoin = async () => {
        try {
            setJoining(true)

            const { data, error } = await client.post(`/enrollments-progress/${course.id}/join_conference/`, {
                lecture_id: content.id
            })

            const { room_url, token } = data as { room_url: string, token: string }

            const call = DailyIframe.createCallObject()

            // THEN join
            await call.join({
                url: room_url,
                token,
            })

            setCallObject(call)
            setJoined(true)

        } catch (err) {
            console.error("Failed to join conference", err)
        } finally {
            setJoining(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <Card className="border-border bg-card">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                            <Video className="h-6 w-6 text-primary" />
                        </div>

                        <div>
                            <CardTitle>{content.title}</CardTitle>
                            <CardDescription>
                                Live Conference
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Conference Body */}
            <Card className="border-border bg-card">
                <CardContent className="space-y-4">
                    {/* Status */}
                    <div className="text-sm text-muted-foreground">
                        Status:{" "}
                        <span className="font-medium capitalize">
                            {conference?.status}
                        </span>
                    </div>

                    {/* Video Area */}
                    {!joined ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-10">
                            <p className="text-muted-foreground">
                                {conference?.status === "live"
                                    ? "The lecture is live. Join now."
                                    : conference?.status === "scheduled"
                                        ? "This lecture hasn’t started yet."
                                        : "This lecture has ended."}
                            </p>

                            <Button
                                onClick={handleJoin}
                                disabled={joining || conference?.status !== "live"}
                            >
                                {joining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Join Lecture
                            </Button>
                        </div>
                    ) : (
                        <div id="video-container" className="h-[500px] w-full rounded-xl overflow-hidden">
                            <DailyProvider callObject={callObject}>
                                <DailyVideo type="video" sessionId=""/>
                            </DailyProvider>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                    onClick={onMarkComplete}
                    className={content.progress?.is_completed ? "bg-success hover:bg-success/90" : ""}
                >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    {content.progress?.is_completed ? "Completed" : "Mark as Complete"}
                </Button>

                <div className="flex gap-2">
                    <Button variant="outline" onClick={onPrevious} disabled={!hasPrevious}>
                        Previous
                    </Button>

                    <Button onClick={onNext} disabled={!hasNext}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}