"use client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

type Category = {
  title: string;
  icon: string;
  text: string;
  bg: string;
};

const Line = ({ elements }: { elements: Category[] }) => {
  return (
    <div className="flex">
      {elements.map((item, index) => (
        <div
          key={index}
          className={`py-5 px-8 mx-3 rounded-2xl flex gap-3 items-center ${item.bg}`}
        >
          <Icon
            icon={item.icon}
            className={`text-2xl shrink-0 ${item.text}`}
          />
          <p
            className={`text-15 font-semibold whitespace-nowrap ${item.text}`}
          >
            {item.title}
          </p>
        </div>
      ))}
    </div>
  )
}

export function LineContainer({ elements, direction, duration }: { elements: Category[], direction: string, duration: number }) {
  const multiplier = direction === "left" ? -1 : 1;
  return (
    <div className="relative overflow-hidden mb-3">
      {/* Marquee */}
      <motion.div
        className="relative w-fit flex"
        initial={{ x: "0%" }}
        animate={{ x: `${multiplier * 50}%` }}
        transition={{ duration: duration, ease: "linear", repeat: Infinity }}
      >
        <Line elements={[...elements, ...elements]} />
        <div className={`absolute left-full top-0`}>
          <Line elements={elements} />
        </div>
      </motion.div>
    </div>
  )
}

export const Highlights = () => {

  const Categories1 = [
    {
      icon: "tabler:users-group",
      title: "Management & Leadership",
      bg: "bg-lightprimary",
      text: "text-primary",
    },
    {
      icon: "tabler:building-community",
      title: "Real Estate",
      bg: "bg-lightgray",
      text: "text-dark",
    },
    {
      icon: "tabler:database",
      title: "Data Management & Business Intelligence",
      bg: "bg-lightprimary",
      text: "text-primary",
    },
    {
      icon: "tabler:chart-bar",
      title: "Accounting & Finance",
      bg: "bg-lightsuccess",
      text: "text-success",
    },
    {
      icon: "tabler:road",
      title: "Skills Development",
      bg: "bg-lightprimary",
      text: "text-primary",
    },
    {
      icon: "tabler:alert-triangle",
      title: "Safety & Security",
      bg: "bg-lighterror",
      text: "text-error",
    },

  ];

  const Categories2 = [
    {
      icon: "tabler:badge",
      title: "Human Resources",
      bg: "bg-lightinfo",
      text: "text-info",
    },
    {
      icon: "tabler:wallet",
      title: "Islamic Finance & Banking",
      bg: "bg-lightsuccess",
      text: "text-success",
    },
    {
      icon: "tabler:megaphone",
      title: "Media & Public Relations",
      bg: "bg-lightpurple",
      text: "text-purple",
    },
    {
      icon: "tabler:calendar-check",
      title: "Project Management",
      bg: "bg-lightinfo",
      text: "text-info",
    },
    {
      icon: "tabler:building",
      title: "Public Sector & Government Affairs",
      bg: "bg-lightinfo",
      text: "text-info",
    },
    {
      icon: "tabler:shield-check",
      title: "Audit, Governance & Compliance",
      bg: "bg-lighterror",
      text: "text-error",
    },
    {
      icon: "tabler:tools",
      title: "Engineering & Maintenance",
      bg: "bg-lightwarning",
      text: "text-warning",
    },
    {
      icon: "tabler:umbrella",
      title: "Insurance",
      bg: "bg-lightinfo",
      text: "text-info",
    },
  ];

  const Categories3 = [
    {
      icon: "tabler:language",
      title: "Languages",
      bg: "bg-lightwarning",
      text: "text-warning",
    },
    {
      icon: "tabler:leaf",
      title: "Environment & Sustainability",
      bg: "bg-lightsuccess",
      text: "text-success",
    },
    {
      icon: "tabler:checkup-list",
      title: "Quality & Productivity",
      bg: "bg-lightpurple",
      text: "text-purple",
    },
    {
      icon: "tabler:device-desktop",
      title: "Information Technology",
      bg: "bg-lightprimary",
      text: "text-primary",
    },
    {
      icon: "tabler:box-seam",
      title: "Warehousing, Procurement & Supply Chain",
      bg: "bg-lightgray",
      text: "text-dark",
    },
    {
      icon: "tabler:sparkles",
      title: "Innovation & Digital Transformation",
      bg: "bg-lightprimary",
      text: "text-primary",
    },
    {
      icon: "tabler:brain",
      title: "Artificial Intelligence",
      bg: "bg-lightpurple",
      text: "text-purple",
    },
  ];


  return (
    <>
      <div className="dark:bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:pt-24 pt-12 ">
            <h2 className="text-3xl md:text-4xl font-bold text-darklink dark:text-white mb-3 sm:mb-4">
              Explore Categories
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              Find the training path that fits your goals across a wide range of professional fields
            </p>
          </div>
          <div className="rounded-md overflow-hidden">
            <LineContainer elements={Categories1} direction="left" duration={90} />
            <LineContainer elements={Categories2} direction="left" duration={60} />
            <LineContainer elements={Categories3} direction="left" duration={80} />
          </div>
        </div>
      </div>
    </>
  );
};
