import WelcomeBox from "@/app/components/dashboards/Dashboard1/WelcomeBox";
import React from "react";
import Customer from "../../components/dashboards/Dashboard1/Customer";
import Project from "../../components/dashboards/Dashboard1/Project";
import RevenueForcast from "../../components/dashboards/Dashboard1/RevenueForcast";
import YourPerformance from "../../components/dashboards/Dashboard1/YourPerformance";
import CustomerChart from "../../components/dashboards/Dashboard1/CustomerChart";
import SalesOverview from "../../components/dashboards/Dashboard1/SalesOverview";
import RevenueByProduct from "../../components/dashboards/Dashboard1/RevenueByProduct";
import TotalSettelment from "../../components/dashboards/Dashboard1/TotalSettelment";

const page = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-7">
        <div className="lg:col-span-5 col-span-12">
          <WelcomeBox />
          <div className="grid grid-cols-12 mt-7 gap-7">
            <div className="md:col-span-6 col-span-12">
              <Customer />
            </div>
            <div className="md:col-span-6 col-span-12">
              <Project />
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 col-span-12">
          <RevenueForcast />
        </div>
        <div className="lg:col-span-5 col-span-12">
          <YourPerformance />
        </div>
        <div className="lg:col-span-7 col-span-12 h-full">
          <div className="grid grid-cols-12 gap-7 h-full">
            <div className="md:col-span-6 col-span-12 h-full">
              <CustomerChart />
            </div>
            <div className="md:col-span-6 col-span-12 h-full">
              <SalesOverview />
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <RevenueByProduct />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <TotalSettelment />
        </div>
      </div>
    </>
  );
};

export default page;
