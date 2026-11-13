import React from "react";

type Props = { skills: string[] };

export default function Skills({ skills }: Props) {
  const entries = skills.filter(Boolean);
  if (!entries.length) return null;

  return (
    <section id="skill" className="relative z-10 mx-auto w-full max-w-5xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16">
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-9">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">Tools I use</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Skills</h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {entries.map((skill, index) => (
            <li key={`${skill}-${index}`} className="portfolio-card max-w-full break-words rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/75 sm:px-5 sm:text-base">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
