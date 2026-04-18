"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import { Button } from '@/components/ui/button'
import FullLogo from "@/app/[locale]/(main)/layout/shared/logo/FullLogo";
import MobileMenu from "./MobileMenu";
import { Language } from "@/app/[locale]/(main)/layout/vertical/header/Language";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { GraduationCap, Search } from "lucide-react";
import Categories from "./Categories";
import DesktopSearch from "./DesktopSearch";
import { useClientFetch } from "@/hooks/auth/use-client-fetch";
import { useQuery } from "@tanstack/react-query";
import MobileSearch from "./MobileSearch";
import Profile from "@/app/[locale]/(main)/layout/vertical/header/Profile";
import MyNotifications from "@/app/[locale]/(main)/layout/vertical/header/Notification";
import MyMessages from "@/app/[locale]/(main)/layout/vertical/header/Messages";
import { Icon } from "@iconify/react";
import { CustomizerContext } from "@/app/context/CustomizerContext";

const FrontHeader = () => {
  const [isSticky, setIsSticky] = useState(true);
  const t = useTranslations("home");
  const { data: session } = useSession();
  const client = useClientFetch()
  const { data: categories } = useQuery({
    queryKey: ["nested_categories"],
    queryFn: async () => client.get("/categories/as_nested").then((res: any) => res?.data?.results)
  });

  const { setActiveMode, activeMode } =
    useContext(CustomizerContext);
  
    const toggleMode = () => {
    setActiveMode(activeMode === "light" ? "dark" : "light");
  };

  return (
    <>
      <header
        className={` top-0 z-50 ${isSticky
          ? "bg-white dark:bg-dark shadow-md fixed w-full py-3"
          : "bg-lightgray dark:bg-darkgray lg:py-7 py-3 "
          }`}
      >

        <div className="container-1218 mx-auto flex justify-between items-center">
          <MobileMenu categories={categories} session={session} />
          <div className="flex flex-1 justify-center h-10 md:h-full md:justify-start md:flex-none">
            <FullLogo />
          </div>
          <MobileSearch />
          {/* <MobileDrawer/> */}
          {/* Categories Dropdown - Desktop Only */}
          <NavigationMenu delayDuration={0} className="hidden md:flex md:ml-4 ">
            <NavigationMenuList className=" focus:outline-none">
              <NavigationMenuItem className=" focus:outline-none">
                <NavigationMenuTrigger className="cursor-pointer flex items-center gap-2 px-4 xl:px-5 py-2 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-lg xl:rounded-xl transition-all duration-300 ease-out group h-9">
                  <Search className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                  <span className="font-medium text-sm">Explore</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="focus:outline-none">
                  <Categories categories={categories} />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <DesktopSearch />
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-end justify-end-safe md:gap-4">
            <NavigationMenu delayDuration={0} className="hidden md:flex md:ml-4">
              <NavigationMenuList className=" focus:outline-none">
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-pointer flex items-center gap-2 px-4 xl:px-5 py-2 text-gray-700 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 rounded-lg xl:rounded-xl transition-all duration-300 ease-out group h-9">
                    <GraduationCap className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                    <span className="font-medium text-sm">For Experts</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-2 p-2">
                      <li className="text-center">
                        <NavigationMenuLink asChild>
                          <Button variant="outline" asChild className="w-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
                            <Link href="#">
                              Learn More
                            </Link>
                          </Button>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Button
                            className="w-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                            onClick={() => { }}
                          >
                            <span>Get Started</span>
                          </Button>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Language />
            {session ? (
              <div className="flex gap-3 items-center">
                {/* Theme Toggle */}
                {activeMode === "light" ? (
                  <div
                    className="h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-darkminisidebar  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink  dark:text-white"
                    onClick={toggleMode}
                  >
                    <span className="flex items-center">
                      <Icon icon="solar:moon-line-duotone" width="20" />
                    </span>
                  </div>
                ) : (
                  // Dark Mode Button
                  <div
                    className="h-10 w-10 hover:text-primary hover:bg-lightprimary dark:hover:bg-darkminisidebar  dark:hover:text-primary focus:ring-0 rounded-full flex justify-center items-center cursor-pointer text-darklink  dark:text-white"
                    onClick={toggleMode}
                  >
                    <span className="flex items-center">
                      <Icon icon="solar:sun-bold-duotone" width="20" />
                    </span>
                  </div>
                )}

                {/* <MyMessages /> */}
                <MyNotifications />
                <Profile />
              </div>
            ) : (
              <div className="flex gap-2">
                <Button asChild variant={"outline"} className="font-bold xl:flex hidden">
                  <Link href='/auth/login'>{t('login')}</Link>
                </Button>
                <Button asChild className="font-bold xl:flex hidden">
                  <Link href='/auth/register'>{t('signUp')}</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header >
    </>
  );
};

export default FrontHeader;
