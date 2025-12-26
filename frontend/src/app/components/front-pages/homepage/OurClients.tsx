"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { easeInOut } from "framer-motion";
import { useTranslations } from "next-intl";

const Feature = [
  {
    icon: "solar:diploma-verified-broken",
    titleKey: "feature.certificationPrep.title",
    subtitleKey: "feature.certificationPrep.subtitle",
    bgcolor: "bg-lightprimary",
    color: "text-primary",
  },
  {
    icon: "solar:square-academic-cap-broken",
    titleKey: "feature.fellowshipSupport.title",
    subtitleKey: "feature.fellowshipSupport.subtitle",
    bgcolor: "bg-lightsuccess",
    color: "text-success",
  },
  {
    icon: "mdi:progress-star",
    titleKey: "feature.skillTracks.title",
    subtitleKey: "feature.skillTracks.subtitle",
    bgcolor: "bg-lightwarning",
    color: "text-warning",
  },
  {
    icon: "solar:clock-circle-broken",
    titleKey: "feature.access247.title",
    subtitleKey: "feature.access247.subtitle",
    bgcolor: "bg-lightgray dark:bg-darkgray",
    color: "text-dark dark:text-white",
  },
];

// Soft continuous float animation for feature cards
const floatAnim = {
  animate: {
    y: [0, -6, 0],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: easeInOut,
  },
};

const OurClients = () => {
  const t = useTranslations("home")
  return (
    <motion.div
      // Very subtle whole-section fade + slight float
      initial={false}
      whileInView={{
        scale: [1, 1.01, 1],
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      className="lg:py-24 py-12 dark:bg-dark"
    >
      <div className="container-1218 mx-auto">
        <div className="grid grid-cols-12 gap-7">

          {/* LEFT SIDE */}
          <div className="lg:col-span-5 col-span-12">
            <motion.h2
              initial={false}
              whileInView={{
                scale: [1, 1.01, 1],
              }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="sm:text-44 text-3xl font-bold text-darklink dark:text-white"
            >
              {t('EearnCertifications')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 1, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-base leading-7 text-ld opacity-75 py-6"
            >
              {t('GetGuidance')}
            </motion.p>

            <motion.div
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                href={"/"}
                className="text-darklink dark:text-white text-sm font-semibold underline decoration-2 underline-offset-[6px]"
              >
                {t('explorePaths')}
              </Link>
            </motion.div>
          </div>

          {/* RIGHT SIDE — FEATURES */}
          <div className="lg:col-span-7 col-span-12 lg:ps-5">
            <div className="grid grid-cols-12 md:gap-12 gap-6">
              {Feature.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="md:col-span-6 col-span-12"
                >
                  {/* FLOATING ICON */}
                  <motion.div
                    animate={floatAnim.animate}
                    transition={floatAnim.transition}
                    className={`h-12 w-12 shrink-0 flex items-center justify-center rounded-tw ${item.bgcolor}`}
                  >
                    <Icon icon={item.icon} className={item.color} height={24} />
                  </motion.div>

                  <h4 className="font-bold text-darklink dark:text-white py-4 text-xl">
                    {t(item.titleKey)}
                  </h4>
                  <p className="text-base text-ld opacity-70 leading-6">
                    {t(item.subtitleKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default OurClients;
