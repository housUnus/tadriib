"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

interface MyAppProps {
    title?:string;
  }

const SocialButtons: React.FC<MyAppProps> = ({ title }) => {
  return (
    <>
      <div className="flex justify-between gap-8 my-6 ">
        <Link
          href={"/"}
          className="px-4 py-2.5 border border-ld flex gap-2 items-enter w-full rounded-md text-center justify-center text-dark dark:text-white text-primary-ld"
        >
          <Image src={"/images/svgs/google-icon.svg"} alt="google" height={18} width={18} /> Google
        </Link>
        <Link
          href={"/"}
          className="px-4 py-2.5 border border-ld flex gap-2 items-enter w-full rounded-md text-center justify-center text-dark dark:text-white text-primary-ld"
        >
          <Image src={"/images/svgs/facebook-icon.svg"} alt="google" height={18} width={18} />
          Facebook
        </Link>
      </div>
      {/* Divider */}
      {/* <HRText text={`${title}`} className="border-t! border-ld! bg-transparent!" /> */}
      <div className="relative my-6">
        <Separator className="bg-ld" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          px-4 bg-background text-bodytext text-sm">
          {title}
        </span>
      </div>
    </>
  );
};

export default SocialButtons;
