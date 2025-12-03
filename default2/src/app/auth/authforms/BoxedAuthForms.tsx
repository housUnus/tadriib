"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const BoxedAuthLogin = () => {
  return (
    <>
      <form className="mt-6">
        {/* Email */}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="email">Email Address</Label>
          </div>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="form-control"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="userpwd">Password</Label>
            <Link
              className="text-xs text-primary"
              href="/auth/auth2/forgot-password"
            >
              Forgot Password ?
            </Link>
          </div>
          <Input
            id="userpwd"
            type="password"
            placeholder="Enter your password"
            className="form-control"
          />
        </div>

        {/* Checkbox */}
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" defaultChecked />
            <Label htmlFor="accept" className="font-medium cursor-pointer mb-0">
              Keep me logged in
            </Label>
          </div>
        </div>

        {/* Button */}
        <Button
          asChild
          className="rounded-md w-full bg-primary hover:bg-primaryemphasis"
        >
          <Link href="/">Sign in</Link>
        </Button>
      </form>
    </>
  );
};

export default BoxedAuthLogin;
