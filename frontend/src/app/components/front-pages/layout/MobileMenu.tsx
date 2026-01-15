"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import FullLogo from "@/app/[locale]/(main)/layout/shared/logo/FullLogo";
import Navigation from "./Navigation";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:hidden flex">
      <Sheet open={open} onOpenChange={setOpen}>
        {/* Trigger Button */}
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center justify-center text-dark h-10 w-10 rounded-full bg-transparent hover:bg-lightprimary"
          >
            <IconMenu2 className="shrink-0" />
          </Button>
        </SheetTrigger>

        {/* Sheet Content (acts like Drawer) */}
        <SheetContent
          side="left"
          className="w-[280px] sm:w-[320px] bg-white dark:bg-darkgray p-6 flex flex-col justify-between"
        >
          <div>
            <SheetHeader className="mb-6 p-0">
              <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Navigation drawer for mobile devices
              </SheetDescription>
              <FullLogo />
            </SheetHeader>

            <div className="flex flex-col gap-4">
              <Navigation />
            </div>
          </div>

          {/* Footer Button */}
          <SheetFooter className="p-0 mt-6">
            <SheetClose asChild>
              <Button
                asChild
                className="font-bold w-full bg-sky hover:bg-sky/90 text-white"
              >
                <Link href="/auth/login">Log in</Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
