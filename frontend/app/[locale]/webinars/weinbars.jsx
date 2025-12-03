"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search, SlidersHorizontal, X } from "lucide-react";
import CourseCard from "@/components/common/CourseCard/index";
import { useForm } from "react-hook-form";
import CustomField from "@/components/common/forms/generic/CustomField";
import { FilterSidebar } from "./FilterSidebar";
import { useFilterQuery } from "@/components/common/hooks/useFilterQuery";

const categories = [
  {
    id: "all",
    name: "All Categories",
    color: "bg-gradient-to-r from-blue-600 to-purple-600",
  },
  {
    id: "business",
    name: "Business",
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
  },
  {
    id: "design",
    name: "Design",
    color: "bg-gradient-to-r from-pink-500 to-rose-500",
  },
  {
    id: "marketing",
    name: "Marketing",
    color: "bg-gradient-to-r from-orange-500 to-amber-500",
  },
  {
    id: "tech",
    name: "Technology",
    color: "bg-gradient-to-r from-purple-500 to-indigo-500",
  },
  {
    id: "finance",
    name: "Finance",
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
  {
    id: "health",
    name: "Health",
    color: "bg-gradient-to-r from-teal-500 to-cyan-500",
  },
  {
    id: "personal",
    name: "Personal Development",
    color: "bg-gradient-to-r from-violet-500 to-purple-500",
  },
];

const allWebinars = [
  {
    id: 1,
    title: "Advanced React Patterns & Best Practices 2024",
    instructor: "Sarah Johnson",
    date: "2024-01-15",
    time: "2:00 PM EST",
    availablePlaces: 5,
    totalPlaces: 50,
    price: 79,
    category: "Technology",
    categoryColor: "bg-gradient-to-r from-purple-500 to-indigo-500",
    featured: true,
    rating: 4.8,
    students: 1250,
    duration: "2 hours",
    level: "Advanced",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Master advanced React patterns and modern best practices",
  },
  {
    id: 2,
    title: "Digital Marketing Strategy Masterclass",
    instructor: "Michael Chen",
    date: "2024-01-16",
    time: "3:00 PM EST",
    availablePlaces: 15,
    totalPlaces: 40,
    price: 0,
    category: "Marketing",
    categoryColor: "bg-gradient-to-r from-orange-500 to-amber-500",
    featured: false,
    rating: 4.6,
    students: 890,
    duration: "1.5 hours",
    level: "Intermediate",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Learn proven digital marketing strategies for 2024",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals Workshop",
    instructor: "Emily Rodriguez",
    date: "2024-01-17",
    time: "1:00 PM EST",
    availablePlaces: 8,
    totalPlaces: 30,
    price: 49,
    category: "Design",
    categoryColor: "bg-gradient-to-r from-pink-500 to-rose-500",
    featured: true,
    rating: 4.9,
    students: 2100,
    duration: "3 hours",
    level: "Beginner",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Complete guide to modern UI/UX design principles",
  },
  {
    id: 4,
    title: "Financial Planning for Entrepreneurs",
    instructor: "David Park",
    date: "2024-01-18",
    time: "4:00 PM EST",
    availablePlaces: 20,
    totalPlaces: 60,
    price: 59,
    category: "Finance",
    categoryColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    featured: false,
    rating: 4.7,
    students: 650,
    duration: "2 hours",
    level: "Intermediate",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Master financial planning for your business",
  },
  {
    id: 5,
    title: "Leadership & Team Management Excellence",
    instructor: "Jennifer Lee",
    date: "2024-01-19",
    time: "2:30 PM EST",
    availablePlaces: 12,
    totalPlaces: 45,
    price: 89,
    category: "Business",
    categoryColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    featured: true,
    rating: 4.9,
    students: 1800,
    duration: "2.5 hours",
    level: "Advanced",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Develop leadership skills for modern teams",
  },
  {
    id: 6,
    title: "Mindfulness & Stress Management",
    instructor: "Dr. Amanda White",
    date: "2024-01-20",
    time: "11:00 AM EST",
    availablePlaces: 25,
    totalPlaces: 50,
    price: 0,
    category: "Health",
    categoryColor: "bg-gradient-to-r from-teal-500 to-cyan-500",
    featured: false,
    rating: 4.8,
    students: 3200,
    duration: "1 hour",
    level: "Beginner",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Learn effective stress management techniques",
  },
  {
    id: 7,
    title: "Personal Branding in the Digital Age",
    instructor: "Marcus Thompson",
    date: "2024-01-21",
    time: "5:00 PM EST",
    availablePlaces: 18,
    totalPlaces: 35,
    price: 39,
    category: "Personal Development",
    categoryColor: "bg-gradient-to-r from-violet-500 to-purple-500",
    featured: false,
    rating: 4.5,
    students: 980,
    duration: "1.5 hours",
    level: "Beginner",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Build a powerful personal brand online",
  },
  {
    id: 8,
    title: "Data Analytics with Python & Pandas",
    instructor: "Robert Kim",
    date: "2024-01-22",
    time: "3:30 PM EST",
    availablePlaces: 10,
    totalPlaces: 40,
    price: 69,
    category: "Technology",
    categoryColor: "bg-gradient-to-r from-purple-500 to-indigo-500",
    featured: true,
    rating: 4.7,
    students: 1500,
    duration: "3 hours",
    level: "Intermediate",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Master data analysis with Python",
  },
  {
    id: 9,
    title: "Content Marketing That Converts",
    instructor: "Lisa Garcia",
    date: "2024-01-23",
    time: "1:30 PM EST",
    availablePlaces: 22,
    totalPlaces: 50,
    price: 45,
    category: "Marketing",
    categoryColor: "bg-gradient-to-r from-orange-500 to-amber-500",
    featured: false,
    rating: 4.6,
    students: 1100,
    duration: "2 hours",
    level: "Intermediate",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Create content that drives conversions",
  },
  {
    id: 10,
    title: "Graphic Design Essentials for Beginners",
    instructor: "Chris Martinez",
    date: "2024-01-24",
    time: "10:00 AM EST",
    availablePlaces: 30,
    totalPlaces: 55,
    price: 0,
    category: "Design",
    categoryColor: "bg-gradient-to-r from-pink-500 to-rose-500",
    featured: false,
    rating: 4.8,
    students: 2500,
    duration: "2 hours",
    level: "Beginner",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Learn graphic design fundamentals",
  },
  {
    id: 11,
    title: "Investment Strategies for 2024",
    instructor: "Andrew Wilson",
    date: "2024-01-25",
    time: "6:00 PM EST",
    availablePlaces: 15,
    totalPlaces: 40,
    price: 99,
    category: "Finance",
    categoryColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    featured: true,
    rating: 4.9,
    students: 1750,
    duration: "2.5 hours",
    level: "Advanced",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Advanced investment strategies and tactics",
  },
  {
    id: 12,
    title: "Startup Business Plan Workshop",
    instructor: "Rachel Brown",
    date: "2024-01-26",
    time: "2:00 PM EST",
    availablePlaces: 8,
    totalPlaces: 25,
    price: 59,
    category: "Business",
    categoryColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
    featured: false,
    rating: 4.7,
    students: 820,
    duration: "3 hours",
    level: "Beginner",
    language: "English",
    image: "/placeholder.svg?height=200&width=400",
    description: "Create a winning business plan for your startup",
  },
];

export default function Webinars() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const form = useForm({
    defaultValues: {
      priceRange: [50, 150],
    },
  });



  // Filter webinars
  const filteredWebinars = allWebinars;

  const activeFiltersCount = true;

  const clearAllFilters = () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>All Webinars</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          All Webinars
        </h1>
        <p className="text-gray-600 mb-6">
          Choose from {allWebinars.length} online video webinars with new
          additions published every month
        </p>

        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-6 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? `${category.color} text-white border-0`
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                <FilterSidebar form={form} />
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    name="search"
                    placeholder="Search for anything"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-300"
                  />
                </div>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden bg-transparent"
                    >
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      Filters
                      {activeFiltersCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {activeFiltersCount}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <div className="w-full sm:w-[300px]">
                  <CustomField
                    control={form.control}
                    name={`sortBy`}
                    Component={({ target, value, onChange, ...props }) => (
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger className=" bg-gray-50 border-gray-300">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">
                            Most Relevant
                          </SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="price-low">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="price-high">
                            Price: High to Low
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {showFreeOnly && (
                  <Badge variant="secondary" className="px-3 py-1">
                    Free
                    <X
                      className="w-3 h-3 ml-2 cursor-pointer"
                      onClick={() => setShowFreeOnly(false)}
                    />
                  </Badge>
                )}
                {selectedRatings.map((rating) => (
                  <Badge key={rating} variant="secondary" className="px-3 py-1">
                    {rating}+ stars
                    <X
                      className="w-3 h-3 ml-2 cursor-pointer"
                      onClick={() =>
                        setSelectedRatings(
                          selectedRatings.filter((r) => r !== rating)
                        )
                      }
                    />
                  </Badge>
                ))}
                {selectedLevels.map((level) => (
                  <Badge key={level} variant="secondary" className="px-3 py-1">
                    {level}
                    <X
                      className="w-3 h-3 ml-2 cursor-pointer"
                      onClick={() =>
                        setSelectedLevels(
                          selectedLevels.filter((l) => l !== level)
                        )
                      }
                    />
                  </Badge>
                ))}
                {selectedDurations.map((duration) => (
                  <Badge
                    key={duration}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    {duration === "short"
                      ? "0-2 hours"
                      : duration === "medium"
                      ? "2-3 hours"
                      : "3+ hours"}
                    <X
                      className="w-3 h-3 ml-2 cursor-pointer"
                      onClick={() =>
                        setSelectedDurations(
                          selectedDurations.filter((d) => d !== duration)
                        )
                      }
                    />
                  </Badge>
                ))}
              </div>
            )}

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-bold">{filteredWebinars.length}</span>{" "}
                results
              </p>
            </div>

            {/* Webinars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredWebinars.map((webinar) => (
                <CourseCard key={webinar.id} item={webinar} />
              ))}
            </div>

            {/* No Results */}
            {filteredWebinars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No webinars found matching your criteria.
                </p>
                <Button onClick={clearAllFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
