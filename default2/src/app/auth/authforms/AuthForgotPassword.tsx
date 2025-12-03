"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";

const AuthForgotPassword = () => {
  const pathname = usePathname();
  const isAuth2 = pathname === "/auth/auth2/forgot-password";

  return (
    <>
      <form className="mt-6">
        {/* Email */}
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="emadd">Email Address</Label>
          </div>
          <Input
            id="emadd"
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>

        {/* Button with conditional styling */}
        {isAuth2 ? (
          <Button className="rounded-md w-full bg-primary hover:bg-primaryemphasis">
            Forgot Password
          </Button>
        ) : (
          <Button className="rounded-md w-full">
            Forgot Password
          </Button>
        )}
      </form>
    </>
  );
};

export default AuthForgotPassword;
