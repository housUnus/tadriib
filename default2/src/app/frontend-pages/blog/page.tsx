import type { Metadata } from "next";
import PurchaseTemp from "@/app/components/front-pages/homepage/PurchaseTemp";
import BlogPost from "@/app/components/front-pages/blog/BlogPost";
import FrontEndBreadcrumb from "@/app/(main)/layout/shared/breadcrumb/FrontBreadcrumb";
export const metadata: Metadata = {
  title: "Front-Blog",
};
const page = () => {
  return (
    <>
      <FrontEndBreadcrumb title="Latest blog & news" link="Blog Page" />
      <div className="bg-lightgray dark:bg-darkgray">
        <BlogPost />
      </div>
      <PurchaseTemp />
    </>
  );
};

export default page;
