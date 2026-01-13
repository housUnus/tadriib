"use client";
import React, { useContext } from "react";
import { Customizer } from "../(main)/layout/shared/customizer/Customizer";
import { CustomizerContext } from "@/app/context/CustomizerContext";
import { Activity } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { activeLayout, isLayout } = useContext(CustomizerContext);
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen dark:bg-darkgray">
        <div className="flex w-full">
          {/* Header/sidebar */}

          <div className="flex flex-col w-full bg-white dark:bg-darkgray">
            {/* Top Header  */}

            <div
              className={`bg-lightgray dark:bg-dark h-full ${activeLayout != "horizontal" ? "rounded-bb" : "rounded-none"
                } `}
            >
              {/* Body Content  */}
              <div
                className={` ${isLayout == "full w-full"} ${activeLayout == "horizontal" ? "xl:mt-3" : ""}
            `}
              >
                {children}
              </div>
              {/* <Customizer /> */}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
