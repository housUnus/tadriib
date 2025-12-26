"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { IconDots } from "@tabler/icons-react";

// SHADCN COMPONENTS
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { hoverTableData } from "../tableData";

const HoverableTable = () => {
    const tableActionData = [
        {
            icon: "tabler:plus",
            listtitle: "Add",
        },
        {
            icon: "tabler:edit",
            listtitle: "Edit",
        },
        {
            icon: "tabler:trash",
            listtitle: "Delete",
        },
    ];

    return (
        <>
            <div className="border rounded-md border-ld overflow-hidden">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-base font-semibold py-3">
                                    Authors
                                </TableHead>
                                <TableHead className="text-base font-semibold py-3">
                                    Courses
                                </TableHead>
                                <TableHead className="text-base font-semibold py-3">
                                    Users
                                </TableHead>
                                <TableHead className="text-base font-semibold py-3"></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-border dark:divide-darkborder">
                            {hoverTableData.map((item, index) => (
                                <TableRow
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-dark cursor-pointer"
                                >
                                    {/* Authors */}
                                    <TableCell className="whitespace-nowrap">
                                        <div className="flex gap-3 items-center">
                                            <Image
                                                src={item.avatar}
                                                alt="icon"
                                                className="h-10 w-10 rounded-md"
                                                width={40}
                                                height={40}
                                            />

                                            <div className="truncate line-clamp-2 max-w-56">
                                                <h6 className="text-base">{item.name}</h6>
                                                <p className="text-sm text-ld">{item.handle}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Courses */}
                                    <TableCell className="whitespace-nowrap">
                                        <div className="flex gap-2">
                                            {item.courses.map((crs: any, index: any) => (
                                                <Badge
                                                    key={index}
                                                    variant={crs?.statuscolor}
                                                >
                                                    {crs.status}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>

                                    {/* Users */}
                                    <TableCell className="whitespace-nowrap">
                                        <p className="text-ld text-sm">{item.users}</p>
                                    </TableCell>

                                    {/* Dropdown */}
                                    <TableCell className="whitespace-nowrap text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                                                    <IconDots size={22} />
                                                </span>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="end">
                                                {tableActionData.map((action, i) => (
                                                    <DropdownMenuItem
                                                        key={i}
                                                        className="flex gap-3 cursor-pointer"
                                                    >
                                                        <Icon icon={action.icon} height={18} />
                                                        <span>{action.listtitle}</span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
};

export default HoverableTable;
