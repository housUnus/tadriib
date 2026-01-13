"use client";
import React, { useContext } from "react";
import Sidebar from "./layout/vertical/sidebar/Sidebar";
import Header from "./layout/vertical/header/Header";
import { Customizer } from "./layout/shared/customizer/Customizer";
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
        <div className="page-wrapper flex w-full">
          {/* Header/sidebar */}

          <Activity mode={activeLayout == "vertical" ? "visible" : "hidden"}>
            <div className="xl:block hidden">
              <Sidebar />
            </div>
          </Activity>
          <div className="page-wrapper-sub body-wrapper flex flex-col w-full bg-white dark:bg-darkgray">
            {/* Top Header  */}

            {activeLayout == "horizontal" ? (
              <Header layoutType="horizontal" />
            ) : (
              <Header layoutType="vertical" />
            )}

            <div
              className={`bg-lightgray dark:bg-dark h-full ${activeLayout != "horizontal" ? "rounded-bb" : "rounded-none"
                } `}
            >
              {/* Body Content  */}
              <div
                className={` ${isLayout == "full"
                  ? "w-full py-[30px] md:px-[30px] px-5"
                  : "container py-[30px]"
                  } ${activeLayout == "horizontal" ? "xl:mt-3" : ""}
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
