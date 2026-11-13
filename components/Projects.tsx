import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { CvData } from "@/lib/cv";
import { projectSlug } from "@/lib/projects";

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
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
              {sortedProjects.map((project, index) => {
                const image = project.imageUrl
                  ? `/api/cv-image?url=${encodeURIComponent(project.imageUrl)}`
                  : null;
                const content = (
                  <div className="portfolio-card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.035]">
                    {image ? (
                      <div className="relative h-44 w-full overflow-hidden bg-white/5 sm:h-56">
                        <Image src={image} fill unoptimized alt={`${project.title} project`} className="object-cover" />
                      </div>
                    ) : null}
                    <div className="min-w-0 flex-1 p-5 sm:p-6">
                      <h3 className="break-words text-lg font-semibold text-white sm:text-xl">{project.title}</h3>
                      {project.description && <p className="mt-2 text-sm leading-6 text-white/60 sm:text-base sm:leading-7">{project.description}</p>}
                    </div>
                  </div>
                );
                const slug = projectSlug(project, index);
                return (
                  <Link key={`${project.title}-${index}`} href={`/projects/${slug}`} className="project-card-link">
                    {content}
                  </Link>
                );
              })}
            </div>
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
