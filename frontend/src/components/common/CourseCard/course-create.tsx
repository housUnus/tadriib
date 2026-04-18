"use client"

import Link from "next/link"
import { format } from "date-fns"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pencil,
  MoreHorizontal,
  Trash2,
  Copy,
  Users,
  PlayCircle,
  FileText,
  Video,
  Eye,
} from "lucide-react"
import { cn } from "@/lib/utils/utils"
import type { CourseType } from "@/types/course"

type CourseStatus = "draft" | "review" | "published" | "archived" | "rejected"

interface InstructorCourse {
  id: string
  title: string
  poster: string | null
  type: CourseType
  status: CourseStatus
  category: string
  students?: number
  updated_at: string
  is_live?: boolean
  slug?: string
}

interface CourseCardProps {
  course: InstructorCourse
  onDelete?: (id: string) => void
  onDuplicate?: (id: string) => void
}

const statusConfig: Record<CourseStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" },
  review: { label: "In Review", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  published: { label: "Published", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  rejected: { label: "Rejected", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" },
  archived: { label: "Archived", className: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" },
}

const typeIcons: Record<CourseType, React.ReactNode> = {
  course: <PlayCircle className="h-3.5 w-3.5" />,
  quiz: <FileText className="h-3.5 w-3.5" />,
  webinar: <Video className="h-3.5 w-3.5" />,
}

export function CourseCreateCard({ course, onDelete, onDuplicate }: CourseCardProps) {
  const status = statusConfig[course.status]

  return (
    <div className="w-full">
      <Card className="p-0 group transition-all duration-300 hover:-translate-y-1 border-0 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md h-full">
        <CardContent className="p-0 h-full flex flex-col relative">
          {/* Image */}
          <Link href={`/instructor/create-course/${course.id}`}>
            <div className="relative h-36 sm:h-40 bg-linear-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 rounded-t-xl overflow-hidden">
              {course.poster ? (
                <img
                  src={course.poster}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl font-bold text-gray-300 dark:text-zinc-700">
                    {course.title?.charAt(0)?.toUpperCase() || "C"}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <Badge className={cn("text-xs font-medium border-0", status.className)}>
                  {status.label}
                </Badge>
              </div>

              {/* Type Badge */}
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="text-xs gap-1 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm text-primary">
                  {typeIcons[course.type]}
                  {course.type.charAt(0).toUpperCase() + course.type.slice(1)}
                </Badge>
              </div>
            </div>
          </Link>

          <div className="p-3 flex-1 flex flex-col">
            {/* Title */}
            <div className="flex items-start justify-between gap-2">
              <Link href={`/instructor/create-course/${course.id}`} className="flex-1 min-w-0">
                <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {course.title || "Untitled Course"}
                </h3>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 -mr-1 -mt-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem asChild>
                    <Link href={`/instructor/create-course/${course.id}`} className="cursor-pointer">
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/courses/${course.slug}`} className="cursor-pointer" target="_blank" rel="noopener noreferrer">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem onClick={() => onDuplicate?.(course.id)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete?.(course.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              {course.is_live && (
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {course.students ?? 0} student(s)
                </span>
              )}
            </div>

            {/* Updated date */}
            <p className="text-xs text-muted-foreground/70 mt-auto pt-2">
              Updated {format(new Date(course.updated_at), "MMM d, yyyy")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
