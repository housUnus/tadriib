"use client";
import { Controller } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import moment from "moment";
import { useState } from "react";

export default function DatePickerField({
  control,
  name,
  label,
  placeholder = "Select date",
  required = false,
  helperText,
  defaultValue = null,
  className,
  withTime = false, // 👈 optional to switch between date and datetime
  ...rest
}) {
  const [open, setOpen]   = useState(false);
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        const selectedDate = field.value ? new Date(field.value) : null;

        return (
          <Field data-invalid={fieldState.invalid}>
            {/* Label */}
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

            {/* Date Picker */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground",
                    className
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                      moment(selectedDate).format("YYYY-MM-DD")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  className={cn(`mt-1 ${fieldState.error ? "border-red-500" : ""}`, className)}
                  selected={selectedDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    if (date) {
                      const formatted =  moment(date).format("YYYY-MM-DD");
                      field.onChange(formatted);
                    } else {
                      field.onChange(null);
                    }
                    setOpen(false);
                  }}
                  {...rest}
                />
              </PopoverContent>
            </Popover>

            {/* Helper text */}
            {helperText && !fieldState.error && (
              <p className="text-xs text-gray-500 mt-1">{helperText}</p>
            )}

            {/* Error */}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
