import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarsBackground";
import Navbar from "@/components/Navbar";
import DiscordBot from "@/components/DiscordBot";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://personal-portfolio-dxm0vcep9-shane-kolkotos-projects.vercel.app/"
  ),
  title: {
    default: "Shane Kolkoto | Software Developer",
    template: "%s | Shane Kolkoto",
  },
  description:
    "Explore the software development portfolio, projects, experience, and skills of Shane Kolkoto.",
  applicationName: "Shane Kolkoto Portfolio",
  authors: [{ name: "Shane Kolkoto" }],
  creator: "Shane Kolkoto",
  keywords: [
    "Shane Kolkoto",
    "software developer",
    "full-stack developer",
    "web development",
    "portfolio",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    title: "Shane Kolkoto | Software Developer",
    description:
      "Explore the software development portfolio, projects, experience, and skills of Shane Kolkoto.",
    siteName: "Shane Kolkoto Portfolio",
    images: "/Me.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shane Kolkoto | Software Developer",
    description:
      "Explore the software development portfolio, projects, experience, and skills of Shane Kolkoto.",
    images: ["/Me.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body
        className={`${inter.className} bg-[#111] overflow-y-scroll overflow-x-hidden`}
      >
        <StarsCanvas />
        <Navbar />
        <DiscordBot />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
