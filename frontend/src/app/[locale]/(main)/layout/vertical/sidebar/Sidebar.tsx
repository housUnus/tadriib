"use client";

import React, { useContext, useEffect } from "react";

import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import NavCollapse from "./NavCollapse";

import { CustomizerContext } from "@/app/context/CustomizerContext";

import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";

import SimpleBar from "simplebar-react";
import FullLogo from "../../shared/logo/FullLogo";
import { Icon } from "@iconify/react/dist/iconify.js";

const SidebarLayout = () => {
  const { selectedIconId, setSelectedIconId } =
    useContext(CustomizerContext) || {};
 
  const pathname = usePathname();

  function findActiveUrl(narray: any, targetUrl: any) {
    for (const item of narray) {
      // Check if the `items` array exists in the top-level object
      if (item.items) {
        // Iterate through each item in the `items` array
        for (const section of item.items) {
          // Check if `children` array exists and search through it
          if (section.children) {
            for (const child of section.children) {
              if (child.url === targetUrl) {
                return item.id; // Return the ID of the first-level object
              }
            }
          }
        }
      }
    }
    return null; // URL not found
  }

  useEffect(() => {
    const result = findActiveUrl(SidebarContent, pathname);
    if (result) {
      setSelectedIconId(result);
    }
  }, [pathname, setSelectedIconId]);

  return (
    <div className="">
      <div className="flex">
        <div className="fixed menu-sidebar pt-6 bg-white dark:bg-darkgray z-[10]">
          <div className="mb-7 px-4 brand-logo">
            <FullLogo />
          </div>

          <SimpleBar className="h-[calc(100vh-32px)] ">
            <div className="   ps-4 rtl:pe-4 rtl:ps-0 pe-4">
              {SidebarContent?.map((section) =>
                section.items?.map((item) => (
                  <div className="mb-4" key={item.heading}>
                    <h5 className="text-link dark:text-white font-semibold text-sm mb-2">
                      <span className="hide-menu">{item.heading}</span>
                    </h5>

                    <Icon
                      icon="solar:menu-dots-bold"
                      className="text-ld block mx-auto  leading-6 dark:text-opacity-60 hide-icon"
                      height={18}
                    />

                    {item.children?.map((child) =>
                      child.children ? (
                        <NavCollapse key={child.id} item={child} />
                      ) : (
                        <NavItems key={child.id} item={child} />
                      )
                    )}
                  </div>
                ))
              )}
            </div>
          </SimpleBar>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
