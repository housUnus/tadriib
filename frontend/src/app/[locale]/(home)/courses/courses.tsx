"use client";

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

export default function Courses({courses}: {courses: any[]}) {
    const dt = useDataTable({
        columns: [],
        url: `/courses/`,
        initialData: courses,
    })

    const form = useForm({
        defaultValues: {},
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
