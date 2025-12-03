
import BreadcrumbComp from '@/app/(main)/layout/shared/breadcrumb/BreadcrumbComp';
import BlogDetailData from '@/app/components/app/blog/detail';
import { BlogProvider } from '@/app/context/BlogContext/index';
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog Details",
};


const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Blog Detail",
  },
];
const BlogDetail = () => {
  return (
    <>
      <BlogProvider>
        <BreadcrumbComp title="Blog Detail" items={BCrumb} />
        <BlogDetailData />
      </BlogProvider>
    </>
  )
}

export default BlogDetail
