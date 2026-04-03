"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import SimpleSelect from "./Select/simple-select";
import { cn } from "@/lib/utils/utils";

export default function Select2Field({ name, className="", label, ...rest }) {
    const {
      control,
      formState: { errors },
    } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-0">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <SimpleSelect
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            {...rest}
            className={cn(`mt-1 ${fieldState.error ? "border-red-500" : ""}`, className)}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
