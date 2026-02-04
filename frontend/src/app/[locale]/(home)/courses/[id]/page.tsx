
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import Detail from "./detail"
import { useServerFetch } from "@/hooks/auth/user-server-fetch";
export default async function CourseDetailPage({ params }: { params: { id: string, locale: string } }) {
  const resolvedParams = await params

  const client = await useServerFetch();
  const res = await client.get(`/courses/${resolvedParams.id}/`);
  console.log("🚀 ~ CourseDetailPage ~ res:", res)

  return (
    <div className="">
      <Detail course={res.data} />
    </div>
  )
}
