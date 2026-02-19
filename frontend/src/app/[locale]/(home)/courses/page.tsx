"use client";

import { Button } from "@/components/ui/button";
import CourseCard from "@/components/common/CourseCard/index";
import { useForm } from "react-hook-form";
import ActiveFilters from "@/components/common/SidebarFilter/active-filters";
import DesktopFilters from "@/components/common/SidebarFilter/desktop";
import MobileFilter from "@/components/common/SidebarFilter/mobile";
import FiltersHeader from "@/components/common/SidebarFilter/header";
import { RHFForm } from "@/components/common/forms/RHFForm";
import { useDataTable } from "@/hooks/use-data-table";
import { useEffect } from "react";
import TableContent from "@/components/common/DataTable/table-content";
import TablePagination from "@/components/common/DataTable/table-pagination";

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

    const dt = useDataTable({
        columns: [],
        url: `/courses/`,
    })
    console.log("🚀 ~ Webinars ~ dt data:", dt.rows)

    const form = useForm({
        defaultValues: {
        },
    });

    useEffect(() => {
        const subscription = form.watch((values) => {
            const columnFilters = Object.entries(values)
                .filter(([, value]) => value !== undefined && value !== "")
                .map(([id, value]) => ({ id, value }));
            dt.setColumnFilters(columnFilters);
        });

        return () => subscription.unsubscribe();
    }, [form, dt]);

    const values = form.watch();
    console.log("🚀 ~ Webinars ~ values:", values);

    // Filter webinars
    const filteredWebinars = allWebinars;

    const clearAllFilters = () => { };

    return (
        <div className="min-h-screen bg-gray-50 pt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                <RHFForm form={form} className="mt-2">
                    {/* Main Content */}
                    <div className="flex gap-8">
                        {/* Desktop Filters Sidebar */}
                        <DesktopFilters values={values} form={form} />

                        {/* Main Content Area */}
                        <div className="flex-1">
                            <FiltersHeader form={form} totalResults={dt.rows?.length}/>
                            <MobileFilter values={values} form={form} />

                            {/* Active Filters */}
                            <ActiveFilters values={values} form={form} />
                            {/* Webinars Grid */}
                            <div className="">
                                <div className="space-y-0 divide-y grid md:grid-cols-3 gap-6 mb-4">
                                    <TableContent dt={dt}
                                        renderRow={(course) =>
                                        (
                                            <div className="shadow-sm" key={course.slug}>
                                                <CourseCard item={course} />
                                            </div>
                                        )
                                        }
                                    />
                                </div>
                                <TablePagination dt={dt} />
                            </div>

                        </div>
                    </div>
                </RHFForm>
            </div>
        </div>
    );
}
