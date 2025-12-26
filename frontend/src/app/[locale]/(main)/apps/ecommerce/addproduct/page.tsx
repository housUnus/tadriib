import React from "react";
import BreadcrumbComp from "@/app/[locale]/(main)/layout/shared/breadcrumb/BreadcrumbComp";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import GeneralDetail from "@/app/components/app/ecommerce/addProduct/GeneralDetail";
import Media from "@/app/components/app/ecommerce/addProduct/Media";
import Variation from "@/app/components/app/ecommerce/addProduct/Variation";
import Pricing from "@/app/components/app/ecommerce/addProduct/Pricing";
import Thumbnail from "@/app/components/app/ecommerce/addProduct/Thumbnail";
import Status from "@/app/components/app/ecommerce/addProduct/Status";
import ProductData from "@/app/components/app/ecommerce/addProduct/ProductData";
import Producttemplate from "@/app/components/app/ecommerce/addProduct/ProductTemplate";
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Add Product",
  },
];
export const metadata: Metadata = {
  title: "Add Product",
};
const AddProduct = () => {
  return (
    <>
      <BreadcrumbComp title="Add Product" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-8 col-span-12">
          <div className="flex flex-col gap-6">
            {/* General */}
            <GeneralDetail />
            {/* Media  */}
            <Media />
            {/* Variation  */}
            <Variation />
            {/* Pricing  */}
            <Pricing />
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="flex flex-col gap-6">
            {/* Thumbnail */}
            <Thumbnail />
            {/* Status */}
            <Status />
            {/* ProductData */}
            <ProductData />
            {/* Producttemplate */}
            <Producttemplate />
          </div>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <div className="sm:flex gap-3">
            <Button className="sm:mb-0 mb-3 w-fit">
              Save changes
            </Button>
            <Button variant={"lighterror"} className="w-fit">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
