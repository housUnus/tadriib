export default function Layout({
    children,
    courses,
}: {
    children: React.ReactNode,
    courses: React.ReactNode,
}) {
    return (
        <div className="min-h-screen bg-background  pt-10">
            <div className="max-w-6xl mx-auto px-4 pt-4">
                {children}
                {courses}
            </div>
        </div>
    )
}