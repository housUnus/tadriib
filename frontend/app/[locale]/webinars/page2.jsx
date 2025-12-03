"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import InputField from "@/components/common/forms/generic/InputField";
import { Field, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import Select2Field from "@/components/common/forms/generic/SelectField";
import RadioField from "@/components/common/forms/generic/RadioField";
import CheckboxField from "@/components/common/forms/generic/CheckboxField";
import DatePickerField from "@/components/common/forms/generic/DatePickerField";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});

export default function Webinars({}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  console.log("form values", form.watch());
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Bug Report</CardTitle>
        <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-rhf-demo"
          onSubmit={form.handleSubmit((data) => {
            console.log(data);
          })}
        >
          <FieldGroup>
            <InputField
              type="date"
              name="title"
              control={form.control}
              label="Bug Title"
            />
            <Select2Field
              name="jobs"
              control={form.control}
              label="Jobs Title"
              options={[
                { value: "job1", label: "Job 1" },
                { value: "job2", label: "Job 2" },
                { value: "job3", label: "Job 3" },
              ]}
            />
            <RadioField
              required
              disabled
              control={form.control}
              name="plan"
              label="Select Plan"
              options={[
                { label: "Basic", value: "basic" },
                { label: "Pro", value: "pro" },
                { label: "Enterprise", value: "enterprise" },
              ]}
            />
            <CheckboxField
              control={form.control}
              name="terms"
              label="I agree to the terms"
            />
            <DatePickerField
              control={form.control}
              name="terms"
              label="I agree to the terms"
              placeholder="Pick a date"
              helperText="Choose when your event will take place"
              required
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
