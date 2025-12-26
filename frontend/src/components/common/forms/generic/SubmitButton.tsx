"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { Control, FieldValues, useFormState } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SubmitButtonProps<T extends FieldValues>
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  control: Control<T>;
  className?: string;
}

export default function SubmitButton<T extends FieldValues>({
  children,
  className,
  disabled,
  control,
  ...rest
}: SubmitButtonProps<T>) {
  const { isSubmitting, isValid, isDirty } = useFormState({ control });

  const isLoading = isSubmitting;

  return (
    <Button
      type="submit"
      disabled={isLoading || disabled || !isValid || !isDirty}
      className={cn("relative flex items-center justify-center", className)}
      {...rest}
    >
      {isLoading && (
        <Loader2 className="absolute left-3 h-4 w-4 animate-spin" />
      )}

      <span className={isLoading ? "opacity-50" : ""}>
        {children}
      </span>
    </Button>
  );
}
