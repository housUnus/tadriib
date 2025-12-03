"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FrontMenu } from "../Data";
import { IconChevronDown } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const FrontPageMenu = () => {
  return (
    <div className="relative group/menu me-0">
      <DropdownMenu>
        {/* Trigger */}
        <DropdownMenuTrigger asChild>
          <button className="py-2! px-4 text-base text-ld hover:text-primary hover:bg-lightprimary rounded-md flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary group-hover/menu:text-primary">
            Frontend Pages <IconChevronDown className="ms-1" size={15} />
          </button>
        </DropdownMenuTrigger>

        {/* Dropdown Content */}
        <DropdownMenuContent
          align="center"
          className="w-screen xl:w-[1150px] rounded-sm xl:p-6 p-3 bg-white dark:bg-darkgray shadow-lg"
        >
          <div className="mb-5">
            <h5 className="font-semibold text-lg">Different Front Pages</h5>
            <p className="text-sm text-muted-foreground">
              Included with the Package
            </p>
          </div>

          <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
            {FrontMenu.slice(0, 5).map((item, index) => (
              <div key={index}>
                <div className="overflow-hidden rounded-md relative flex justify-center items-center group">
                  <Image
                    src={item.img}
                    alt="matdash"
                    width={250}
                    height={140}
                    className="w-full object-cover"
                  />

                  {/* Hover Overlay */}
                  {item.include === "Included With The package" ? null : (
                    <>
                      <Button
                        asChild
                        size="sm"
                        className="text-xs absolute left-0 right-0 flex justify-center items-center w-fit mx-auto invisible group-hover:visible z-10"
                      >
                        <Link href={item.link}>Live Preview</Link>
                      </Button>
                      <div className="absolute inset-0 bg-blue-100/60 mix-blend-multiply invisible group-hover:visible rounded-md"></div>
                    </>
                  )}
                </div>

                <h5 className="text-center p-3 pb-0 text-sm font-semibold">
                  {item.name}
                </h5>

                {item.include === "Included With The package" && (
                  <p className="text-xs text-center text-muted-foreground">
                    Included With The package
                  </p>
                )}
              </div>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FrontPageMenu;
