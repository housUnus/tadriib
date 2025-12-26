import type { Metadata } from "next";
import PurchaseTemp from "@/app/components/front-pages/homepage/CtaSection";
import { BlogProvider } from "@/app/context/BlogContext";
import FrontEndBreadcrumb from "@/app/[locale]/(main)/layout/shared/breadcrumb/FrontBreadcrumb";
import BlogDetailData from "@/app/components/front-pages/blog/detail";
export const metadata: Metadata = {
  title: "Front-Blog Details",
};
const page = () => {
  return (
    <>
      <FrontEndBreadcrumb title="Our most recent articles" link="Blog Details" />
      <div className="bg-lightgray dark:bg-darkgray">
        <div className="container-1218 mx-auto pb-12! pt-10!">
          <BlogProvider>
            <BlogDetailData />
          </BlogProvider>
        </div>
      </div>
      <PurchaseTemp />
    </>
  );
};

export default page;
