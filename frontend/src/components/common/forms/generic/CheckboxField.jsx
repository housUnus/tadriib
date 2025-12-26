"use client";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export default function CheckboxField({
  control,
  name,
  label,
  required = false,
  helperText,
  defaultValue = false,
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
          <div className={cn("flex items-center gap-2 mt-1", className)}>
            <Checkbox
              id={field.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              {...rest}
            />
            {label && (
              <FieldLabel
                htmlFor={field.name}
                className="flex items-center gap-1 cursor-pointer"
              >
                {label}
                {required && (
                  <span className="text-red-500 font-medium" aria-hidden="true">
                    *
                  </span>
                )}
              </FieldLabel>
            )}
          </div>

          {/* Helper Text */}
          {helperText && !fieldState.error && (
            <p className="text-xs text-gray-500 mt-1">{helperText}</p>
          )}

          {/* Error */}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
