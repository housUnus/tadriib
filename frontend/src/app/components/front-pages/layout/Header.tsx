"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from '@/components/ui/button'
import FullLogo from "@/app/[locale]/(main)/layout/shared/logo/FullLogo";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import { Language } from "@/app/[locale]/(main)/layout/vertical/header/Language";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { ActionButton } from "@/components/common/forms/generic/action-button";
import { logoutAction } from "@/lib/actions/auth";

const FrontHeader = () => {
  const [isSticky, setIsSticky] = useState(true);
  const t = useTranslations("home");
  const { data: session } = useSession();


  return (
    <>
      <header
        className={` top-0 z-50 ${isSticky
          ? "bg-white dark:bg-dark shadow-md fixed w-full py-3"
          : "bg-lightgray dark:bg-darkgray lg:py-7 py-3 "
          }`}
      >

        <div className="container-1218 mx-auto  flex justify-between items-center">
          <FullLogo />
          {/* <MobileDrawer/> */}
          <div className="xl:block hidden">
            <Navigation />
          </div>
          {/* <Button as={Link} href="/auth/auth2/login" className="font-bold xl:flex hidden" color={"sky"}>
            Log in
          </Button> */}
          {/* Login Button */}
          <Language />
          {session ? (
            <ActionButton action={logoutAction} className="rounded-full w-fit">
              Logout
            </ActionButton>
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
          <MobileMenu />
        </div>
      </header>
    </>
  );
};

export default FrontHeader;
