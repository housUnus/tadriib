import CourseCard from "@/components/common/CourseCard";
import { useServerFetch } from "@/hooks/auth/user-server-fetch";

export default async function UseCourses({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const client = await useServerFetch();
    const { data, error } = await client.get(`/courses?instructor__profile__slug=${id}&limit=6`);

    return (
        <div className="space-y-0 divide-y grid md:grid-cols-4 gap-6 mb-4">
            {data?.results?.map((course: any) => {
                return (
                    <div className="shadow-sm" key={course.slug}>
                        <CourseCard item={course} />
                    </div>
                )
            })}
            {!data?.results?.length && (
                <div className="col-span-full text-center py-5">
                    <p className="text-muted-foreground">No courses found.</p>
                </div>
            )}
        </div>
    )
}