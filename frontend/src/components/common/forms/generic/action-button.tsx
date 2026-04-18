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
  onActionDone?: () => void
};

export function ActionButton({ action, children, className, variant, onActionDone }: Props) {
  const [pending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(action)
    onActionDone && onActionDone(); 
  };

  return (
    <Button
      disabled={pending}
      className={cn("w-full", className)}
      onClick={handleClick}
      variant={variant}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
