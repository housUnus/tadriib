"use client"
import InputField from "@/components/common/forms/generic/InputField";
import SubmitButton from "@/components/common/forms/generic/SubmitButton";
import { applyServerErrors } from "@/components/common/forms/rhfActionHandler";
import { RHFForm } from "@/components/common/forms/RHFForm";
import { changePassword } from "@/lib/actions/auth";
import { ChangePasswordInput, changePasswordSchema } from "@/lib/schemas/auth";
import { UserInput } from "@/lib/schemas/users";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdatePassword({ user }: { user: UserInput }) {
    const form = useForm<ChangePasswordInput>({
        resolver: standardSchemaResolver(changePasswordSchema),
        mode: "onChange",
        defaultValues: {
            old_password: "",
            new_password1: "",
            new_password2: "",
        },
    });

    const onSubmit = async (data: ChangePasswordInput) => {
        const result = await changePassword(user?.id, data);
        if (!result.success && result.error) {
            applyServerErrors(result.error, form.setError);
            return
        }
        toast.success("Done successfully");
        form.reset();
    };

    return (
        <RHFForm form={form} className="mt-2" onSubmit={onSubmit}>
            <div className="mb-4 flex flex-col gap-4">
                <div className="flex-1">
                    <InputField name="old_password" type="text" label="Current Password" />
                </div>
                <div className="flex-1">
                    <InputField name="new_password1" type="text" label="New Password" />
                </div>
                <div className="flex-1">
                    <InputField name="new_password2" type="text" label="Confirm New Password" />
                </div>
            <SubmitButton
                className="rounded-md w-full bg-primary hover:bg-primaryemphasis"
            >
                Update Password
            </SubmitButton>
            </div>
        </RHFForm>
    )
}