"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import SimpleSelect from "./Select/simple-select";

export default function Select2({ name, className = "", label, ...rest }) {
  return (
    <Field className="gap-0">
      {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
      <SimpleSelect
        id={name}
        {...rest}
        className={className}
      />
    </Field>
  );
}
