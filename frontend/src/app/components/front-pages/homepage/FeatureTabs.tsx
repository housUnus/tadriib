"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const FeatureTabs = () => {
  const [activeTab, setActiveTab] = useState("Team Scheduling");

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  const Tab1 = [
    {
      title: "Combine teammate schedules",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
    {
      title: "Factor in outside colleagues",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
    {
      title: "Round robin pooling",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
  ];

  const Tab2 = [
    {
      title: "Combine teammate schedules 2",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
    {
      title: "Factor in outside colleagues",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
    {
      title: "Round robin pooling",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
  ];

  const Tab3 = [
    {
      title: "Combine teammate schedules 3",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
    {
      title: "Factor in outside colleagues",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
    {
      title: "Round robin pooling",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
  ];

  const Tab4 = [
    {
      title: "Combine teammate schedules 4",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
    {
      title: "Factor in outside colleagues",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
    {
      title: "Round robin pooling",
      desc: "Factor in availability for required attendees, and skip checking for conflicts for optional attendees.",
    },
  ];

  const renderAccordion = (data: any[]) => (
    <Accordion
      type="single"
      collapsible
      className="shadow-none dark:shadow-none divide-y-0 rounded-none!"
    >
      {data.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
        >
          <AccordionTrigger className="focus:ring-0 px-0 text-17 font-semibold text-ld py-5">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="px-0 pt-0 rounded-none!">
            <p className="text-base text-ld opacity-80 leading-7">
              {item.desc}
            </p>
          </AccordionContent>
          <Separator className="my-0" />
        </AccordionItem>
      ))}
    </Accordion>
  );

  return (
    <div className="bg-lightgray dark:bg-darkgray lg:py-24 py-12">
      <div className="container-1218 mx-auto">
        {/* Tabs */}
        <div className="overflow-x-auto">
          <div className="flex shrink-0 gap-4 md:pb-14 pb-8">
            {[
              {
                label: "Team Scheduling",
                icon: "material-symbols:groups-outline-rounded",
              },
              {
                label: "Payments",
                icon: "material-symbols:account-balance-outline",
              },
              {
                label: "Embedding",
                icon: "material-symbols-light:photo-frame-outline-sharp",
              },
              {
                label: "Workflows",
                icon: "material-symbols:widgets-outline-rounded",
              },
            ].map((tab) => (
              <div
                key={tab.label}
                onClick={() => handleTabClick(tab.label)}
                className={`py-4 px-6 whitespace-nowrap w-full rounded-tw cursor-pointer text-dark text-base font-semibold text-center flex gap-2 justify-center items-center md:hover:bg-lightprimary md:dark:hover:bg-lightprimary md:hover:text-primary shadow-elevation2 ${
                  activeTab === tab.label
                    ? "text-white bg-primary dark:bg-primary shadow-elevation3 hover:text-white! hover:bg-primaryemphasis!"
                    : "dark:text-white bg-white dark:bg-dark"
                }`}
              >
                <Icon icon={tab.icon} height={22} />
                {tab.label}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-7 items-center">
          <div className="lg:col-span-6 col-span-12">
            <Image
              src="/images/front-pages/background/feature-image.png"
              className="w-full"
              alt="banner"
              width={600}
              height={400}
            />
          </div>

          <div className="lg:col-span-6 col-span-12 lg:ps-7">
            {activeTab === "Team Scheduling" && (
              <>
                <h2 className="sm:text-44 text-3xl font-bold leading-12! text-darklink dark:text-white pb-6">
                  Protect your focus.
                </h2>
                {renderAccordion(Tab1)}
                <Button className="font-bold mt-6 bg-primary text-white hover:bg-primary/90">
                  Learn More
                </Button>
              </>
            )}

            {activeTab === "Payments" && (
              <>
                <h2 className="sm:text-44 text-3xl font-bold leading-12! text-darklink dark:text-white pb-6">
                  Protect your focus.
                </h2>
                {renderAccordion(Tab2)}
                <Button className="font-bold mt-6 bg-primary text-white hover:bg-primary/90">
                  Learn More
                </Button>
              </>
            )}

            {activeTab === "Embedding" && (
              <>
                <h2 className="sm:text-44 text-3xl font-bold leading-12! text-darklink dark:text-white pb-6">
                  Protect your focus.
                </h2>
                {renderAccordion(Tab3)}
                <Button className="font-bold mt-6 bg-primary text-white hover:bg-primary/90">
                  Learn More
                </Button>
              </>
            )}

            {activeTab === "Workflows" && (
              <>
                <h2 className="sm:text-44 text-3xl font-bold leading-12! text-darklink dark:text-white pb-6">
                  Protect your focus.
                </h2>
                {renderAccordion(Tab4)}
                <Button className="font-bold mt-6 bg-primary text-white hover:bg-primary/90">
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureTabs;
