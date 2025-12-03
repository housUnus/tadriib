"use client";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function InputField({
  control,
  name,
  label,
  type = "text",
  required = false,
  helperText,
  defaultValue = "",
  className,
  rules,
  disabled,
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {/* Label with required star */}
          {label && (
            <FieldLabel htmlFor={field.name} className="flex items-center gap-1">
              {label}
              {required && (
                <span className="text-red-500 font-medium" aria-hidden="true">
                  *
                </span>
              )}
            </FieldLabel>
          )}

          {/* Input */}
          <Input
            {...field}
            id={field.name}
            type={type}
            aria-invalid={fieldState.invalid}
            className={cn("mt-1", className)}
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
