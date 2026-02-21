"use client";

import TablePageSize from "./page-size";

import React from "react";

import Image from "next/image";
import {
    IconChevronLeft,
    IconChevronRight,
    IconChevronsLeft,
    IconChevronsRight,
    IconDots,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const component = (dt: any) => {

}
export default function TablePagination({ dt }: { dt: any }) {
    return (
        <div className="sm:flex justify-between gap-2">
            <div className="flex items-center gap-2">
                <div className="flex items-center">
                    <h2 className="text-ld pe-1">Page</h2>
                    <h2 className="font-semibold text-ld">
                        {dt.pageIndex + 1} of{" "}
                        {dt.pageCount}
                    </h2>
                </div>
                <TablePageSize dt={dt} />
            </div>

            <div className="flex gap-2 sm:mt-0 mt-3">
                <Button
                    onClick={() => dt.table.setPageIndex(0)}
                    disabled={!dt.table.getCanPreviousPage()}
                    className="bg-lightgray dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary disabled:opacity-50"
                >
                    <IconChevronsLeft className="text-ld" size={20} />
                </Button>
                <Button
                    onClick={() => dt.table.previousPage()}
                    disabled={!dt.table.getCanPreviousPage()}
                    className="bg-lightgray dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary disabled:opacity-50"
                >
                    <IconChevronLeft className="text-ld" size={20} />
                </Button>
                <Button
                    onClick={() => dt.table.nextPage()}
                    disabled={!dt.table.getCanNextPage()}
                    className="bg-lightgray dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary disabled:opacity-50"
                >
                    <IconChevronRight className="text-ld" size={20} />
                </Button>
                <Button
                    onClick={() => dt.table.setPageIndex(dt.table.getPageCount() - 1)}
                    disabled={!dt.table.getCanNextPage()}
                    className="bg-lightgray dark:bg-dark hover:bg-lightprimary dark:hover:bg-lightprimary disabled:opacity-50"
                >
                    <IconChevronsRight className="text-ld" size={20} />
                </Button>
            </div>
        </div>
    )
}