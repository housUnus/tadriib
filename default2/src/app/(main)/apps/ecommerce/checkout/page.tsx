import BreadcrumbComp from "@/app/(main)/layout/shared/breadcrumb/BreadcrumbComp";
import ProductCheckout from "@/app/components/app/ecommerce/checkout/ProductCheckout";
import { ProductProvider } from '@/app/context/Ecommercecontext/index';
import { Metadata } from "next";
import CardBox from "@/app/components/shared/CardBox";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Checkout",
  },
];
export const metadata: Metadata = {
  title: "Checkout App",
};

const Checkout = () => {
  return (
    <>
      <ProductProvider>
        <BreadcrumbComp title="Checkout" items={BCrumb} />
        <CardBox>
          <ProductCheckout />
        </CardBox>
      </ProductProvider>
    </>
  );
};

export default Checkout;
