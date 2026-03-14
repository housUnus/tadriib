"use client"

import { useState, useMemo, useEffect } from "react"
import { CourseSidebar } from "./Sidebar"
import { MainContent } from "./MainContent"
import { useIsMobile } from "@/hooks/use-mobile"
import type { Enrolment } from "@/lib/data/course-data"
import {  Content, Section, useEnrollmentStore } from "@/app/stores/enrollment"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { useUpdateEffect } from "@/hooks/use-update-effect"

export default function LectureContent({ enrollment }: { enrollment: Enrolment }) {
    const client = useClientFetch()
    const [activeContentId, setActiveContentId] = useState<string>(enrollment.progress?.active_lecture || enrollment.course.sections[0].contents[0].id)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const {setState, markLectureCompleted, course, setActiveLecture, progress} = useEnrollmentStore((state) => state)
    console.log("🚀 ~ LectureContent ~ progress:", progress)

    useEffect(() => {
        setState(enrollment)
    }, [])

    useUpdateEffect(() => {
        setActiveLecture(client, activeContentId)
    }, [activeContentId])

    const isMobile = useIsMobile()

    useEffect(() => {
        if (isMobile) {
            setSidebarOpen(false)
        }
    }, [isMobile])

    // Flatten all content items for navigation
    const allContents = useMemo(() => {
        return course.sections.flatMap((section: Section) => section.contents)
    }, [course])

    const activeContent = useMemo(() => {
        return allContents.find((c: Content) => c.id === activeContentId) || allContents[0]
    }, [allContents, activeContentId])

    const currentIndex = allContents.findIndex((c: Content) => c.id === activeContentId)

    const handleContentSelect = (content: Content) => {
        setActiveContentId(content.id)
    }

    const handleMarkComplete = async (contentId: string) => {
        markLectureCompleted(client, contentId)
    }

    const handleNavigate = (direction: "previous" | "next") => {
        const newIndex = direction === "previous" ? currentIndex - 1 : currentIndex + 1
        if (newIndex >= 0 && newIndex < allContents.length) {
            setActiveContentId(allContents[newIndex].id)
        }
    }

    if (!course.id) return null

    return (
        <div className="flex h-screen overflow-hidden relative">
            <main className="flex-1 overflow-hidden">
                <MainContent
                    activeContent={activeContent}
                    onMarkComplete={handleMarkComplete}
                    onNavigate={handleNavigate}
                    hasPrevious={currentIndex > 0}
                    hasNext={currentIndex < allContents.length - 1}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    sidebarOpen={sidebarOpen}
                />
            </main>

            <CourseSidebar
                activeContentId={activeContentId}
                onContentSelect={handleContentSelect}
                onToggleComplete={handleMarkComplete}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
        </div>
    )
}
