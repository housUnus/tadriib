"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import FullLogo from "@/app/(main)/layout/shared/logo/FullLogo";
import PagesMenu from "./Pagesmenu";
import DemosMenu from "./DemosMenu";
import MobileDrawer from "./MobileDrawer";
import FrontPageMenu from "./FrontPageMenu";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all ${isSticky ? 'bg-white dark:bg-dark shadow-md' : 'bg-white dark:bg-dark'
          }`}>
        <div className='container mx-auto flex items-center justify-between py-6 px-4'>
          <FullLogo />
          {/* Mobile drawer (Hamburger) */}
          <MobileDrawer />
          {/* Desktop Navigation */}
          <nav className='hidden lg:flex gap-6 items-center'>
            <NavigationMenu>
              <NavigationMenuList className='flex gap-4'>
                <NavigationMenuItem>
                  <DemosMenu />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <FrontPageMenu />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <PagesMenu />
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href='https://adminmart.github.io/premium-documentation/nextjs/matdash/index.html'
                    target='_blank'
                    className='py-2! px-4 text-base text-ld hover:text-primary hover:bg-lightprimary rounded-md flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary'>
                    Documentation
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href='https://adminmart.com/#'
                    target='_blank'
                    className='py-2! px-4 text-base text-ld hover:text-primary hover:bg-lightprimary rounded-md flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary'>
                    Support
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button asChild>
                    <Link
                      href='/auth/auth1/login'
                      className='bg-primary'>
                      Login
                    </Link>
                  </Button>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
