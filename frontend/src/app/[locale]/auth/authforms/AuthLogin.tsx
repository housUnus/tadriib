"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const AuthLogin = () => {
  return (
    <>
      <form className="mt-6">
        {/* Username */}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="username">Username</Label>
          </div>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            className="form-control"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="userpwd">Password</Label>
          </div>
          <Input
            id="userpwd"
            type="password"
            placeholder="Enter password"
            className="form-control"
          />
        </div>

        {/* Checkbox + Link */}
        <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" />
            <Label
              htmlFor="accept"
              className="opacity-90 font-normal cursor-pointer"
            >
              Remember this Device
            </Label>
          </div>

          <Link
            href="/auth/auth1/forgot-password"
            className="text-primary text-sm font-medium"
          >
            Forgot Password ?
          </Link>
        </div>

        {/* Submit Button */}
        <Button asChild className="rounded-md w-full">
          <Link href="/">Sign in</Link>
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
