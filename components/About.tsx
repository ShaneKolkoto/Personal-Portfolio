import type { CvData } from "@/lib/cv";

type Props = { profile: NonNullable<CvData["profile"]> };

export default function About({ profile }: Props) {
  if (!profile.about) return null;

  return (
    <section
      id="about"
      className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-2xl shadow-black/10 sm:p-10 lg:p-14">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">A little about me</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">About</h2>
        <p className="mt-5 whitespace-pre-line text-base leading-7 text-white/70 sm:text-lg sm:leading-8">{profile.about}</p>
      </div>
    </section>
  );
}
