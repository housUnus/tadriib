'use client'
import React from "react";
import { useDataTable } from "@/hooks/use-data-table";
import TableSearch from "@/components/common/DataTable/table-search";
import TableContent from "@/components/common/DataTable/table-content";
import TablePagination from "@/components/common/DataTable/table-pagination";
import CourseCard from "@/components/common/CourseCard/course-taken";

const Enrollments = ({ enrollments }: { enrollments: any[] }) => {
  const dt = useDataTable({
    columns: [],
    initialData: enrollments || [],
    url: `/enrollments/`,
  })

  return (
    <>
      <TableSearch dt={dt} />
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
    </>
  );
};

export default Enrollments;
