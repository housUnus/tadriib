"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Plus } from "lucide-react";
import { useState } from "react";
import _Carousel from "@/components/common/Carousel";

const webinars = [
  // Development
  {
    id: 1,
    title: "Advanced React Patterns & Performance",
    instructor: "Sarah Chen",
    date: "2024-01-15",
    time: "2:00 PM EST",
    availablePlaces: 12,
    total_taken: 50,
    price: 89,
    category: "Development",
    categoryColor: "bg-blue-500",
    featured: true,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Master advanced React patterns and optimization techniques",
  },
  {
    id: 2,
    title: "Full-Stack JavaScript Mastery",
    instructor: "Mike Johnson",
    date: "2024-01-30",
    time: "1:00 PM EST",
    availablePlaces: 20,
    total_taken: 60,
    price: 95,
    category: "Development",
    categoryColor: "bg-blue-500",
    featured: false,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Build complete web applications with modern JavaScript",
  },
  // Design
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Marcus Rodriguez",
    date: "2024-01-18",
    time: "10:00 AM EST",
    availablePlaces: 8,
    total_taken: 30,
    price: 65,
    category: "Design",
    categoryColor: "bg-purple-500",
    featured: false,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Learn the core principles of user-centered design",
  },
  {
    id: 4,
    title: "Advanced Figma Techniques",
    instructor: "Anna Kim",
    date: "2024-02-05",
    time: "3:00 PM EST",
    availablePlaces: 15,
    total_taken: 40,
    price: 55,
    category: "Design",
    categoryColor: "bg-purple-500",
    featured: false,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Master professional design workflows in Figma",
  },
  // Marketing
  {
    id: 5,
    title: "Digital Marketing Strategy 2024",
    instructor: "Emma Thompson",
    date: "2024-01-20",
    time: "3:00 PM EST",
    availablePlaces: 25,
    total_taken: 100,
    price: 45,
    category: "Marketing",
    categoryColor: "bg-green-500",
    featured: false,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Stay ahead with the latest digital marketing trends",
  },
  {
    id: 6,
    title: "Social Media Growth Hacking",
    instructor: "David Park",
    date: "2024-02-08",
    time: "2:00 PM EST",
    availablePlaces: 30,
    total_taken: 80,
    price: 39,
    category: "Marketing",
    categoryColor: "bg-green-500",
    featured: false,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Explosive growth strategies for social platforms",
  },
  // Data Science
  {
    id: 7,
    title: "Data Science with Python",
    instructor: "Dr. James Wilson",
    date: "2024-01-22",
    time: "1:00 PM EST",
    availablePlaces: 3,
    total_taken: 40,
    price: 120,
    category: "Data Science",
    categoryColor: "bg-orange-500",
    featured: true,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Dive deep into data analysis and machine learning",
  },
  // AI & Machine Learning
  {
    id: 8,
    title: "ChatGPT & AI Tools for Business",
    instructor: "Dr. Lisa Chang",
    date: "2024-01-25",
    time: "11:00 AM EST",
    availablePlaces: 5,
    total_taken: 35,
    price: 85,
    category: "AI & Machine Learning",
    categoryColor: "bg-indigo-500",
    featured: true,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Leverage AI tools to boost productivity and innovation",
  },
  // Cybersecurity
  {
    id: 9,
    title: "Ethical Hacking Essentials",
    instructor: "Alex Turner",
    date: "2024-02-01",
    time: "6:00 PM EST",
    availablePlaces: 12,
    total_taken: 25,
    price: 135,
    category: "Cybersecurity",
    categoryColor: "bg-red-500",
    featured: false,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Learn penetration testing and security assessment",
  },
  // Cloud Computing
  {
    id: 10,
    title: "AWS Cloud Architecture",
    instructor: "Maria Santos",
    date: "2024-02-03",
    time: "2:00 PM EST",
    availablePlaces: 22,
    total_taken: 45,
    price: 99,
    category: "Cloud Computing",
    categoryColor: "bg-sky-500",
    featured: false,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Design scalable cloud solutions on AWS",
  },
  // Business Strategy
  {
    id: 11,
    title: "Startup Strategy & Growth",
    instructor: "Jennifer Lee",
    date: "2024-02-10",
    time: "12:00 PM EST",
    availablePlaces: 35,
    total_taken: 75,
    price: 75,
    category: "Business Strategy",
    categoryColor: "bg-amber-500",
    featured: false,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Scale your startup from idea to IPO",
  },
  // Leadership
  {
    id: 12,
    title: "Executive Leadership Skills",
    instructor: "Dr. Patricia Davis",
    date: "2024-02-20",
    time: "1:00 PM EST",
    availablePlaces: 15,
    total_taken: 25,
    price: 149,
    category: "Leadership",
    categoryColor: "bg-violet-500",
    featured: true,
    rating: 4.8,
    reviews: 1000,
    duration: "45",
    questions: 80,
    image: "https://placehold.co/600x400",
    description: "Lead high-performing teams and drive results",
  },
];

const categories = [
  {
    name: "Development",
    count: webinars.filter((w) => w.category === "Development").length,
  },
  {
    name: "Design",
    count: webinars.filter((w) => w.category === "Design").length,
  },
  {
    name: "Marketing",
    count: webinars.filter((w) => w.category === "Marketing").length,
  },
  {
    name: "Data Science",
    count: webinars.filter((w) => w.category === "Data Science").length,
  },
  {
    name: "AI & Machine Learning",
    count: webinars.filter((w) => w.category === "AI & Machine Learning")
      .length,
  },
  {
    name: "Cybersecurity",
    count: webinars.filter((w) => w.category === "Cybersecurity").length,
  },
  {
    name: "Cloud Computing",
    count: webinars.filter((w) => w.category === "Cybersecurity").length,
  },
];
Core
export default function Core({}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredWebinars =
    activeCategory === "All"
      ? webinars
      : webinars.filter((webinar) => webinar.category === activeCategory);

  return (
    <>
      {/* Category Filters - Responsive */}
      <div className="mb-2 sm:mb-4">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
          <div className="flex md:justify-center sm:flex-wrap gap-2 sm:gap-3 md:gap-4 overflow-x-auto sm:overflow-x-visible px-2">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`min-w-[45%] md:min-w-0 group flex-shrink-0 relative h-9 overflow-hidden
                   rounded-full px-2 sm:px-3 leading-none font-semibold text-xs sm:text-sm 
                   flex items-center justify-center transition-transform duration-300 hover:scale-102
                  ${
                    activeCategory === category.name
                      ? `bg-primary text-white shadow-lg scale-105`
                      : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 "
                  }`}
              >
                <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">
                    {category.name.length > 8
                      ? category.name.substring(0, 8) + "..."
                      : category.name}
                  </span>
                </div>

                {/* Hover gradient effect */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Active state indicator */}
                {activeCategory === category.name && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full shadow-lg" />
                )}
              </button>
            ))}
            {/* Show More/Less Button */}
            <Link
              href="/webinars"
              className="rounded-full h-9 px-2 sm:px-3 font-semibold text-xs
               sm:text-sm transition-transform duration-300 hover:scale-102 text-gray-700 border
              border-gray-300 flex items-center justify-center"
            >
              <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
                <span className="hidden sm:inline">12 More</span>
                <span className="sm:hidden">+12</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Results counter */}
        <div className="text-center mt-3 sm:mt-5">
          <p className="text-gray-600 text-sm sm:text-base">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredWebinars.length}
            </span>
            {activeCategory === "All"
              ? " quizzes"
              : ` ${activeCategory.toLowerCase()} quizzes`}
          </p>
        </div>
      </div>
      {/* Horizontal Scrollable Webinars */}
      <_Carousel items={filteredWebinars} />
      {/* View All Button */}
      <div className="text-center mt-1 sm:mt-2">
        <Button
          variant="outline"
          size="lg"
          className="bg-white/80 backdrop-blur-sm shadow-none border-0 hover:bg-green-50 text-green-700 font-semibold px-6 sm:px-8 w-full sm:w-auto"
        >
          View All Quizzes
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </>
  );
}
