
import BreadcrumbComp from "@/app/[locale]/(main)/layout/shared/breadcrumb/BreadcrumbComp";
import BlogPost from "@/app/components/app/blog/BlogPost";
import { Metadata } from "next";
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Blog app",
  },
];
export const metadata: Metadata = {
  title: "Blog Post",
};
const Blog = () => {
  return (
    <>
     <BreadcrumbComp title="Blog app" items={BCrumb} />
     <BlogPost/>
    </>
  );
};
export default Blog;
