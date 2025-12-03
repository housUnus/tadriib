import CardBox from "@/app/components/shared/CardBox";
import BreadcrumbComp from "@/app/(main)/layout/shared/breadcrumb/BreadcrumbComp";
import InvoiceList from '@/app/components/app/invoice/Invoice-list/index'
import { InvoiceProvider } from '@/app/context/InvoiceContext/index';
import type { Metadata } from "next";
import DetailCard from "@/app/components/app/invoice/Invoice-list/detailCard";
export const metadata: Metadata = {
    title: "Invoice List App",
};
const BCrumb = [
    {
        to: "/",
        title: "Home",
    },
    {
        title: "Invoice List",
    },
];
function List() {
    return (
        <InvoiceProvider>
            <BreadcrumbComp title="Invoice List" items={BCrumb} />
            <DetailCard />
            <CardBox>
                <InvoiceList />
            </CardBox>
        </InvoiceProvider>
    )
}
export default List;
