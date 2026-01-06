'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, UpdateSession } from "next-auth/react";
import { Toaster, toast } from 'sonner'
import { resend_email_verification, verify_email } from "@/lib/actions/auth";
import { ActionButton } from "@/components/common/forms/generic/action-button";
import { LucideCross } from "lucide-react";
import { ACCOUNT_ROUTE, DEFAULT_LOGIN_ROUTE } from "@/lib/auth/routes";
import { AppJWT } from "@/schemas/auth";
import { Session } from "next-auth";

interface JwtSession extends Session, AppJWT {
  user: Session['user'] & AppJWT['user'];
}
type Status = "loading" | "success" | "invalid" | "empty" | "already";

export default function VerifyEmailClient({
  emailKey,
}: {
  emailKey?: string;
}) {

  const perform_resend = async (email: string) => {
    try {
      await resend_email_verification({ email: email });
      toast.success("Email has been sent");
    } catch {
      toast.error("Failed to resend email");
    }
  };

  const [status, setStatus] = useState<Status>("loading");
  const router = useRouter();
  const { data: session, update } = useSession() as { data: JwtSession | null, update: UpdateSession};
  const is_email_verified = session?.user?.email_verified;
  
  useEffect(() => {
    if (is_email_verified) {
      setStatus("already");
      return;
    }
    
    if (!emailKey) {
      if (!session) {
        router.push(DEFAULT_LOGIN_ROUTE);
      }
      setStatus("empty");
      return;
    }


    const verify = async () => {
      try {
        const { success, error: msg } = await verify_email({ key: emailKey });

        if (success) {
          setStatus("success");
          if (session) {
              await update({...session, user: {...session.user, email_verified: true}});
            }
        } else {
          setStatus('invalid')
        }

      } catch {
        setStatus("invalid");
      }
    };

    verify();
  }, [emailKey]);

  useEffect(() => {
    if (status === "success" || status === "already") {
      setTimeout(() => {
        router.push(session ? ACCOUNT_ROUTE : "/login");
      }, 2500);
    }
  }, [status, session]);

  // ---------- UI ----------

  return (
    <>
      {status === "loading" && <p className="mt-6 text-sm">Verifying your email…</p>}
      {status === "success" && <p className="mt-6 text-green-600">Email verified successfully</p>}
      {status === "already" && <p className="mt-6 text-green-600">Email already verified</p>}
      {status === "invalid" && <p className="mt-6 text-red-600"><LucideCross /> Verification link is invalid or expired</p>}
      {status === "empty" && <>
        <h1 className="mt-3 text-xl">Please verify your email</h1>
        <div className="text-ld opacity-80 text-sm font-medium mt-4">
          <div>You're almost there! We sent you an email to verify your account
            <h6 className="text-sm font-bold my-4 ">{session?.user?.email}</h6>
          </div>
          <p>Just click on the link in the email to complete the verification process.</p>
        </div>
      </>
      }
      {session && status !== "already" && status !== "loading" &&
        <div className="text-sm font-medium mt-6 items-center justify-left">
          <p>Link is invalid or didn't get the email?</p>
          <div className="mt-3">
            <ActionButton action={() => perform_resend(session.user?.email || '')} className="w-full rounded-md">
              Resend Email
            </ActionButton>
          </div>
          <Toaster richColors position="top-right" />
        </div>}
    </>

  )
}