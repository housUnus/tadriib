"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import * as AppsData from "@/app/(main)/layout/vertical/header/Data";
import { IconChevronDown } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PagesMenu = () => {
  return (
    <div className="relative group/menu me-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="py-2! px-4 text-base text-ld hover:text-primary hover:bg-lightprimary rounded-md flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            Pages <IconChevronDown className="ms-1" size={15} />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="center"
          sideOffset={10}
          className="w-screen xl:w-[900px] rounded-sm p-0 border border-border shadow-lg"
        >
          <div className="grid grid-cols-12 w-full">
            {/* Left Section: Menu Links */}
            <div className="xl:col-span-8 col-span-12 flex items-stretch p-6">
              <div className="grid grid-cols-12 gap-3 w-full">
                {AppsData.appsLink.map((links:any, index) => (
                  <div className="col-span-12 xl:col-span-6" key={index}>
                    <Link
                      href={links.href}
                      className="flex gap-3 hover:text-primary group relative items-center"
                    >
                      <span
                        className={`h-12 w-12 flex justify-center items-center rounded-tw ${links.iconbg}`}
                      >
                        <Icon
                          icon={links.icon}
                          height={24}
                          className={`${links.iconcolor}`}
                        />
                      </span>
                      <div>
                        <h6 className="font-semibold text-15 text-ld hover:text-primary">
                          {links.title}
                        </h6>
                        <p className="text-13 text-bodytext">{links.subtext}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: Image */}
            <div className="xl:col-span-4 col-span-12 flex items-stretch h-[300px]">
              <Image
                src={"/images/backgrounds/mega-dd-bg.jpg"}
                alt="image"
                className="h-full w-full object-cover rounded-r-sm"
                width={500}
                height={300}
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PagesMenu;
