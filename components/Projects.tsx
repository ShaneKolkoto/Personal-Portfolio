import React from "react";
import type { CvData } from "@/lib/cv";
import ProjectCarousel from "@/components/ProjectCarousel";

type Props = {
  projects: NonNullable<CvData["projects"]>;
  hobbies: NonNullable<CvData["hobbies"]>;
};

export default function Projects({ projects, hobbies }: Props) {
  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  return (
    <>
      {sortedProjects.length ? (
        <section id="projects" className="scroll-mt-24 py-12 sm:py-16">
          <div className="mx-auto mb-7 max-w-6xl px-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">Selected work</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Projects</h2>
          </div>
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <ProjectCarousel projects={sortedProjects} />
          </div>
        </section>
      ) : null}
      {hobbies.length ? (
        <section className="mx-auto mt-8 max-w-6xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">Outside of work</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Interests</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {hobbies.map((hobby, index) => (
              <article key={`${hobby.name}-${index}`} className="portfolio-card min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 text-white/70 sm:p-6">
                <h3 className="break-words font-semibold text-white">{hobby.name}</h3>
                {hobby.description && <p className="mt-2 text-sm leading-6 sm:text-base sm:leading-7">{hobby.description}</p>}
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
