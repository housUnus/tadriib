"use client";

import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/utils";

type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  helperText?: string;
  className?: string;
  rules?: RegisterOptions<T>;
  disabled?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">;

export default function InputField<T extends FieldValues>({
  name,
  label,
  type = "text",
  required = false,
  helperText,
  className,
  rules,
  disabled,
  ...rest
}: InputFieldProps<T>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control as Control<T, any, FieldValues>}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-0">
          {label && (
            <FieldLabel htmlFor={field.name} className="flex items-center gap-1">
              {label}
              {required && (
                <span className="text-red-500 font-medium">*</span>
              )}
            </FieldLabel>
          )}

          <Input
            {...field}
            id={field.name}
            type={type}
            aria-invalid={fieldState.invalid}
            className={cn(`mt-1`, className)}
            variant={fieldState.error? 'failure':'default'}
            disabled={disabled}
            {...rest}
          />

          {helperText && !fieldState.error && (
            <p className="text-xs text-gray-500 mt-1">{helperText}</p>
          )}

          {fieldState.error && (
            <FieldError errors={[fieldState.error]} />
          )}
        </Field>
      )}
    />
  );
}
