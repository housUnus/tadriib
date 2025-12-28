'use client';
import Link from "next/link";
import { login } from "@/lib/actions/auth";
import { useForm } from "react-hook-form";
import InputField from "@/components/common/forms/generic/InputField";
import LoadingButton from "@/components/common/forms/generic/LoadingButton";
import { useRouter } from "next/navigation";
import { Alert, AlertTitle } from "@/components/ui/alert"
import { loginSchema, LoginInput } from "@/schemas/auth";
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import SubmitButton from "@/components/common/forms/generic/SubmitButton";

const BoxedAuthLogin = () => {
  const router = useRouter();
  const { control, handleSubmit, setError, formState: { errors } } = useForm<LoginInput>({
    resolver: standardSchemaResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = async (data: LoginInput) => {
    const result = await login(data);
    console.log("🚀 ~ onSubmit ~ result:", result)

    if (result?.error) {
      setError("root", {
        type: "server",
        message: result?.error ?? "Login failed",
      });
      return
    }

    router.push("/");

  };


  return (
    <>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        {errors.root &&
          <div className="mb-2">
            <Alert variant="lighterror">
              <AlertTitle className="text-error">{errors.root.message}</AlertTitle>
            </Alert>
          </div>
        }
        <div className="mb-4">
          {/* Email */}
          <div className="mb-4">
            <InputField name="email" type="email" placeholder="Enter Your Email" control={control} label="Email Address" required />
          </div>
          <div className="mb-4">
            <InputField name="password" type="password" placeholder="Password" control={control} label="Password" required />
            <Link className="text-xs text-primary" href="/auth/main/forgot-password" >
              Forgot Password ?
            </Link>
          </div>
        </div>

        {/* Checkbox */}
        {/* <div className="flex justify-between my-5">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" defaultChecked />
            <Label htmlFor="accept" className="font-medium cursor-pointer mb-0">
              Keep me logged in
            </Label>
          </div>
        </div> */}

        {/* Button */}
        <SubmitButton
          className="rounded-md w-full bg-primary hover:bg-primaryemphasis"
          control={control}
        >
          Sign In
        </SubmitButton>
      </form>
    </>
  );
};

export default BoxedAuthLogin;
