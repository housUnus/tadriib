"use client";
import { register } from "@/lib/actions/auth";
import { useForm } from "react-hook-form";
import InputField from "@/components/common/forms/generic/InputField";
import { registerSchema, RegisterInput } from "@/schemas/auth";
import { signIn } from "next-auth/react"; // NOT your "@/auth"
import LoadingButton from "@/components/common/forms/generic/LoadingButton";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import SubmitButton from "@/components/common/forms/generic/SubmitButton";

const BoxedAuthRegister = () => {

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
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
      Object.entries(result.error).forEach(([field, messages]) => {
        if (messages?.[0]) {
          setError(field as keyof RegisterInput, {
            message: messages[0],
          });
        }
      });
      return
    }

    const loginResult = await signIn("credentials", {
      redirectTo: "/",
      email: data.email,
      password1: data.password1,
    });
  };


  return (
    <>
      <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
        {/* First Name + Last Name */}
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <InputField name="first_name" type="text" placeholder="First Name" control={control} label="First Name" />
          </div>
          <div className="flex-1">
            <InputField name="last_name" type="text" placeholder="Last Name" control={control} label="Last Name" />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <InputField name="email" type="email" placeholder="Enter Your Email" control={control} label="Email Address" />
        </div>

        <div className="mb-4">
          <InputField name="password1" type="password" placeholder="Enter Your Password" control={control} label="Password" />
        </div>

        {/* Country */}
        <div className="mb-4">
          <InputField name="country" type="text" placeholder="Select Country" control={control} label="Country" />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <InputField name="phone_number" type="text" placeholder="(+91) Enter Your Phone Number" control={control} label="Phone Number" />
        </div>

        {/* Button */}
        <SubmitButton
          className="rounded-md w-full bg-primary hover:bg-primaryemphasis"
          control={control}
        >
          Sign Up
        </SubmitButton>
      </form>

    </>
  );
};

export default BoxedAuthRegister;
