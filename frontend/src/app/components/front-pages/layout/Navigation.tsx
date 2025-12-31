"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge"; // <-- Shadcn Badge import
import { useTranslations } from "next-intl";

const FrontNav = [
  {
    menu: "About Us",
    link: "/frontend-pages/aboutus",
    badge: false,
  },
  {
    menu: "Blog",
    link: "/frontend-pages/blog",
    badge: false,
  },
  {
    menu: "Portfolio",
    link: "/frontend-pages/portfolio",
    badge: true,
  },
  {
    menu: "Dashboard",
    link: "/dashboards/dashboard1",
    badge: false,
  },
  {
    menu: "Pricing",
    link: "/frontend-pages/pricing",
    badge: false,
  },
  {
    menu: "Contact",
    link: "/frontend-pages/contact",
    badge: false,
  },
];

const Navigation = () => {
  const pathname = usePathname();
  const t = useTranslations("home");

  return (
    <ul className="flex xl:flex-row flex-col xl:gap-9 gap-6 xl:items-center">
      {FrontNav.map((item, index) => {
        const isActive = pathname === item.link;
        return (
          <li
            key={index}
            className={`rounded-md font-semibold text-[15px] py-1.5 px-2.5 transition-colors ${
              isActive
                ? "bg-lightprimary text-primary rounded-md"
                : "text-sky dark:text-white hover:text-primary"
            }`}
          >
            <Link
              href={item.link}
              className="flex gap-3 items-center text-primary-ld"
            >
              {item.menu}
              {item.badge && (
                <Badge
                  variant={"lightPrimary"}
                  className="rounded-sm py-1"
                >
                  New
                </Badge>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navigation;
