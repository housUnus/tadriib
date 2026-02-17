import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Globe,
  Award,
  Clock,
  ExternalLink,
  ChevronRight,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Play,
  Users,
  MessageCircle,
  BookOpen,
  Linkedin,
  Github,
} from "lucide-react"
import { ShareDialog } from "@/components/common/share-dialog"
import { useServerFetch } from "@/hooks/auth/user-server-fetch";
import { formatDate } from "date-fns"



const instructorData = {
  id: "alex-chen",
  name: "Alex Chen",
  title: "Senior Full Stack Developer & Course Creator",
  tagline: "Helping developers build better software, one course at a time.",
  avatar: "/placeholder.svg?height=200&width=200",
  location: "San Francisco, CA",
  joinedDate: "March 2018",
  website: "https://alexchen.dev",
  rating: 4.9,
  totalReviews: 98234,
  totalStudents: 980000,
  totalCourses: 8,
  totalHours: 152,
  bio: [
    "I'm a full-stack developer with over 12 years of experience building web applications at companies like Google, Stripe, and several startups. I discovered my passion for teaching when I started mentoring junior developers at work and realized I could reach far more people through online education.",
    "My teaching philosophy is simple: complex topics don't need complex explanations. I believe in learning by doing, which is why every one of my courses is packed with hands-on projects and real-world examples. I don't just teach syntax; I teach you how to think like a developer.",
    "When I'm not coding or creating courses, you'll find me hiking in the Bay Area, contributing to open-source projects, or speaking at developer conferences.",
  ],
  specialties: ["React", "Next.js", "TypeScript", "Node.js", "System Design", "GraphQL"],
  experience: [
    { role: "Lead Engineer", company: "Stripe", period: "2020 - Present" },
    { role: "Senior Developer", company: "Google", period: "2016 - 2020" },
    { role: "Full Stack Developer", company: "Airbnb", period: "2013 - 2016" },
  ],
  social: {
    twitter: "https://twitter.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    github: "https://github.com/alexchen",
  },
  courses: [
    {
      id: "2",
      title: "React - The Complete Guide 2025",
      thumbnail: "/placeholder.svg?height=180&width=320",
      rating: 4.8,
      ratingsCount: 189432,
      studentsCount: 756234,
      price: 79.99,
      originalPrice: 149.99,
      duration: "48 hours",
      lectures: 423,
      level: "All Levels",
      isBestseller: true,
      updatedAt: "January 2025",
    },
    {
      id: "next-complete",
      title: "Next.js 15 - The Full Stack Framework",
      thumbnail: "/placeholder.svg?height=180&width=320",
      rating: 4.7,
      ratingsCount: 54210,
      studentsCount: 187432,
      price: 84.99,
      originalPrice: 159.99,
      duration: "36 hours",
      lectures: 312,
      level: "Intermediate",
      isBestseller: true,
      updatedAt: "December 2024",
    },
    {
      id: "typescript-masterclass",
      title: "TypeScript Masterclass: From Zero to Hero",
      thumbnail: "/placeholder.svg?height=180&width=320",
      rating: 4.9,
      ratingsCount: 42180,
      studentsCount: 134500,
      price: 69.99,
      originalPrice: 129.99,
      duration: "28 hours",
      lectures: 245,
      level: "All Levels",
      isBestseller: false,
      updatedAt: "November 2024",
    },
    {
      id: "node-api",
      title: "Node.js API Development: REST & GraphQL",
      thumbnail: "/placeholder.svg?height=180&width=320",
      rating: 4.6,
      ratingsCount: 28760,
      studentsCount: 98200,
      price: 59.99,
      originalPrice: 109.99,
      duration: "22 hours",
      lectures: 198,
      level: "Intermediate",
      isBestseller: false,
      updatedAt: "October 2024",
    },
    {
      id: "system-design",
      title: "System Design for Frontend Engineers",
      thumbnail: "/placeholder.svg?height=180&width=320",
      rating: 4.8,
      ratingsCount: 15420,
      studentsCount: 45600,
      price: 89.99,
      originalPrice: 169.99,
      duration: "18 hours",
      lectures: 156,
      level: "Advanced",
      isBestseller: false,
      updatedAt: "September 2024",
    },
  ],
  featuredReviews: [
    { id: "1", user: "Jennifer L.", avatar: "/placeholder.svg", rating: 5, date: "1 week ago", comment: "Alex is hands-down the best instructor I have come across. His ability to break down complex topics is unmatched.", course: "React - The Complete Guide 2025" },
    { id: "2", user: "David M.", avatar: "/placeholder.svg", rating: 5, date: "3 weeks ago", comment: "I have taken 4 of Alex's courses now and every single one has been fantastic. He truly cares about his students' learning.", course: "TypeScript Masterclass" },
    { id: "3", user: "Sarah K.", avatar: "/placeholder.svg", rating: 5, date: "1 month ago", comment: "The projects in this course helped me land my first developer job. Cannot recommend Alex enough.", course: "Next.js 15 - The Full Stack Framework" },
  ],
  ratingDistribution: { 5: 85, 4: 10, 3: 3, 2: 1, 1: 1 },
}

function formatCount(count: number) {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(0)}K`
  return count.toString()
}


export default async function InstructorPage({ params }: { params: { id: string, locale: string } }) {
  const resolvedParams = await params

  const client = await useServerFetch();
  const res = await client.get(`/instructors/${resolvedParams.id}/`);
  const user = res?.data || {}

  return (
    <div>
      <nav className="flex items-center justify-center gap-1 mb-6">
        <h2 className="text-primary text-xl font-semibold">
          Instructor
        </h2>
      </nav>
      {/* Profile Card */}
      <div className="border rounded-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row gap-6">
          <Avatar className="h-28 w-28 shrink-0 self-center sm:self-start">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-3xl bg-secondary text-secondary-foreground">
              {user.first_name?.charAt(0) + user.last_name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h1 className="text-2xl font-bold">{user.full_name}</h1>
            <p className="text-muted-foreground mt-1">{user.title}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 mt-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {user.country}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                Joined {formatDate(new Date(user.date_joined), "MMMM yyyy")}
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2 mt-4">
              {user.linkedin_id && (
                <a
                  href={`https://www.linkedin.com/in/${user.linkedin_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {user.github_id && (
                <a
                  href={`https://github.com/${user.github_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  title="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              <ShareDialog title={`Check out ${user.full_name}`} description={user.bio}>
                <button className="h-8 w-8 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </ShareDialog>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border mt-6 rounded-lg overflow-hidden border">
          <div className="bg-background flex flex-col items-center py-4 px-2">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400 mb-1.5" />
            <span className="text-lg font-bold">{user.average_rating}</span>
            <span className="text-xs text-muted-foreground">Rating</span>
          </div>
          <div className="bg-background flex flex-col items-center py-4 px-2">
            <MessageCircle className="h-4 w-4 text-muted-foreground mb-1.5" />
            <span className="text-lg font-bold">{formatCount(user.total_reviews)}</span>
            <span className="text-xs text-muted-foreground">Reviews</span>
          </div>
          <div className="bg-background flex flex-col items-center py-4 px-2">
            <Users className="h-4 w-4 text-muted-foreground mb-1.5" />
            <span className="text-lg font-bold">{formatCount(user.total_students || 0)}</span>
            <span className="text-xs text-muted-foreground">Students</span>
          </div>
          <div className="bg-background flex flex-col items-center py-4 px-2">
            <BookOpen className="h-4 w-4 text-muted-foreground mb-1.5" />
            <span className="text-lg font-bold">{user.total_courses}</span>
            <span className="text-xs text-muted-foreground">Courses</span>
          </div>
          {/* <div className="bg-background flex flex-col items-center py-4 px-2 col-span-2 sm:col-span-1">
            <Clock className="h-4 w-4 text-muted-foreground mb-1.5" />
            <span className="text-lg font-bold">{user.total_hours}h</span>
            <span className="text-xs text-muted-foreground">Content</span>
          </div> */}
        </div>
      </div>

      {/* About Me */}
      <section className="mt-5">
        <h2 className="text-xl font-bold mb-4">About me</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          {instructorData.bio}
        </div>

        {/* Specialties */}
        {/* <div className="flex flex-wrap gap-2 mt-6">
          {instructorData.specialties.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm py-1 px-3 font-normal">
              {skill}
            </Badge>
          ))}
        </div> */}
      </section>

      {/* Courses */}
      {user.total_courses > 0 &&
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">My courses ({user.total_courses})</h2>
          </div>
        </section>
      }
    </div>
  )
}
