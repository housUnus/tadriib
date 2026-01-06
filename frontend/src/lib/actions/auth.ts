// lib/server-actions/auth.ts
'use server';
import { signIn, signOut } from "@/auth";
import { useServerFetch } from "../../hooks/auth/user-server-fetch";
import { registerSchema, RegisterInput } from "@/schemas/auth";
import { redirect } from "next/navigation";

export async function login(data: { email: string, password: string }) {
    try {
        const res = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false
        });
    } catch (error: unknown) {
        if (typeof error === "object" && error && "type" in error) {
            if (
                (error as any).type === "CredentialsSignin" ||
                (error as any).type === "CallbackRouteError"
            ) {
                return { error: "Invalid credentials!" };
            }
        }
        return { error: "Something went wrong!" };
    }
}

export async function register(payload: RegisterInput) {
    const parsed = registerSchema.safeParse(payload);
    if (!parsed.success) {
        return {
            success: false,
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    const client = await useServerFetch();
    const { data, error } = await client.post("/dj-auth/register/", parsed.data);
    if (error) {
        return { success: false, error };
    }

    return { success: true, error: null };
}

export async function resend_email_verification({ email }: { email: string }) {
    const client = await useServerFetch();
    const res = await client.post("/dj-auth/register/resend-email/", { email: email });
}

export async function verify_email({ key }: { key: string }) {
    const client = await useServerFetch();
    const { data, error } = await client.post("/dj-auth/register/verify-email/", { key });
    if (!error) {
        return { success: true, error: null };
    } else {
        return { success: false, error: data };
    }
}


export async function logoutAction() {
    await signOut({ redirect: false });
    redirect("/auth/login");
}