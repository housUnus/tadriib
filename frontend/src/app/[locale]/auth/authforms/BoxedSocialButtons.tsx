"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";

interface MyAppProps {
  title?: string;
}

const BoxedSocialButtons: React.FC<MyAppProps> = ({ title }) => {
  const handleGoogleSignIn = () => {
    // Trigger NextAuth Google OAuth
    signIn("google", { callbackUrl: "/" }); // redirect to "/" after login
  };

  return (
    <>
      <div className="flex justify-between gap-8 mb-6 md:mt-10 mt-5">
        {/* <Link
          href={"/"}
          className="px-4 py-3 shadow-tw border border-ld flex gap-2 items-enter w-full rounded-md text-center justify-center text-ld hover:bg-sky hover:text-white dark:text-white dark:hover:bg-sky font-semibold"
        >
          <Image src={"/images/svgs/facebook-icon.svg"} alt="google" height={18} width={18} />
          <span className="lg:flex items-center hidden">Sign in with</span>Facebook
        </Link> */}
        <button
          onClick={handleGoogleSignIn}
          className="px-4 py-3 shadow-tw border border-ld flex gap-2 items-center w-full rounded-md text-center justify-center text-ld hover:bg-sky hover:text-white dark:text-white dark:hover:bg-sky font-semibold"
        >
          <Image
            src="/images/svgs/google-icon.svg"
            alt="google"
            height={18}
            width={18}
          />
          <span className="lg:flex items-center hidden">Sign in with</span>
          Google
        </button>
      </div>
      {/* Divider */}
      <div className="relative my-6">
        <div className="h-px bg-bodytext/30" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
          px-4 bg-background text-bodytext text-sm">
          {title}
        </span>
      </div>
    </>
  );
};

export default BoxedSocialButtons;
