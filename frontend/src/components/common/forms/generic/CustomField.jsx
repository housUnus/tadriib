"use client";
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function CustomField({
  name,
  label,
  required = false,
  helperText,
  defaultValue = "",
  className,
  Component: Component = Input,
  ...rest
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {/* Label with required star */}
          {label && (
            <FieldLabel
              htmlFor={field.name}
              className="flex items-center gap-1"
            >
              {label}
              {required && (
                <span className="text-red-500 font-medium" aria-hidden="true">
                  *
                </span>
              )}
            </FieldLabel>
          )}

          {/* Custom Input Component */}
          <Component
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            className={cn(
              `mt-1 ${fieldState.error ? "border-red-500" : ""}`,
              className
            )}
            {...rest}
          />

          {/* Helper Text */}
          {helperText && !fieldState.error && (
            <p className="text-xs text-gray-500 mt-1">{helperText}</p>
          )}

          {/* Error Message */}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
