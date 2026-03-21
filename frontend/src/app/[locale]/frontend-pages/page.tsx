
import { useServerFetch } from "@/hooks/auth/user-server-fetch"
import LectureContent from "./lecture"

export default async function LecturePage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  const client = await useServerFetch()

  const {data, error} = await client.get(`/enrollments/${id}/`)

  const enrollment = data

  if (!enrollment) return null

  return (
    <LectureContent enrollment={enrollment} />
  )
  
}
