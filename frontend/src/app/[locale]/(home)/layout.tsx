"use client";
// import { ThemeProvider } from "flowbite-react";
// import customTheme from "@/utils/theme/custom-theme";
import AnnouncementBar from "../../components/front-pages/layout/AnnouncementBar";
import FrontHeader from "../../components/front-pages/layout/Header";
import { Footer } from "../../components/front-pages/layout/Footer";
import { SessionProvider } from "next-auth/react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="frontend-page bg-white dark:bg-dark">
        <AnnouncementBar />
        <FrontHeader />
        {/* Content */}
        {children}
        {/* Footer */}
        <Footer />
      {/* </ThemeProvider> */}
    </div>
  );
}
