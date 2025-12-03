"use client";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export default function RadioGroupField({
  control,
  name,
  label,
  options = [],
  required = false,
  helperText,
  defaultValue = "",
  className,
  rules,
  disabled,
  orientation = "vertical", // or "inline"
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

          <RadioGroup
            id={field.name}
            onValueChange={field.onChange}
            value={field.value}
            className={cn(
              orientation === "inline"
                ? "flex flex-row gap-4 mt-1"
                : "flex flex-col gap-2 mt-1",
              className
            )}
            disabled={disabled}
            {...rest}
          >
            {options.map((opt) => (
              <div key={opt.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={opt.value}
                  id={`${name}-${opt.value}`}
                  disabled={disabled}
                />
                <label
                  htmlFor={`${name}-${opt.value}`}
                  className="text-sm cursor-pointer"
                >
                  {opt.label}
                </label>
              </div>
            ))}
          </RadioGroup>

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
