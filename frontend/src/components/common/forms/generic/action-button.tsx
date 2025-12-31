"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  action: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
};

export function ActionButton({ action, children, className }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      disabled={pending}
      className={cn("w-full", className)}
      onClick={() => startTransition(action)}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
