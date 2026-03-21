import { useServerFetch } from "@/hooks/auth/user-server-fetch"
import LayoutWrapper from "./layout-wrapper"


export default async function LearnLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const client = await useServerFetch()

    const { data, error } = await client.get(`/enrollments/${id}/`)

    const enrollment = data

    if (!enrollment) return null

    return (
        <LayoutWrapper enrollment={enrollment}>
            {children}
        </LayoutWrapper>
    )
}