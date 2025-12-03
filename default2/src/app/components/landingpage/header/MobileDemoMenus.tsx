"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { demosMegamenu, appsMegamenu, FrontMenu } from "../Data";
import * as AppsData from "@/app/(main)/layout/vertical/header/Data";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const MobileDemosMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <Accordion type="single" collapsible className="mt-4 shadow-none">
      {/* ========== Demos Section ========== */}
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="py-3 px-0 text-base font-medium">
          Demos
        </AccordionTrigger>
        <AccordionContent className="px-0 py-3">
          <div className="p-0">
            <div className="mb-5">
              <h5 className="font-semibold text-lg">Different Demos</h5>
              <p className="text-sm text-muted-foreground">
                Included with the Package
              </p>
            </div>

            <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
              {demosMegamenu.map((item, index) => (
                <div key={index}>
                  <div className="overflow-hidden border border-bordercolor rounded-md relative flex justify-center items-center group">
                    <Image
                      src={item.img}
                      alt="matdash"
                      width={250}
                      height={140}
                      className="w-full object-cover"
                    />
                    {item.link && (
                      <>
                        <Button
                          asChild
                          size="sm"
                          className="text-xs absolute left-0 right-0 flex justify-center items-center w-fit mx-auto invisible group-hover:visible z-10 bg-primary text-white hover:bg-primary/90"
                        >
                          <Link href={item.link} onClick={onClose}>Live Preview</Link>
                        </Button>
                        <div className="absolute inset-0 bg-blue-100/60 mix-blend-multiply invisible group-hover:visible rounded-md"></div>
                      </>
                    )}
                  </div>
                  <h5 className="text-center p-3 text-sm font-semibold">
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

            <div className="mt-8">
              <h5 className="font-semibold text-lg mb-5">Different Apps</h5>
              <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
                {appsMegamenu.map((item, index) => (
                  <div key={index}>
                    <div className="overflow-hidden border border-bordercolor rounded-md relative flex justify-center items-center group">
                      <Image
                        src={item.img}
                        alt="matdash"
                        width={250}
                        height={140}
                        className="w-full object-cover"
                      />
                      <Button
                        asChild
                        size="sm"
                        className="text-xs absolute left-0 right-0 flex justify-center items-center w-fit mx-auto invisible group-hover:visible z-10 bg-primary text-white hover:bg-primary/90"
                      >
                        <Link href={item.link} onClick={onClose}>Live Preview</Link>
                      </Button>
                      <div className="absolute inset-0 bg-blue-100/60 mix-blend-multiply invisible group-hover:visible rounded-md"></div>
                    </div>
                    <h5 className="text-center p-3 text-sm font-semibold">
                      {item.name}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ========== Frontend Pages Section ========== */}
      <AccordionItem value="item-2" className="border-none">
        <AccordionTrigger className="py-3 px-0 text-base font-medium">
          Frontend Pages
        </AccordionTrigger>
        <AccordionContent className="px-0 py-3">
          <div className="p-0">
            <div className="mb-5">
              <h5 className="font-semibold text-lg">Different Front Pages</h5>
              <p className="text-sm text-muted-foreground">
                Included with the Package
              </p>
            </div>
            <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
              {FrontMenu.map((item, index) => (
                <div key={index}>
                  <div className="overflow-hidden border border-bordercolor rounded-md relative flex justify-center items-center group">
                    <Image
                      src={item.img}
                      alt="matdash"
                      width={250}
                      height={140}
                      className="w-full object-cover"
                    />
                    {item.link && (
                      <>
                        <Button
                          asChild
                          size="sm"
                          className="text-xs absolute left-0 right-0 flex justify-center items-center w-fit mx-auto invisible group-hover:visible z-10 bg-primary text-white hover:bg-primary/90"
                        >
                          <Link href={item.link}>Live Preview</Link>
                        </Button>
                        <div className="absolute inset-0 bg-blue-100/60 mix-blend-multiply invisible group-hover:visible rounded-md"></div>
                      </>
                    )}
                  </div>
                  <h5 className="text-center p-3 text-sm font-semibold">
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
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ========== Pages Section ========== */}
      <AccordionItem value="item-3" className="border-none">
        <AccordionTrigger className="py-3 px-0 text-base font-medium">
          Pages
        </AccordionTrigger>
        <AccordionContent className="px-0 py-3">
          <div className="grid grid-cols-12 gap-3 w-full">
            {AppsData.appsLink.map((links:any, index) => (
              <div className="col-span-12 xl:col-span-6" key={index}>
                <Link
                  href={links.href}
                  className="flex gap-3 hover:text-primary group relative items-center"
                >
                  <span
                    className={`h-12 w-12 flex justify-center items-center rounded-md ${links?.iconbg}`}
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
                    <p className="text-13 text-muted-foreground">
                      {links.subtext}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MobileDemosMenu;
