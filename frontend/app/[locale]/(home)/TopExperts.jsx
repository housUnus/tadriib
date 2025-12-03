"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ExpertCard from "@/components/common/ExpertCard";
import _Carousel from "@/components/common/Carousel";
const featuredExperts = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "AI Research Scientist",
    company: "Former Google AI",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 247,
    rate: 85,
    specialties: ["Machine Learning", "Deep Learning", "Python"],
    available: true,
    responseTime: "< 2 hours",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    title: "Senior UX Designer",
    company: "Former Apple Design",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5.0,
    reviews: 189,
    rate: 65,
    specialties: ["UI/UX Design", "Figma", "Design Systems"],
    available: true,
    responseTime: "< 1 hour",
  },
  {
    id: 3,
    name: "Jennifer Kim",
    title: "Marketing Director",
    company: "Former Meta",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviews: 312,
    rate: 75,
    specialties: ["Digital Marketing", "Growth Hacking", "Analytics"],
    available: false,
    responseTime: "< 4 hours",
  },
  {
    id: 3,
    name: "Jennifer Kim",
    title: "Marketing Director",
    company: "Former Meta",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviews: 312,
    rate: 75,
    specialties: ["Digital Marketing", "Growth Hacking", "Analytics"],
    available: false,
    responseTime: "< 4 hours",
  },
];

export default function TopExperts() {
  return (
    <div>
      {/* Featured Experts */}
      <div className="mb-3">
        <_Carousel
          items={featuredExperts}
          Component={ExpertCard}
          contentClassName="-ml-0 sm:-ml-0 md:-ml-4 py-10"
          ItemClassName="basis-[98%] sm:basis-[55%] md:basis-[33%] md:pl-4 pl-2"
        />
      </div>

      {/* Browse All Experts Button */}
      <div className="text-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-transform duration-300 group"
        >
          Browse All Experts
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}
