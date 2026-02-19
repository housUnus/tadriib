"use client";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { FormProvider, FieldValues, UseFormReturn } from "react-hook-form";

type RHFFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => Promise<void>;
  children: React.ReactNode;
  className?: string;
};

export function RHFForm<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: RHFFormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        className={className}
        onSubmit={form.handleSubmit(onSubmit ?? (async () => {}))}
        noValidate
      >
        {form.formState.errors.root &&
          <div className="mb-2">
            <Alert variant="lighterror">
              <AlertTitle className="text-error">{form.formState.errors.root.message}</AlertTitle>
            </Alert>
          </div>
        }
        {children}
      </form>
    </FormProvider>
  );
}
