import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StarsCanvas from "@/components/main/StarsBackground";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://developer-portfolio-shane-kolkoto.vercel.app"
  ),
  title: "Shane Kolkoto Portfolio",
  description: "Developer Portfolio By Shane Kolkoto",
  keywords: ["Fullstack Developer","Developer", "Portfolio", "Developer Portflio", "Shane Kolkoto"],
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
