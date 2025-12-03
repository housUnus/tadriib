import BreadcrumbComp from "@/app/(main)/layout/shared/breadcrumb/BreadcrumbComp";
import { Metadata } from "next";
import TitleCard from "@/app/components/shared/TitleBorderCard";
import HoverableTable from "@/app/components/shadcn-table/Hover/HoverableTable";

export const metadata: Metadata = {
  title: "Hover Table",
};
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Hover Table",
  },
];
function page() {
  return (
    <>
      <BreadcrumbComp title="Shadcn Hover Table" items={BCrumb} />
      <TitleCard title="Hover Table">
        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12">
            <HoverableTable />
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default page;
