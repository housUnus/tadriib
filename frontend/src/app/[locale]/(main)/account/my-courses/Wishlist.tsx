'use client'

import React from "react";
import { useDataTable } from "@/hooks/use-data-table";
import TableSearch from "@/components/common/DataTable/table-search";
import TableContent from "@/components/common/DataTable/table-content";
import TablePagination from "@/components/common/DataTable/table-pagination";
import CourseCard from "@/components/common/CourseCard";
import TableDataLoading from "@/components/common/DataTable/data-loading";

const Wishlist = () => {
  const dt = useDataTable({
    columns: [],
    url: `/wishlist/`,
  })

  return (
    <>
      <TableSearch dt={dt} />
      <TableDataLoading dt={dt} />
      <div className="space-y-0 divide-y grid md:grid-cols-3 gap-6 mb-4 w-full">
        <TableContent dt={dt}
          renderRow={(wishlist_item) =>
          (
            <div className="shadow-sm" key={wishlist_item.id}>
              <CourseCard item={wishlist_item.course} />
            </div>
          )
          }
        />
      </div>
      <TablePagination dt={dt} />
    </>
  );
};

export default Wishlist;
