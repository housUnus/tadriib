import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, PlayCircle, BookOpen, ArrowRight } from "lucide-react"
import { LectureCard } from "../components/lecture-card"

// Mock lecture data - in real app, this would come from API/session
const lectureData: any = {
  id: "lec-001",
  title: "Advanced React Patterns & Performance Optimization",
  instructor: "Dr. Sarah Chen",
  date: "March 28, 2026",
  duration: "2 hours",
  price: 49.99,
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-12">
        {/* Success Icon & Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Payment Successful</h1>
          <p className="text-muted-foreground mt-2">
            Thank you for your purchase! You now have access to this lecture.
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-6 border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Order #12345</span>
              <span className="text-sm font-medium text-emerald-500">Confirmed</span>
            </div>
            <LectureCard lecture={lectureData} />
            <div className="mt-4 pt-4 border-t border-border flex justify-between">
              <span className="text-sm text-muted-foreground">Amount paid</span>
              <span className="font-semibold">${lectureData.price.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button asChild size="lg" className="w-full">
            <Link href="/lecture">
              <PlayCircle className="h-4 w-4 mr-2" />
              Go to Lecture
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="w-full">
            <Link href="/courses">
              <BookOpen className="h-4 w-4 mr-2" />
              View My Courses
            </Link>
          </Button>
        </div>

        {/* Help text */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          A confirmation email has been sent to your registered email address.
          <br />
          Questions?{" "}
          <Link href="/support" className="underline hover:text-foreground">
            Contact support
          </Link>
        </p>
      </div>
    </main>
  )
}
