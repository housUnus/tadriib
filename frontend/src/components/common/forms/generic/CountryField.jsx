"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import SimpleSelect from "./Select/simple-select";
import countryList from "react-select-country-list";
import { cn } from "@/lib/utils";

export default function CountrySelect({
  name,
  label,
  className="",
  ...rest
}) {
  const options = countryList().getData();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="gap-0">
          <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
          <SimpleSelect
            options={options}
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            {...rest}
            className={cn(
              `mt-1 ${fieldState.error ? "border-red-500" : ""}`,
              className
            )}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
