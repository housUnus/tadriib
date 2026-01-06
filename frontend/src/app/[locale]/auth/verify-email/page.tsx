// app/[locale]/auth/verify-email/page.tsx
import Logo from "@/app/[locale]/(main)/layout/shared/logo/FullLogo";
import CardBox from "@/app/components/shared/CardBox";
import BoxedAuthSlider from "../authforms/BoxedAuthSlider";
import VerifyEmailClient from "../authforms/VerifyEmailClient";
import { useServerFetch } from "@/hooks/auth/user-server-fetch";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-cover bg-center bg-[url('/images/backgrounds/login-bg.jpg')]">
      <div className="flex h-full justify-center items-center px-4">
        <CardBox className="xl:max-w-6xl lg:max-w-3xl md:max-w-xl w-full border-none p-0">
          <div className="grid grid-cols-12">
            <div className="xl:col-span-6 col-span-12 px-8 xl:border-e border-ld">
              <div className="md:py-14 py-8 lg:px-6">
                <Logo />
                <VerifyEmailClient emailKey={key}/>
                <div className="text-ld opacity-80 text-sm font-medium mt-6">
                  Need help? Contact us at support@ruwadacademy.com
                </div>
              </div>
            </div>

            <div className="xl:col-span-6 col-span-12 xl:block hidden">
              <BoxedAuthSlider />
            </div>
          </div>
        </CardBox>
      </div>
    </div>
  );
}
