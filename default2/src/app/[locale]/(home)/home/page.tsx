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

export const metadata: Metadata = {
  title: "Front-Homepage",
};

const page = () => {
  return (
    <>
      {/* <Hero /> */}
      <MainBanner />
      <OurClients />
      {/* <FeatureTabs /> */}
      <CertificatesSection />
      <StatsSection />
      <Courses />
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
