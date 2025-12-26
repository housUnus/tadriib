import React from "react";
import BreadcrumbComp from "@/app/[locale]/(main)/layout/shared/breadcrumb/BreadcrumbComp";
import { Metadata } from "next";
import StickyTable from "@/app/components/react-tables/sticky";


export const metadata: Metadata = {
    title: "Sticky Table ",
};
const BCrumb = [
    {
        to: "/",
        title: "Home",
    },
    {
        title: "Sticky Table",
    },
];
function page() {
    return (
        <>
            <BreadcrumbComp title="Sticky Table" items={BCrumb} />
            <StickyTable />
        </>
    );
}

export default page;
