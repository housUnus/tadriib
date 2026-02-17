"use client"

import { DataTable } from "@/components/common/DataTable/data-table"
import TableContent from "@/components/common/DataTable/table-content"
import TablePagination from "@/components/common/DataTable/table-pagination"
import TableSearch from "@/components/common/DataTable/table-search"
import { Modal } from "@/components/common/Modal/modal"
import { StarRating } from "@/components/common/StartRating"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useDataTable } from "@/hooks/use-data-table"
import { useModal } from "@/hooks/use-modal"
import { formatDate } from "date-fns/format"
import Link from "next/link"

const customRow = (row: any) => (
    <div key={row.id} className="border-t border-border pt-6">
        <div className="flex items-start gap-4">
            <Avatar>
                <AvatarImage src={row.avatar || "/placeholder.svg"} />
                <AvatarFallback>{row.rated_by?.full_name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{row.rated_by?.full_name}</span>
                    <span className="text-sm text-muted-foreground">{formatDate(row.created_at, "dd MMMM yyyy")}</span>
                </div>
                <div className="flex mb-2">
                    <StarRating rating={row.value} size={14} />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{row.comment}</p>
            </div>
        </div>
    </div>
)

export default function CourseReviews({ course }: { course: any }) {
    const { isOpen, open, close, toggle } = useModal()
    const dt = useDataTable({
        columns: [],
        initialData: course.latest_reviews || [],
        url: `/courses/${course.slug}/reviews/`,
    })

    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-6">Course Rating</h2>

            <div className="grid md:grid-cols-[auto_1fr] gap-8 mb-8">
                <div className="text-center">
                    <div className="text-5xl font-bold text-[#b4690e]">{course.average_rating}</div>
                    <div className="flex justify-center my-2">
                        <StarRating rating={course.average_rating} />
                    </div>
                    <Button variant="link" className="text-primary text-sm font-semibold underline" onClick={toggle}>
                        {course.total_reviews} reviews
                    </Button>
                </div>

                <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3">
                            <Progress
                                value={course.rating_distribution[stars as keyof typeof course.rating_distribution]}
                                className="h-2 flex-1"
                            />
                            <div className="flex items-center gap-1 w-24">
                                <StarRating key={stars} rating={stars} size={12} />
                            </div>
                            <span className="text-sm text-muted-foreground w-10">
                                {course.rating_distribution[stars]}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {course.latest_reviews?.map((review: any) => (
                    <div key={review.id} className="border-t border-border pt-6">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={review.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{review.rated_by?.full_name?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold">{review.rated_by?.full_name}</span>
                                    <span className="text-sm text-muted-foreground">{formatDate(review.created_at, "dd MMMM yyyy")}</span>
                                </div>
                                <div className="flex mb-2">
                                    <StarRating rating={review.value} size={14} />
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Button variant="outline" className="mt-6 bg-transparent" onClick={toggle}>
                See all reviews
            </Button>

            <Modal isOpen={isOpen} close={close} title="Reviews" size="md">
                <div className="space-y-6">
                    <TableSearch dt={dt} />
                    <TableContent dt={dt} renderRow={customRow} />
                    <TablePagination dt={dt} />
                </div>
            </Modal>
        </div>

    )
}