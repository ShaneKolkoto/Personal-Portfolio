import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarsBackground";
import Navbar from "@/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://personal-portfolio-dxm0vcep9-shane-kolkotos-projects.vercel.app/"
  ),
  title: "Shane Kolkoto Portfolio",
  description: "Developer Portfolio By Shane Kolkoto",
  keywords: ["Fullstack Developer","Developer", "Portfolio", "Developer Portflio", "Shane Kolkoto", "Web Developer", "Portfolio"],
  openGraph: {
    title: "Shane Kolkoto",
    description: "Fullstack Developer",
    images: "/Me.png",
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
        {children}
      </body>
    </html>
  );
}
