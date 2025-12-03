import CalendarApp from "@/app/components/app/calendar";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Calendar App",
};

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Calendar",
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Calendar" items={BCrumb} />
      <CalendarApp />
    </>
  );
};

export default page;
