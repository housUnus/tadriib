import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import RotatingWords from "./RotatingWords";

const MainBanner = () => {
  const userImg = [
    { user: "/images/profile/user-2.jpg" },
    { user: "/images/profile/user-3.jpg" },
    { user: "/images/profile/user-4.jpg" },
  ];

  const Certifications = [
    { tech: "/images/front-pages/certifications/acca.png", tooltip: "ACCA" },
    { tech: "/images/front-pages/certifications/cat.png", tooltip: "CAT" },
    { tech: "/images/front-pages/certifications/cfm.png", tooltip: "CFM" },
    { tech: "/images/front-pages/certifications/cia.png", tooltip: "CIA" },
    { tech: "/images/front-pages/certifications/pmp.png", tooltip: "PMP" },
    { tech: "/images/front-pages/certifications/cpa.png", tooltip: "CPA" },
  ];

  const t = useTranslations('Home');
  const rotatingWords = t.raw('rotatingWords') as string[];

  return (
    <div className="bg-lightgray dark:bg-darkgray">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl sm:py-20! py-20!">
        <div className="grid grid-cols-12 gap-7 items-center">
          {/* Left Section */}
          <div className="xl:col-span-6 col-span-12 lg:text-start text-center">
            <h1 className="lg:text-56 text-2xl sm:text-4xl text-darklink dark:text-white lg:leading-16 leading-[50px]">
              <b>{t('hero1')}</b>
              <div className="">
                <RotatingWords words={rotatingWords}/>
              </div>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              {t('description')}
            </p>

            {/* User avatars */}
            <div className="sm:flex text-center mx-auto block items-center gap-3 lg:justify-start justify-center py-6">
              <div className="flex flex-row-reverse lg:justify-start justify-center ps-3">
                {userImg.map((item, index) => (
                  <div key={index} className="-ms-3 h-10 w-10 relative z-5">
                    <Image
                      src={item.user}
                      className="border-2 border-white dark:border-darkborder rounded-full"
                      alt="user"
                      width={40}
                      height={40}
                    />
                  </div>
                ))}
              </div>
              <h5 className="text-base text-ld font-medium opacity-80 md:pt-0 pt-3">
                52,589+ {t('learners')}
              </h5>
            </div>

            {/* Tech Icons with Tooltip */}
            <ul className="flex flex-wrap lg:justify-start justify-center gap-5 pb-7 md:pt-4 ml-0">
              <TooltipProvider delayDuration={100}>
                {Certifications.map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <li className="flex justify-center items-center shadow-elevation1">
                        <Image
                          src={item.tech}
                          alt={item.tooltip}
                          height={38}
                          width={38}
                        />
                      </li>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="text-xs">
                      {item.tooltip}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </ul>

            {/* Login Button */}
            <div className="flex lg:justify-start justify-center gap-2">
              <Button asChild className="px-6! font-bold sm:w-fit w-full bg-primary text-white hover:bg-primary/90" >
                <Link href="/auth/auth2/login">{t('getStarted')}</Link>
              </Button>
              <Button asChild className="px-6! font-bold sm:w-fit w-full bg-success text-white hover:bg-success/90" >
                <Link href="/auth/auth2/login">{t('browseCourses')}</Link>
              </Button>
            </div>
          </div>

          {/* Right Section - Banner Image */}
          <div className="lg:col-span-6 col-span-12 xl:block hidden ">
            <div className="flex justify-end min-w-[100px] overflow-hidden">
              <Image
                src="/images/front-pages/background/hero.png"
                alt="banner"
                className=""
                width={400}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
