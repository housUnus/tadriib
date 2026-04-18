'use client'
import React from "react";
import { useDataTable } from "@/hooks/use-data-table";
import TableSearch from "@/components/common/DataTable/table-search";
import TableContent from "@/components/common/DataTable/table-content";
import TablePagination from "@/components/common/DataTable/table-pagination";
import { CourseCreateCard } from "@/components/common/CourseCard/course-create";

const Courses = ({ courses }: { courses: any[] }) => {
  const dt = useDataTable({
    columns: [],
    initialData: courses || [],
    url: `/course-create/`,
  })

  return (
    <>
      <TableSearch dt={dt} />
      <div className="space-y-0 divide-y grid md:grid-cols-3 gap-6 my-8">
        <TableContent dt={dt}
          renderRow={(course) =>
            <CourseCreateCard course={course} key={course.id} />
          }
        />
      </div>
      <TablePagination dt={dt} />
    </>
  );
};

export default Courses;
