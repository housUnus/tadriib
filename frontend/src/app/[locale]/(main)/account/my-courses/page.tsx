import React from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";
import { useServerFetch } from "@/hooks/auth/user-server-fetch";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Wishlist from "./Wishlist";
import Enrollments from "./Enrollments";

export const metadata: Metadata = {
  title: "My Courses",
  description: "List of My Courses",
};

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "My Courses",
  },
];
const MyCourses = async ({ searchParams }: { searchParams: Promise<{ tab: string }> }) => {
  const activeTab = (await searchParams)?.tab ?? "courses";
  const client = await useServerFetch();
  const { data: enrollments, error } = await client.get("/enrollments/?limit=10");

  return (
    <>
      <BreadcrumbComp title="My Courses" items={BCrumb} />
      <Card className="px-0 py-0">
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="courses" className="flex items-center gap-2">
              My Courses
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              Wishlist
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="p-6">
            <Enrollments enrollments={enrollments?.results}/>
          </TabsContent>
          <TabsContent value="wishlist" className="p-6">
            <Wishlist/>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
};

export default MyCourses;
