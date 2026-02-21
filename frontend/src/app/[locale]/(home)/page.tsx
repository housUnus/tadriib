import CertificatesSection from "@/app/components/front-pages/homepage/Certificates";
import ClientReviews from "@/app/components/front-pages/homepage/ClientReviews";
import Companies from "@/app/components/front-pages/homepage/Companies";
import Courses from "@/app/components/front-pages/homepage/Courses";
import { Highlights } from "@/app/components/front-pages/homepage/Highlights";
import MainBanner from "@/app/components/front-pages/homepage/MainBanner";
import OurClients from "@/app/components/front-pages/homepage/OurClients";
import CtaSection from "@/app/components/front-pages/homepage/CtaSection";
import { StatsSection } from "@/app/components/front-pages/homepage/StatsSection";
import type { Metadata } from "next";
import { useServerFetch } from "@/hooks/auth/user-server-fetch";

export const metadata: Metadata = {
  title: "Ruwad Academy For Training - رواد أكاديمي للتدريب",
  description: "Ruwad Academy For Training - رواد أكاديمي للتدريب",
};

const page = async () => {
    const client = await useServerFetch();
  const res = await client.get("/courses/?limit=3");
  const { data, error } = res as { data: any; error?: any };
  console.log("🚀 ~ page ~ data: ");
  return (
    <>
      {/* <Hero /> */}
      <MainBanner />
      <OurClients />
      {/* <FeatureTabs /> */}
      <CertificatesSection />
      <StatsSection />
      <Courses courses={data?.results || []} />
      {/* <OurTeam /> */}
      {/* <ContactBar /> */}
      <Highlights />
      <ClientReviews />
      {/* <Companies /> */}
      {/* <Packages /> */}
      {/* <FAQ/> */}
      <CtaSection/>
    </>
  );
};




export default page;
