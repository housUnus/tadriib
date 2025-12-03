"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const LeftSidebarPart = () => {
  return (
    <>
      <div className="circle-top"></div>
      <div>
        <Image src={"/images/logos/logo-icon.svg"} alt="materilm" className="circle-bottom" width={35} height={35} />
      </div>
      <div className="flex xl:justify-start justify-center xl:ps-80 h-screen items-center z-10 relative">
        <div className="max-w-md">
          <h2 className="text-white text-40 font-bold leading-[normal]">
            Welcome to
            <br></br>
            MatDash
          </h2>
          <p className="opacity-75 text-white my-4 text-base font-medium">
            MatDash helps developers to build organized and well coded
            dashboards full of beautiful and rich modules.
          </p>
          <Button className="mt-6">Learn More</Button>
        </div>
      </div>
    </>
  );
};

export default LeftSidebarPart;
