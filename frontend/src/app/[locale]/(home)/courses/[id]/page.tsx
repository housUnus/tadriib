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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Mock course data
const courseData = {
  id: "1",
  title: "Complete Web Development Bootcamp 2025",
  subtitle:
    "Become a full-stack web developer with just one course. HTML, CSS, JavaScript, Node, React, MongoDB, and more!",
  rating: 4.7,
  ratingsCount: 234567,
  studentsCount: 892341,
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
        { id: "4", title: "Course Resources", type: "article", duration: "5 min read", isPreview: false },
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

export default function CourseDetailPage() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["1"])
  const [showFullDescription, setShowFullDescription] = useState(false)

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    )
  }

  const expandAllSections = () => {
    setExpandedSections(courseData.sections.map((s) => s.id))
  }

  const collapseAllSections = () => {
    setExpandedSections([])
  }

  const totalLectures = courseData.sections.reduce((acc, s) => acc + s.lectures, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-[#1c1d1f] text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8 p-5">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={'primary'}>Bestseller</Badge>
                <Badge variant="outline" className="border-neutral-600 text-neutral-300">
                  Updated {courseData.lastUpdated}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold leading-tight text-balance text-primary-foreground">{courseData.title}</h1>

              <p className="text-lg text-neutral-300 leading-relaxed">{courseData.subtitle}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-[#f3ca8c] font-bold">{courseData.rating}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(courseData.rating) ? "fill-[#f3ca8c] text-[#f3ca8c]" : "text-neutral-600"}`}
                      />
                    ))}
                  </div>
                  <span className="text-[#cec0fc] underline cursor-pointer hover:text-[#a48ee8]">
                    ({courseData.ratingsCount.toLocaleString()} ratings)
                  </span>
                </div>
                <span className="text-neutral-400">{courseData.studentsCount.toLocaleString()} students</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-300">
                <span>
                  Created by{" "}
                  <Link href="#instructor" className="text-[#cec0fc] underline hover:text-[#a48ee8]">
                    {courseData.instructor.name}
                  </Link>
                </span>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {courseData.language}
                </div>
              </div>
            </div>

            {/* Sticky Card - Hidden on mobile, shown in sidebar on large screens */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {courseData.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div>
              <h2 className="text-xl font-bold mb-4">Course content</h2>
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 text-sm text-muted-foreground">
                <span>
                  {courseData.sections.length} sections • {totalLectures} lectures • {courseData.duration}
                </span>
                <button
                  onClick={expandedSections.length === courseData.sections.length ? collapseAllSections : expandAllSections}
                  className="text-primary hover:underline font-medium"
                >
                  {expandedSections.length === courseData.sections.length ? "Collapse all sections" : "Expand all sections"}
                </button>
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                {courseData.sections.map((section, index) => (
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
                        {section.lectures} lectures • {section.duration}
                      </span>
                    </button>

                    {expandedSections.includes(section.id) && (
                      <div className="bg-background">
                        {section.contents.map((content) => (
                          <div
                            key={content.id}
                            className="flex items-center justify-between px-4 py-3 border-t border-border/50 hover:bg-muted/30 transition-colors"
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
                              {content.isPreview && (
                                <Badge variant="secondary" className="text-xs">
                                  Preview
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">{content.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {courseData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-foreground">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <div
                className={`prose prose-sm max-w-none text-muted-foreground ${!showFullDescription ? "line-clamp-6" : ""}`}
                dangerouslySetInnerHTML={{ __html: courseData.description }}
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
                  {courseData.instructor.name}
                </Link>
                <p className="text-sm text-muted-foreground">{courseData.instructor.title}</p>

                <div className="flex items-start gap-4">
                  <Avatar className="h-28 w-28">
                    <AvatarImage src={courseData.instructor.avatar || "/placeholder.svg"} />
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
                      <span>{courseData.instructor.rating} Instructor Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-foreground" />
                      <span>{courseData.instructor.reviewsCount.toLocaleString()} Reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-foreground" />
                      <span>{courseData.instructor.studentsCount.toLocaleString()} Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-foreground" />
                      <span>{courseData.instructor.coursesCount} Courses</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{courseData.instructor.bio}</p>
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-bold mb-6">Student feedback</h2>

              <div className="grid md:grid-cols-[auto_1fr] gap-8 mb-8">
                <div className="text-center">
                  <div className="text-5xl font-bold text-[#b4690e]">{courseData.rating}</div>
                  <div className="flex justify-center my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(courseData.rating) ? "fill-[#b4690e] text-[#b4690e]" : "text-neutral-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Course Rating</div>
                </div>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <div key={stars} className="flex items-center gap-3">
                      <Progress
                        value={courseData.ratingDistribution[stars as keyof typeof courseData.ratingDistribution]}
                        className="h-2 flex-1"
                      />
                      <div className="flex items-center gap-1 w-24">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < stars ? "fill-[#b4690e] text-[#b4690e]" : "text-neutral-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground w-10">
                        {courseData.ratingDistribution[stars as keyof typeof courseData.ratingDistribution]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {courseData.reviews.map((review) => (
                  <div key={review.id} className="border-t border-border pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{review.user}</span>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-[#b4690e] text-[#b4690e]" : "text-neutral-300"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="mt-6 bg-transparent">
                See all reviews
              </Button>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-4 space-y-4">
              {/* Course Card */}
              <div className="border border-border rounded-lg overflow-hidden bg-card shadow-lg">
                <div className="relative aspect-video bg-neutral-900">
                  <Image
                    src={courseData.thumbnail || "/placeholder.svg"}
                    alt={courseData.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <button className="flex items-center gap-2 text-white hover:scale-105 transition-transform">
                      <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="h-8 w-8 text-black fill-black ml-1" />
                      </div>
                    </button>
                  </div>
                  <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
                    Preview this course
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${courseData.price}</span>
                    <span className="text-lg text-muted-foreground line-through">${courseData.originalPrice}</span>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                      {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% off
                    </Badge>
                  </div>

                  <div className="text-sm text-destructive font-medium">
                    2 days left at this price!
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      Add to cart
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      Buy now
                    </Button>
                  </div>

                  <p className="text-center text-xs text-muted-foreground">
                    30-Day Money-Back Guarantee
                  </p>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-3">This course includes:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <Play className="h-4 w-4" />
                        {courseData.duration} on-demand video
                      </li>
                      <li className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        42 articles
                      </li>
                      <li className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        85 downloadable resources
                      </li>
                      <li className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        Access on mobile and TV
                      </li>
                      <li className="flex items-center gap-2">
                        <Infinity className="h-4 w-4" />
                        Full lifetime access
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="h-4 w-4" />
                        Certificate of completion
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-sm">
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Heart className="h-4 w-4" />
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="border border-border rounded-lg p-4 bg-card">
                <h3 className="font-semibold mb-3">Course Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{courseData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PlayCircle className="h-4 w-4 text-muted-foreground" />
                    <span>{totalLectures} lectures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    <span>{courseData.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>{courseData.language}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
