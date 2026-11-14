import Image from "next/image";
import type { CvData } from "@/lib/cv";

type Props = { profile: NonNullable<CvData["profile"]> };

export default function Banner({ profile }: Props) {
  const photo = profile.photoUrl
    ? `/api/cv-image?url=${encodeURIComponent(profile.photoUrl)}`
    : null;

  return (
    <section className="relative z-10 mx-auto flex min-h-[78svh] w-full max-w-6xl flex-col items-center justify-center gap-8 px-5 pb-12 pt-28 sm:px-8 md:min-h-[82svh] md:flex-row md:gap-12 lg:gap-20">
      <div className="relative shrink-0">
        {photo ? (
          <div className="rounded-full bg-gradient-to-br from-purple-400 via-fuchsia-500 to-orange-300 p-[3px] shadow-[0_0_70px_rgba(168,85,247,0.22)]">
            <Image priority src={photo} height={300} width={300} alt={`${profile.fullName || "Profile"} portrait`} unoptimized className="h-36 w-36 rounded-full border-4 border-[#0b0b10] object-cover sm:h-48 sm:w-48 lg:h-64 lg:w-64" />
          </div>
        ) : null}
      </div>
      <div className="flex min-w-0 max-w-2xl flex-col items-center text-center md:items-start md:text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-300 sm:text-sm">
          Personal portfolio
        </p>
        {profile.fullName ? (
          <h1 className="max-w-full break-words text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Hey I&apos;m {profile.fullName}
          </h1>
        ) : null}
        {profile.jobTitle ? (
          <p className="mt-4 text-base font-medium text-white/65 sm:text-lg">
            {profile.jobTitle}
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
          {profile.email ? (
            <a href="#contact" className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111] transition hover:-translate-y-0.5 hover:bg-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300">
              Get in touch
            </a>
          ) : null}
          <a href="#about" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/40 hover:bg-white/5 hover:text-white">
            About me <span className="ml-2" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}
