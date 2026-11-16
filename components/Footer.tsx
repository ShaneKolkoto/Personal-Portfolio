import Image from "next/image";
import React from "react";
import type { CvData } from "@/lib/cv";

type Props = { socials: NonNullable<CvData["socials"]> };

function safeUrl(value?: string | null) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

const socialImages: Record<string, string> = {
  github: "/Github.svg",
  linkedin: "/LinkedIn.svg",
  medium: "/Medium.svg",
  instagram: "/Instagram.svg",
  twitter: "/Twitter.svg",
};

export default function Footer({ socials }: Props) {
  const entries = socials.filter((social) => social.platform && safeUrl(social.url));

  return (
    <footer className="container mx-auto mt-12 border-t border-white/[0.08] pb-8 pt-10 sm:mt-16 sm:pt-12">
      {entries.length ? (
        <nav aria-label="Social links" className="flex flex-wrap justify-center gap-x-5 gap-y-4 pb-10">
          {entries.map((social, index) => {
            const image = socialImages[social.platform!.toLowerCase()];
            return (
              <a href={safeUrl(social.url)} rel="noopener noreferrer" target="_blank" key={`${social.platform}-${index}`} className="z-[1] rounded-md p-1 text-gray-300 transition-transform hover:scale-110 hover:text-white">
                {image ? (
                  <Image src={image} height={30} width={30} alt={social.platform!} />
                ) : (
                  <span>{social.platform}</span>
                )}
              </a>
            );
          })}
        </nav>
      ) : null}
      <p className="text-center text-sm text-gray-300">Created with ❤️ using Next.js. Powered by <a href="https://jadi-iota.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline">Jadi</a></p>
    </footer>
  );
}
