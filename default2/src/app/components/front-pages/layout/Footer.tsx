"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTranslations } from "next-intl";
import { Language } from "@/app/[locale]/(main)/layout/vertical/header/Language";

export const Footer = () => {

  const t = useTranslations("home");

  const company_details = [
    "Saudi Arabia, Jeddah . ص.ب -11592",
    "Phone : 0126529126 | 0535530307",
    "Mobile :00966535530307",
    "Email : info@fin.com.sa"
  ];

  const legal_links = [
    { nameKey: "legalLinks.aboutUs", link: "/about-us", icon: null },
    { nameKey: "legalLinks.termsOfService", link: "/terms-of-service", icon: null },
    { nameKey: "legalLinks.privacyPolicy", link: "/privacy-policy", icon: null },
    { nameKey: "legalLinks.cookiePolicy", link: "/cookie-policy", icon: null },
    { nameKey: "legalLinks.helpCenter", link: "/help", icon: null },
    { nameKey: "legalLinks.contactSupport", link: "/contact", icon: null },
    { nameKey: "legalLinks.blog", link: "/blog", icon: null },
    { nameKey: "legalLinks.forBusiness", link: "/for-business", icon: null },
  ];

  const certifications = [
    { name: "FMAA", link: "/certifications/fmaa", icon: null },
    { name: "CPA", link: "/certifications/cpa", icon: null },
    { name: "CMA", link: "/certifications/cma", icon: null },
    { name: "ACCA", link: "/certifications/acca", icon: null },
    { name: "CAT", link: "/certifications/cat", icon: null },
    { name: "CFM", link: "/certifications/cfm", icon: null },
    { name: "CIA", link: "/certifications/cia", icon: null },
    { name: "PMP", link: "/certifications/pmp", icon: null },
  ];

  return (
    <div className="bg-sky">
      <div className="container-1218 mx-auto">
        <div className="border-b border-darkborder lg:py-16 py-8">
          <div className="grid grid-cols-12 gap-7">
            {/* Column 1 */}
            <div className="lg:col-span-3 sm:col-span-6 col-span-12">
              <Image
                src="/images/front-pages/background/white-logo.svg"
                alt="logo"
                className="mb-8"
                width={150}
                height={40}
              />
              <div className="flex flex-col gap-4">
                {company_details.map((item) => (
                  <p key={item} className="text-sm text-lightmuted">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Column 2 */}
            <div className="lg:col-span-3 sm:col-span-6 col-span-12">
              <h4 className="text-base text-white font-semibold mb-8">{t('company')}</h4>
              <div className="flex flex-col gap-4">
                {legal_links.map((item) => (
                  <Link
                    key={item.nameKey}
                    href={item.link}
                    className="text-sm text-lightmuted hover:text-primary block"
                  >
                    {t(item.nameKey)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3 */}
            <div className="lg:col-span-3 sm:col-span-6 col-span-12">
              <h4 className="text-base text-white font-semibold mb-8 capitalize">{t('certifications')}</h4>
              <div className="flex flex-col gap-4">
                {certifications.map((item) => (
                  <Link
                    key={item.name}
                    href={item.link}
                    className="text-sm text-lightmuted hover:text-primary block"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4 */}
            <div className="lg:col-span-3 sm:col-span-6 col-span-12">
              <h4 className="text-base text-white font-semibold mb-8">{t('followUs')}</h4>
              <div className="flex items-center gap-5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/">
                        <Image
                          src="/images/front-pages/background/facebook.svg"
                          height={22}
                          width={22}
                          alt="Facebook"
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      Facebook
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/">
                        <Image
                          src="/images/front-pages/background/twitter.svg"
                          height={22}
                          width={22}
                          alt="Twitter"
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      Twitter
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="/">
                        <Image
                          src="/images/front-pages/background/instagram.svg"
                          height={22}
                          width={22}
                          alt="Instagram"
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      Instagram
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="">
                <Language isHeader={false} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="container-1218 mx-auto">
        <div className="flex justify-center items-center flex-wrap md:py-6 py-3">
          <div className="flex items-center gap-3">
            <Image
              src="/images/front-pages/background/white-icon-logo.svg"
              alt="logo"
              height={24}
              width={24}
            />
            <p className="text-base text-lightmuted">
              {t('allRightsReservedTo')}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
