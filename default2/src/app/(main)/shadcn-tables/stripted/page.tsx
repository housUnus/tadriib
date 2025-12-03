import BreadcrumbComp from "@/app/(main)/layout/shared/breadcrumb/BreadcrumbComp";
import { Metadata } from "next";
import TitleCard from "@/app/components/shared/TitleBorderCard";
import StriptedRowTable from "@/app/components/shadcn-table/Stripted/StriptedRowTable";

export const metadata: Metadata = {
  title: "Basic Table",
};
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Stripted Table",
  },
];
function page() {
  return (
    <>
      <BreadcrumbComp title="Shadcn Stripted Table" items={BCrumb} />
      <TitleCard title="Stripted Table">
        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12">
            <StriptedRowTable />
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default page;
