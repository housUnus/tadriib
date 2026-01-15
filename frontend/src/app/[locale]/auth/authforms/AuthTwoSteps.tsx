"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";

const AuthTwoSteps = () => {
  const pathname = usePathname();

  return (
    <>
      <form className="mt-6 space-y-4">
        <div className="space-y-2">
          <Label>Type your 6 digits security code</Label>

          <div className="flex gap-3.5">
            {[...Array(6)].map((_, i) => (
              <Input
                key={i}
                type="text"
                maxLength={1}
                className="text-center"
              />
            ))}
          </div>
        </div>

        {pathname === "/auth/two-steps" ? (
          <Button className="w-full bg-sky dark:bg-sky hover:bg-dark dark:hover:bg-dark">
            Verify My Account
          </Button>
        ) : (
          <Button className="w-full">Verify My Account</Button>
        )}
      </form>
    </>
  );
};

export default AuthTwoSteps;
