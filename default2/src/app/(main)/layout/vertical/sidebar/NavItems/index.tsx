"use client";

import React from "react";
import { ChildItem } from "../Sidebaritems";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";

interface NavItemsProps {
  item: ChildItem;
  isInsideCollapse?: boolean;
}
const NavItems: React.FC<NavItemsProps> = ({ item, isInsideCollapse }) => {
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  const { t } = useTranslation();

  const isExternal = /^https?:\/\//.test(item.url);

  const closeSidebar = () => {
    setOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isExternal) {
      e.preventDefault();
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
    closeSidebar();
  };

  return (
    <>
      <SidebarMenuItem
        className={`list-none
          hover:transform hover:translate-x-1 transition-all duration-200 ease-in-out
   p-3  mb-1 gap-3 !text-[15px] text-start leading-[normal] rounded-full
    ${
      item.disabled
        ? "opacity-50 cursor-default hover:bg-transparent text-link dark:text-white/70 hover:text-link"
        : item.url === pathname
        ? isInsideCollapse
          ? "!text-primary bg-transparent"
          : `${item.icon ? "!text-primary" : "!text-link"} bg-lightprimary`
        : isInsideCollapse
        ? "text-link dark:text-white hover:text-primary dark:hover:text-primary bg-transparent group/icon"
        : "text-link dark:text-white hover:text-primary dark:hover:text-primary bg-transparent hover:bg-lightprimary dark:hover:bg-lightprimary group/icon"
    }
  `}
      >
        <SidebarMenuButton
          asChild
          className="p-0 !h-auto rounded-none
           !bg-transparent
           !text-inherit
           !hover:bg-transparent
            !hover:text-primary
            !focus-visible:ring-0
            !active:bg-transparent
            !active:text-inherit
           !peer-hover/menu-button:text-primary !important

        "
        >
          <Link href={item.url} onClick={handleClick}>
            <span className="flex gap-3 align-center items-center truncate w-full rtl:text-right">
              {item.icon ? (
                <Icon
                  icon={item.icon}
                  className={`${item.color} my-0.5 `}
                  height={20}
                />
              ) : (
                <Icon
                  icon="fad:armrecording"
                  height={10}
                  className="transition-colors duration-200 hover:text-primary dark:hover:text-primary text-darklink dark:text-white"
                />
              )}
              <div
                className="max-w-36 overflow-hidden hide-menu flex-1 truncate !leading-normal *:
              "
              >
                {t(`${item.name}`)}
                {(item as any).subtitle ? (
                  <p className="text-xs mt-1">
                    {t(`${(item as any).subtitle}`)}
                  </p>
                ) : null}
              </div>{" "}
              {item.badge && item.badgeType === "filled" && (
                <Badge className="hide-menu"> {item.badgeContent}</Badge>
              )}
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  );
};

export default NavItems;
