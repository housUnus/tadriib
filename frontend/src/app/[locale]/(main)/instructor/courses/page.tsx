import React from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";
import { useServerFetch } from "@/hooks/auth/user-server-fetch";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Courses from "./courses";

export const metadata: Metadata = {
  title: "Courses",
  description: "Created Courses",
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
  const { data: courses, error } = await client.get("/course-create/?limit=10");

  return (
    <>
      <BreadcrumbComp title="My Courses" items={BCrumb} />
      <Card className="px-0 py-0">
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="courses" className="flex items-center gap-2">
              Courses
            </TabsTrigger>
          </TabsList>
          <TabsContent value="courses" className="p-6">
            <Courses courses={courses?.results}/>
          </TabsContent>
        </Tabs>
      </Card>
    </>
  );
};

export default MyCourses;
