
import BreadcrumbComp from '@/app/(main)/layout/shared/breadcrumb/BreadcrumbComp';
import React from 'react'
import { BlogProvider } from '@/app/context/BlogContext/index';
import type { Metadata } from "next";
import { Card } from '@/components/ui/card';
import ManageBlogTable from '@/app/components/app/blog/blogtable/ManageBlogTable';
import CardBox from '@/app/components/shared/CardBox';
export const metadata: Metadata = {
    title: "Manage Blog ",
};

const BCrumb = [
    {
        to: "/",
        title: "Home",
    },
    {
        title: "Manage Blog",
    },
];
const MangeBlog = () => {
    return (
        <>
            <BlogProvider>
                <BreadcrumbComp title=" Manage Blog" items={BCrumb} />
                <CardBox>
                    <ManageBlogTable />
                </CardBox>
            </BlogProvider>
        </>
    )
}

export default MangeBlog
