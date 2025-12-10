"use client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Category = {
  titleKey: string;
  icon: string;
  text: string;
  bg: string;
};

const Categories1 = [
  {
    icon: "tabler:users-group",
    titleKey: "categories.management.title",
    bg: "bg-lightprimary",
    text: "text-primary",
  },
  {
    icon: "tabler:building-community",
    titleKey: "categories.realEstate.title",
    bg: "bg-lightgray",
    text: "text-dark",
  },
  {
    icon: "tabler:database",
    titleKey: "categories.dataManagement.title",
    bg: "bg-lightprimary",
    text: "text-primary",
  },
  {
    icon: "tabler:chart-bar",
    titleKey: "categories.accounting.title",
    bg: "bg-lightsuccess",
    text: "text-success",
  },
  {
    icon: "tabler:road",
    titleKey: "categories.skillsDevelopment.title",
    bg: "bg-lightprimary",
    text: "text-primary",
  },
  {
    icon: "tabler:alert-triangle",
    titleKey: "categories.safety.title",
    bg: "bg-lighterror",
    text: "text-error",
  },
];

const Categories2 = [
  { icon: "tabler:badge", titleKey: "categories.humanResources.title", bg: "bg-lightinfo", text: "text-info" },
  { icon: "tabler:wallet", titleKey: "categories.islamicFinance.title", bg: "bg-lightsuccess", text: "text-success" },
  { icon: "tabler:megaphone", titleKey: "categories.media.title", bg: "bg-lightpurple", text: "text-purple" },
  { icon: "tabler:calendar-check", titleKey: "categories.projectManagement.title", bg: "bg-lightinfo", text: "text-info" },
  { icon: "tabler:building", titleKey: "categories.publicSector.title", bg: "bg-lightinfo", text: "text-info" },
  { icon: "tabler:shield-check", titleKey: "categories.audit.title", bg: "bg-lighterror", text: "text-error" },
  { icon: "tabler:tools", titleKey: "categories.engineering.title", bg: "bg-lightwarning", text: "text-warning" },
  { icon: "tabler:umbrella", titleKey: "categories.insurance.title", bg: "bg-lightinfo", text: "text-info" },
];

const Categories3 = [
  { icon: "tabler:language", titleKey: "categories.languages.title", bg: "bg-lightwarning", text: "text-warning" },
  { icon: "tabler:leaf", titleKey: "categories.environment.title", bg: "bg-lightsuccess", text: "text-success" },
  { icon: "tabler:checkup-list", titleKey: "categories.quality.title", bg: "bg-lightpurple", text: "text-purple" },
  { icon: "tabler:device-desktop", titleKey: "categories.it.title", bg: "bg-lightprimary", text: "text-primary" },
  { icon: "tabler:box-seam", titleKey: "categories.supplyChain.title", bg: "bg-lightgray", text: "text-dark" },
  { icon: "tabler:sparkles", titleKey: "categories.innovation.title", bg: "bg-lightprimary", text: "text-primary" },
  { icon: "tabler:brain", titleKey: "categories.ai.title", bg: "bg-lightpurple", text: "text-purple" },
];

const Line = ({ elements }: { elements: Category[] }) => {
  const t = useTranslations("home");
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
            {t(item.titleKey)}
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

  const t = useTranslations("home");

  return (
    <>
      <div className="dark:bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:pt-24 pt-12 ">
            <h2 className="text-3xl md:text-4xl font-bold text-darklink dark:text-white mb-3 sm:mb-4">
              {t('exploreCategories')}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 sm:px-0">
              {t('findTheTrainingPath')}
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
