"use client";
import Image from "next/image";
import Link from "next/link";

// ✅ Shadcn UI imports
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MainBanner = () => {
  const userImg = [
    { user: "/images/profile/user-2.jpg" },
    { user: "/images/profile/user-3.jpg" },
    { user: "/images/profile/user-4.jpg" },
  ];

  const Technology = [
    { tech: "/images/front-pages/technology/react.svg", tooltip: "React" },
    { tech: "/images/front-pages/technology/nextjs.svg", tooltip: "Next.js" },
    { tech: "/images/front-pages/technology/typescript.svg", tooltip: "Typescript" },
    { tech: "/images/front-pages/technology/tailwind.svg", tooltip: "Tailwind CSS" },
    { tech: "/images/front-pages/technology/headless-ui.svg", tooltip: "Headless UI" },
    { tech: "/images/front-pages/technology/shadcn.svg", tooltip: "Shadcn UI" },
  ];

  return (
    <div className="bg-lightgray dark:bg-darkgray">
      <div className="container-1218 mx-auto sm:pt-10! pt-6 xl:pb-0 pb-10">
        <div className="grid grid-cols-12 gap-7 items-center">
          {/* Left Section */}
          <div className="xl:col-span-6 col-span-12 lg:text-start text-center">
            <h1 className="lg:text-56 text-4xl text-darklink dark:text-white lg:leading-16 leading-[50px]">
              <b>A feature-packed dashboard</b> built for developers' needs.
            </h1>

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
                52,589+ developers & agencies using our templates
              </h5>
            </div>

            {/* Tech Icons with Tooltip */}
            <ul className="flex flex-wrap lg:justify-start justify-center gap-5 pb-7 md:pt-4 ml-0">
              <TooltipProvider delayDuration={100}>
                {Technology.map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <li className="md:h-14 md:w-14 h-10 w-10 bg-white dark:bg-darkmuted rounded-2xl flex justify-center items-center shadow-elevation1">
                        <Image
                          src={item.tech}
                          alt={item.tooltip}
                          height={28}
                          width={28}
                          className="md:h-7 h-5"
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
            <div className="flex lg:justify-start justify-center">
              <Button
                asChild
                className="px-6! font-bold sm:w-fit w-full bg-primary text-white hover:bg-primary/90"
              >
                <Link href="/auth/auth2/login">Log in</Link>
              </Button>
            </div>
          </div>

          {/* Right Section - Banner Image */}
          <div className="lg:col-span-6 col-span-12 xl:block hidden">
            <div className="min-w-[1300px] max-h-[700px] h-[calc(100vh-100px)] overflow-hidden">
              <Image
                src="/images/front-pages/background/main-banner.png"
                alt="banner"
                className="rtl:scale-x-[-1]"
                width={1300}
                height={700}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
