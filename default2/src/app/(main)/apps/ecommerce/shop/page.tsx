import BreadcrumbComp from "@/app/(main)/layout/shared/breadcrumb/BreadcrumbComp";
import EcommerceShop from "@/app/components/app/ecommerce/productGrid";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Ecommerce Shop",
};
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Shop",
  },
];


const Ecommerce = () => {
  return (
    <>
      <BreadcrumbComp title="Shop App" items={BCrumb} />
      <EcommerceShop />
    </>
  );
};

export default Ecommerce;
