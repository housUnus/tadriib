"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { Control, FieldValues, useFormState, useFormContext } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps<T extends FieldValues>
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function SubmitButton<T extends FieldValues>({
  children,
  className,
  disabled,
  ...rest
}: SubmitButtonProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
    console.log("🚀 ~ SubmitButton ~ errors:", errors)
  const { isSubmitting, isValid, isDirty } = useFormState({ control });

  return (
    <Button
      type="submit"
      disabled={isSubmitting || disabled }
      className={cn("relative flex items-center justify-center", className)}
      {...rest}
    >
      {isSubmitting && (
        <Loader2 className="absolute left-3 h-4 w-4 animate-spin" />
      )}

      <span className={isSubmitting ? "opacity-50" : ""}>
        {children}
      </span>
    </Button>
  );
}
