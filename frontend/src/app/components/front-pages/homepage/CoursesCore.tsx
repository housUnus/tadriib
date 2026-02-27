"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Plus } from "lucide-react";
import { useState } from "react";
import _Carousel from "@/components/common/Carousel";
import { useTranslations } from "next-intl";

const categories = [
  {
    name: "All",
  },
  {
    name: "Development",
  },
  {
    name: "Design",
  },
  {
    name: "Marketing",
  },
  {
    name: "Data Science",
  },
  {
    name: "AI & Machine Learning",
  },
  {
    name: "Cybersecurity",
  },
  {
    name: "Cloud Computing",
  },
];
export default function Core({courses}: {courses: any[]}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const t = useTranslations("home")

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((webinar) => webinar.category === activeCategory);

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
                className={`min-w-[45%] md:min-w-0 group shrink-0 relative h-9 overflow-hidden
                   rounded-full px-2 sm:px-3 leading-none font-semibold text-xs sm:text-sm 
                   flex items-center justify-center transition-transform duration-300 hover:scale-102
                  ${
                    activeCategory === category.name
                      ? `bg-primary text-white shadow-lg scale-105`
                      : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 "
                  }`}
              >
                <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <span className="inline">{category.name}</span>
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
              href="/courses"
              className="rounded-full h-9 px-2 sm:px-3 font-semibold text-xs
               sm:text-sm transition-transform duration-300 hover:scale-102 text-gray-700 border
              border-gray-300 flex items-center justify-center"
            >
              <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
                <span className="hidden sm:inline">12 {t('more')}</span>
                <span className="sm:hidden">+12</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Horizontal Scrollable Courses */}
      <_Carousel items={filteredCourses} />
      {/* View All Button */}
      <div className="text-center mt-6 sm:mt-7 ">
        <Button
          variant="outline"
          size="lg"
        >
          <Link href="/courses" className="flex items-center gap-2">
            {t('viewAllCourses')}
            </Link>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </>
  );
}
        