import { useServerFetch } from "@/hooks/auth/user-server-fetch";
import Courses from "./courses";

export default async function CoursesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams;
    const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
        if (typeof value === "string") acc[key] = value;
        return acc;
        }, {} as Record<string, string>)
    ).toString();

    const client = await useServerFetch();
    const { data, error }: any = await client.get(`/courses/?limit=10&${queryString}`);

    return (
        <Courses courses={data?.results}/>
    );
}
