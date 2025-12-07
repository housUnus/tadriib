"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AuthRegister = () => {
  return (
    <>
      <form className="mt-6 space-y-4">
        
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="emadd">Email Address</Label>
          <Input id="emadd" type="email" />
        </div>

        <div className="space-y-1">
          <Label htmlFor="userpwd">Password</Label>
          <Input id="userpwd" type="password" />
        </div>

        <Button className="w-full">Sign Up</Button>
      </form>
    </>
  );
};

export default AuthRegister;
