"use client";
import { useCountUp } from "@/components/common/hooks/useCountUp";
import { Card, CardContent } from "@/components/ui/card"
import {
  Star,
  Users,
  Award,
  Globe,
  CheckCircle,
} from "lucide-react"

const stats = [
  {
    number: 150000,
    label: "Programs Completed",
    suffix: "+",
    icon: Users,
    color: "from-green-700 to-green-700",
  },
  {
    number: 98,
    label: "Active Learners",
    suffix: "%",
    icon: Star,
    color: "from-amber-500 to-amber-500",
  },
  {
    number: 2500,
    label: "Success Rate",
    suffix: "+",
    icon: Award,
    color: "from-green-700 to-green-700",
  },
  {
    number: 50,
    label: "Training Hours",
    suffix: "+",
    icon: Globe,
    color: "from-amber-500 to-amber-500",
  },
]

export function AnimatedCounter({ value }) {
  const count = useCountUp(value, 5000); 
  return <span>{count.toLocaleString()}</span>;
}

export default function SocialProof() {
  return (
    <section className="py-10 px-4 bg-gradient-to-bl from-white via-green-600/5 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-start mb-6 px-1 md:px-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="w-4 h-4" />
            Trusted by Industry Leaders
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Join150,000+ Professionals
          </h2>
          <p className="text-base text-gray-600 max-w-3xl">
            Join millions of learners worldwide who are transforming their careers through our platform
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-1 px-1 md:px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card
                  key={index}
                  className="py-3 md:py-6 group bg-secondary border-0 shadow-none"
                >
                  <CardContent className="p-2 text-center">
                    <div
                      className={`w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-4 bg-gradient-to-r bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-green-400`}
                    >
                      <Icon className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div className="text-xl md:text-3xl font-bold text-primary mb-2">
                      <AnimatedCounter value={stat.number} />
                    </div>
                    <p className="text-gray-900 font-normal text-sm md:text-md">{stat.label}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
