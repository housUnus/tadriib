"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Play,
  Clock,
  BarChart3,
  Globe,
  Award,
  FileText,
  Download,
  Smartphone,
  Infinity,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  PlayCircle,
  Heart,
  Share2,
  ArrowLeft,
  Calendar,
  Package,
  BookOpen,
  ChevronRight,
  ListCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ShareDialog } from "@/components/common/share-dialog"
import { ContentPreviewModal } from "../content-preview"
import { useClientFetch } from "@/hooks/auth/use-client-fetch"
import { formatDate } from "date-fns"
import { StarRating } from "@/components/common/StartRating"
import * as _ from "lodash"
import CourseReviews from "./reviews"

// Mock course data
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp 2025",
  subtitle:
    "Become a full-stack web developer with just one course. HTML, CSS, JavaScript, Node, React, MongoDB, and more!",
  rating: 4.7,
  ratingsCount: 234567,
  studentsCount: 892341,
  category: [
    { name: "Development", href: "/category/development" },
    { name: "Web Development", href: "/category/web-development" },
    { name: "React", href: "/category/react" },
  ],
  instructor: {
    name: "Dr. Sarah Johnson",
    title: "Senior Software Engineer & Educator",
    avatar: "/placeholder.svg?height=128&width=128",
    rating: 4.8,
    reviewsCount: 156234,
    studentsCount: 1250000,
    coursesCount: 12,
    bio: "Dr. Sarah Johnson is a senior software engineer with over 15 years of experience in web development. She has worked at companies like Google, Microsoft, and Meta, and now dedicates her time to teaching the next generation of developers.",
  },
  language: "English",
  lastUpdated: "January 2025",
  price: 89.99,
  originalPrice: 199.99,
  discountPercent: 55,
  thumbnail: "/placeholder.svg?height=400&width=720",
  previewVideo: "/preview.mp4",
  duration: "63.5 total hours",
  lectures: 615,
  level: "All Levels",
  description: `
    <p>Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer.</p>
    <p>With over 60 hours of content, this comprehensive course covers everything from the basics of HTML and CSS to advanced topics like React, Node.js, and MongoDB.</p>
    <h3>What makes this course different?</h3>
    <ul>
      <li>Project-based learning with 15+ real-world projects</li>
      <li>Constantly updated with the latest technologies</li>
      <li>Direct access to instructor for questions</li>
      <li>Certificate of completion</li>
    </ul>
  `,
  whatYouWillLearn: [
    "Build 15+ real-world web development projects",
    "Master HTML5, CSS3, and modern JavaScript (ES6+)",
    "Create responsive websites with Flexbox and Grid",
    "Build full-stack apps with Node.js and Express",
    "Work with databases using MongoDB and Mongoose",
    "Implement authentication and security best practices",
    "Deploy applications to production servers",
    "Build modern React applications with hooks",
  ],
  requirements: [
    "No programming experience needed - I'll teach you everything",
    "A computer with access to the internet",
    "No paid software required - all tools are free",
  ],
  sections: [
    {
      id: "1",
      title: "Introduction to Web Development",
      lectures: 12,
      duration: "1h 45m",
      contents: [
        { id: "1", title: "Welcome to the Course", type: "video", duration: "5:23", isPreview: true },
        { id: "2", title: "How the Internet Works", type: "video", duration: "12:45", isPreview: true },
        { id: "3", title: "Setting Up Your Development Environment", type: "video", duration: "18:32", isPreview: false },
        { id: "4", title: "Course Resources", type: "article", duration: "5 min read", isPreview: true, content: "<p>This article provides an overview of the resources available for this course, including code samples, project files, and recommended tools.</p>" },
      ],
    },
    {
      id: "2",
      title: "HTML Fundamentals",
      lectures: 24,
      duration: "3h 20m",
      contents: [
        { id: "5", title: "What is HTML?", type: "video", duration: "8:15", isPreview: true },
        { id: "6", title: "HTML Document Structure", type: "video", duration: "15:42", isPreview: false },
        { id: "7", title: "Working with Text Elements", type: "video", duration: "22:18", isPreview: false },
        { id: "8", title: "HTML Quiz", type: "quiz", duration: "10 questions", isPreview: false },
      ],
    },
    {
      id: "3",
      title: "CSS Styling & Layout",
      lectures: 32,
      duration: "4h 50m",
      contents: [
        { id: "9", title: "Introduction to CSS", type: "video", duration: "10:30", isPreview: false },
        { id: "10", title: "CSS Selectors Deep Dive", type: "video", duration: "25:15", isPreview: false },
        { id: "11", title: "Flexbox Layout", type: "video", duration: "35:42", isPreview: false },
        { id: "12", title: "CSS Grid Masterclass", type: "video", duration: "42:18", isPreview: false },
      ],
    },
    {
      id: "4",
      title: "JavaScript Essentials",
      lectures: 48,
      duration: "8h 15m",
      contents: [
        { id: "13", title: "JavaScript Fundamentals", type: "video", duration: "15:30", isPreview: false },
        { id: "14", title: "Variables and Data Types", type: "video", duration: "22:15", isPreview: false },
        { id: "15", title: "Functions and Scope", type: "video", duration: "28:42", isPreview: false },
        { id: "16", title: "JavaScript Quiz", type: "quiz", duration: "15 questions", isPreview: false },
      ],
    },
    {
      id: "5",
      title: "React.js from Scratch",
      lectures: 56,
      duration: "12h 30m",
      contents: [
        { id: "17", title: "What is React?", type: "video", duration: "12:30", isPreview: false },
        { id: "18", title: "Components and Props", type: "video", duration: "28:15", isPreview: false },
        { id: "19", title: "State and Lifecycle", type: "video", duration: "35:42", isPreview: false },
        { id: "20", title: "Hooks Deep Dive", type: "video", duration: "45:18", isPreview: false },
      ],
    },
  ],
  reviews: [
    {
      id: "1",
      user: "Michael T.",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "This is hands down the best web development course I've ever taken. Sarah explains everything so clearly and the projects are incredibly practical. I went from knowing nothing to landing my first developer job in 6 months!",
    },
    {
      id: "2",
      user: "Emily R.",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 5,
      date: "1 month ago",
      comment:
        "Comprehensive and well-structured. The React section alone is worth the price of the entire course. Highly recommend for anyone serious about web development.",
    },
    {
      id: "3",
      user: "David K.",
      avatar: "/placeholder.svg?height=48&width=48",
      rating: 4,
      date: "3 weeks ago",
      comment:
        "Great course overall. The only reason I'm giving 4 stars is that some of the earlier sections could use an update, but the core content is fantastic.",
    },
  ],
  ratingDistribution: {
    5: 78,
    4: 15,
    3: 4,
    2: 2,
    1: 1,
  },
}

export default function Detail({ course }: { course: any }) {

  const [expandedSections, setExpandedSections] = useState<string[]>([course.sections[0].id])
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [previewContent, setPreviewContent] = useState<typeof course.sections[0]["contents"][0] | null>(null)
  const [previewModalOpen, setPreviewModalOpen] = useState(false)

  const handlePreview = (content: typeof course.sections[0]["contents"][0]) => {
    setPreviewContent(content)
    setPreviewModalOpen(true)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
  }

  const expandAllSections = () => {
    setExpandedSections(course.sections.map((s: any) => s.id))
  }

  const collapseAllSections = () => {
    setExpandedSections([])
  }


  return (
    <div className="min-h-screen bg-background pt-10">
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <nav className="flex items-center gap-1 text-sm my-3">
          {course.primary_category?.breadcrumbs?.map((cat: { name: string; href: string }, i: number) => (
            <span key={cat.href} className="flex items-center gap-1">
              <Link href={cat.href} className="text-primary hover:underline">
                {cat.name}
              </Link>
              {i < course.primary_category.breadcrumbs.length - 1 && (
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </span>
          ))}
        </nav>
        <Badge className="w-fit mb-3 bg-amber-400 text-foreground hover:bg-amber-400 font-medium">Bestseller</Badge>
      </div>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-3">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Video Preview - Left Side */}
          <div className="lg:col-span-6 lg:flex block justify-center">
            <div
              className="relative aspect-video bg-foreground rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => handlePreview({ type: "video", isPreview: true, content: course.main_preview })}
            >
              <Image
                src={course.poster || "/placeholder.svg"}
                alt={course.title}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-7 w-7 text-foreground fill-foreground ml-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Course Info - Right Side */}
          <div className="lg:col-span-6 flex flex-col">
            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
            <p className="text-muted-foreground text-sm mb-4">{course.short_description}</p>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-sm mb-2">
                <span className="font-bold text-[#b4690e]">{course.average_rating}</span>
                <StarRating rating={course.average_rating} size={14} />
                <span className="text-muted-foreground">({course.total_reviews})</span>
              </div>

              <p className="text-sm text-muted-foreground mb-1">{courseData.studentsCount.toLocaleString()} students</p>
            </div>
            <p className="text-sm mb-4">
              Created by <Link href={`/users/${course.instructor?.slug}`} className="text-primary hover:underline">{course.instructor?.full_name}</Link>
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> Updated {formatDate(new Date(course.updated_at), "MMMM yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" /> {course.language}
              </span>
            </div>

            {/* Price Section */}
            <div className="mt-auto pt-4 border-t">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-bold">${courseData.price}</span>
                <span className="text-lg text-muted-foreground line-through">${courseData.originalPrice}</span>
                <Badge variant="secondary" className="text-xs">{courseData.discountPercent}% off</Badge>
              </div>
              <div className="flex gap-1 flex-col md:flex-row">
                <div className="cta flex gap-1 flex-1">
                  <Button className="flex-1" size="lg">Add to Cart</Button>
                  <Button variant="outline" className="flex-1" size="lg">Buy Now</Button>
                </div>
                <div className="flex gap-1 flex-1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <ShareDialog title={courseData.title} description={courseData.subtitle}>
                    <Button variant="outline" size="lg" className="bg-transparent">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </ShareDialog>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 my-3">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{course.total_videos_duration_hours} hours</span>
            </div>
            <div className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4 text-muted-foreground" />
              <span>{course.total_videos} lectures</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{course.level_display}</span>
            </div>
            <div className="flex items-center gap-2">
              <ListCheck className="h-4 w-4 text-muted-foreground" />
              <span>{course.total_quizzes} quizzes</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-muted-foreground" />
              <span>Certificate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* What you'll learn */}
          <div className="border border-border rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="outcome">
                <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
                <div className="flex flex-col gap-4">
                  {course.learning_outcomes?.map((item: { text: string }, index: number) => (
                    <div key={index} className="flex gap-3 items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="requirements">
                <h2 className="text-xl font-bold mb-4">Requirements</h2>
                <div className="flex flex-col gap-4">
                  {course.requirements?.map((req: { text: string }, index: number) => (
                    <div key={index} className="flex gap-3 items-center">
                      <Package className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-muted-foreground">{req.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>



          {/* Course Content */}
          <div className="">
            <h2 className="text-xl font-bold mb-4">Course content</h2>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-sm text-muted-foreground">
              <span>
                {course.sections.length} sections • {course.total_contents} lectures • {course.total_videos_duration_hours} hours
              </span>
              <button
                onClick={expandedSections.length === course.sections.length ? collapseAllSections : expandAllSections}
                className="text-primary hover:underline font-medium"
              >
                {expandedSections.length === course.sections.length ? "Collapse all sections" : "Expand all sections"}
              </button>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              {course.sections.map((section: any, index: number) => (
                <div key={section.id} className={index > 0 ? "border-t border-border" : ""}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="h-4 w-4 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      )}
                      <span className="font-semibold">{section.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {section.contents.length} lectures • {_.sumBy(section.contents, 'duration_minutes')} minutes
                    </span>
                  </button>

                  {expandedSections.includes(section.id) && (
                    <div className="bg-background">
                      {section.contents.map((content: any) => (
                        <div
                          key={content.id}
                          onClick={() => content.is_preview && handlePreview(content)}
                          className={`flex items-center justify-between px-4 py-3 border-t ${content.is_preview ? "hover:bg-muted/30 cursor-pointer" : ""}`}
                        >
                          <div className="flex items-center gap-3">
                            {content.type === "video" ? (
                              <PlayCircle className="h-4 w-4 text-muted-foreground" />
                            ) : content.type === "quiz" ? (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-sm">{content.title}</span>
                            {content.is_preview && (
                              <Badge variant="secondary" className="text-xs">
                                Preview
                              </Badge>
                            )}
                          </div>
                          {!!content.duration_minutes && <span className="text-sm text-muted-foreground">{content.duration_minutes} minutes</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <div
              className={`prose prose-sm max-w-none text-muted-foreground ${!showFullDescription ? "line-clamp-6" : ""}`}
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary hover:underline font-medium mt-2 text-sm"
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          </div>

          {/* Instructor */}
          <div id="instructor">
            <h2 className="text-xl font-bold mb-4">Instructor</h2>
            <div className="space-y-4">
              <Link href="#" className="text-primary hover:underline text-lg font-semibold">
                {course.instructor.full_name}
              </Link>
              <p className="text-sm text-muted-foreground">{course.instructor.title}</p>

              <div className="flex items-center gap-4">
                <Avatar className="h-28 w-28">
                  <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {courseData.instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-foreground" />
                    <span>{course.instructor.average_rating} Instructor Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-foreground" />
                    <span>{course.instructor.total_reviews.toLocaleString()} Reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-foreground" />
                    <span>{courseData.instructor.studentsCount.toLocaleString()} Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-foreground" />
                    <span>{course.instructor.total_courses} Courses</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{course.instructor.bio}</p>
            </div>
          </div>

          <Separator />

          <CourseReviews course={course} />
        </div>
      </div>
      {/* Preview Modal */}
      {previewContent && (
        <ContentPreviewModal
          open={previewModalOpen}
          onOpenChange={setPreviewModalOpen}
          content={{
            title: previewContent.title,
            duration: previewContent.duration,
            type: previewContent.type,
            videoUrl: previewContent.type === "video" ? (previewContent.content?.file || "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4") : undefined,
            articleContent: previewContent.type === "article" ? previewContent.content?.text : undefined,
            quizContent: previewContent.type === "quiz" ? previewContent.content?.description : undefined,
          }}
        />
      )}
    </div>
  )
}
