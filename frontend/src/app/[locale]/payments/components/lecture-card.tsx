import { Clock, Calendar, User } from "lucide-react"

interface LectureCardProps {
    lecture: any
    compact?: boolean
}

export function LectureCard({ lecture }: LectureCardProps) {
    return (
        <div className="flex gap-4">
            <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center shrink-0">
                <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{lecture.title}</h3>
                <p className="text-sm text-muted-foreground">{lecture.instructor}</p>
            </div>
            <div className="flex flex-col">
                <div className="font-bold text-foreground">${lecture.price.toFixed(2)}</div>
                {/* <div className="text-sm text-muted-foreground line-through">${lecture.originalPrice.toFixed(2)}</div> */}
            </div>
        </div>
    )
}
