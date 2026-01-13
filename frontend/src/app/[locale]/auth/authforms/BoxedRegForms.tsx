"use client";
import { register } from "@/lib/actions/auth";
import { useForm } from "react-hook-form";
import InputField from "@/components/common/forms/generic/InputField";
import { registerSchema, RegisterInput } from "@/lib/schemas/auth";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import SubmitButton from "@/components/common/forms/generic/SubmitButton";
import { ACCOUNT_ROUTE } from "@/lib/auth/routes";
import CountrySelect from "@/components/common/forms/generic/CountryField";
import { signIn } from "next-auth/react";
import { RHFForm } from "@/components/common/forms/RHFForm";
import { applyServerErrors } from "@/components/common/forms/rhfActionHandler";

const BoxedAuthRegister = () => {

  const form = useForm<RegisterInput>({
    resolver: standardSchemaResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password1: "",
      country: "",
      phone_number: "",
    },
  });

  const onSubmit = async (data: RegisterInput) => {
    const result = await register(data);
    if (!result.success && result.error) {
      applyServerErrors(result.error, form.setError);
    }

    await signIn("credentials", {
      redirectTo: ACCOUNT_ROUTE,
      email: data.email,
      password: data.password1,
    });
  };




  return (
    <>
      <RHFForm form={form} className="mt-2" onSubmit={onSubmit}>
        {/* First Name + Last Name */}
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <InputField name="first_name" type="text" placeholder="First Name" label="First Name" />
          </div>
          <div className="flex-1">
            <InputField name="last_name" type="text" placeholder="Last Name" label="Last Name" />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <InputField name="email" type="email" placeholder="Enter Your Email" label="Email Address" />
        </div>

        <div className="mb-4">
          <InputField name="password1" type="password" placeholder="Enter Your Password" label="Password" />
        </div>

        {/* Country */}
        <div className="mb-4">
          <CountrySelect name="country" label="Country" className={''} simpleValue />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <InputField name="phone_number" type="text" placeholder="(+91) Enter Your Phone Number" label="Phone Number" />
        </div>

        {/* Button */}
        <SubmitButton
          className="rounded-md w-full bg-primary hover:bg-primaryemphasis"
        >
          Sign Up
        </SubmitButton>
      </RHFForm>

    </>
  );
};

export default BoxedAuthRegister;
