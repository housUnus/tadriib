
import React from "react";
import BreadcrumbComp from "../../layout/shared/breadcrumb/BreadcrumbComp";
import type { Metadata } from "next";
import ApexRadialBarChartCode from "@/app/components/charts/Code/ApexRadialBarChartCode";
export const metadata: Metadata = {
  title: "Radial Chart",
  description: "demo",
};
const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Chart Apex Radialbar",
  },
];
const RadialChart = () => {

  return (
    <>
      <BreadcrumbComp title="Chart Apex Radialbar" items={BCrumb} />
      <ApexRadialBarChartCode/>
    </>
  );
};

export default RadialChart;
