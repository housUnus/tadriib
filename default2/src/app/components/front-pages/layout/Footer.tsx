"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Footer = () => {
  const company_details = [
    "Saudi Arabia, Jeddah . ص.ب -11592",
    "Phone : 0126529126 | 0535530307",
    "Mobile :00966535530307",
    "Email : info@fin.com.sa"
  ];

  const legal_links = [
    { name: "About us", link: "/about-us", icon: null },
    { name: "Terms of Service", link: "/terms-of-service", icon: null },
    { name: "Privacy Policy", link: "/privacy-policy", icon: null },
    { name: "Cookie Policy", link: "/cookie-policy", icon: null },
    { name: "Help Center", link: "/help", icon: null },
    { name: "Contact Support", link: "/contact", icon: null },
    { name: "Blog", link: "/blog", icon: null },
    { name: "For Business", link: "/for-business", icon: null },
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
              <h4 className="text-base text-white font-semibold mb-8">Company</h4>
              <div className="flex flex-col gap-4">
                {legal_links.map((item) => (
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

            {/* Column 3 */}
            <div className="lg:col-span-3 sm:col-span-6 col-span-12">
              <h4 className="text-base text-white font-semibold mb-8">Certifications</h4>
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
              <h4 className="text-base text-white font-semibold mb-8">Follow us</h4>
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
              All rights reserved by The Trainer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
