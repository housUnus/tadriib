"use client";

import CountrySelect from "@/components/common/forms/generic/CountryField";
import FileField from "@/components/common/forms/generic/FileField";
import InputField from "@/components/common/forms/generic/InputField";
import SubmitButton from "@/components/common/forms/generic/SubmitButton";
import TextAreaField from "@/components/common/forms/generic/TextAreaField";
import { applyServerErrors } from "@/components/common/forms/rhfActionHandler";
import { RHFForm } from "@/components/common/forms/RHFForm";
import { updateUser } from "@/lib/actions/users";
import { userSchema, UserInput } from "@/lib/schemas/users";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateProfile({ user }: { user: UserInput }) {
  const form = useForm<UserInput>({
    resolver: standardSchemaResolver(userSchema),
    mode: "onChange",
    defaultValues: user
  });

  const onSubmit = async (data: UserInput) => {
    const result = await updateUser(user?.id, data);

    if (!result.success && result.error) {
      applyServerErrors(result.error, form.setError);
      return;
    }
    toast.success("Done successfully");
  };

  return (
    <RHFForm form={form} className="mt-4" onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <InputField name="first_name" label="First name" />
          <InputField name="last_name" label="Last name" />
        </div>
        <InputField name="email" label="Email" disabled/>
        <div className="flex flex-col md:f  lex-row gap-2">
          <InputField name="phone_number" label="Phone number" />
          <CountrySelect name="country" label="Country" simpleValue />
        </div>
        <FileField name="avatar" label="Profile Picture"  accept={{"image/*": []}} />

        {/* Profile fields */}
        <TextAreaField name="bio" label="Bio" rows={4} />
        <TextAreaField name="details" label="Details" rows={10} />
        <TextAreaField name="expertise" label="Expertise" rows={5} />
        <InputField
          name="experience_years"
          label="Years of experience"
          type="number"
        />

        <SubmitButton className="w-full">
          Save changes
        </SubmitButton>
      </div>
    </RHFForm>
  );
}
