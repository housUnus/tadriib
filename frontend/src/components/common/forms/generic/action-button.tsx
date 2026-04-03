"use client";

import { useTransition } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { type VariantProps } from "class-variance-authority"

type Props = {
  action: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
  variant?: VariantProps<typeof buttonVariants>["variant"]
};

export function ActionButton({ action, children, className, variant }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <Button
      disabled={pending}
      className={cn("w-full", className)}
      onClick={() => startTransition(action)}
      variant={variant}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
