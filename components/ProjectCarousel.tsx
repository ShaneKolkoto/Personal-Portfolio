"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties, type FocusEvent } from "react";
import type { CvData } from "@/lib/cv";
import { projectSlug, projectSummary } from "@/lib/projects";

type Project = NonNullable<CvData["projects"]>[number];

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = projects.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % count);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  if (!count) return null;

  const move = (offset: number) => {
    setActiveIndex((index) => (index + offset + count) % count);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setPaused(false);
    }
  };

  return (
    <div
      className="project-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={handleBlur}
      aria-roledescription="carousel"
      aria-label="Featured projects"
    >
      <div className="project-carousel-stage relative mx-auto h-[450px] max-w-5xl sm:h-[500px] lg:h-[520px]">
        {projects.map((project, index) => {
          let distance = index - activeIndex;
          if (distance > count / 2) distance -= count;
          if (distance < -count / 2) distance += count;
          const current = distance === 0;
          const adjacent = Math.abs(distance) === 1;
          const hidden = !current && !adjacent;
          const image = project.imageUrl
            ? `/api/cv-image?url=${encodeURIComponent(project.imageUrl)}`
            : null;
          const slug = projectSlug(project, index);
          const style: CSSProperties = {
            left: `calc(50% + ${distance * 34}%)`,
            transform: `translate3d(-50%, -50%, ${current ? 0 : -100}px) rotateY(${distance * -14}deg) scale(${current ? 1 : 0.88})`,
            opacity: hidden ? 0 : current ? 1 : 0.38,
            zIndex: current ? 10 : 5 - Math.abs(distance),
            pointerEvents: current ? "auto" : "none",
            visibility: hidden ? "hidden" : "visible",
          };

          return (
            <article
              key={`${project.title}-${index}`}
              className={`project-carousel-card absolute left-1/2 top-1/2 w-[82%] max-w-[760px] ${current ? "project-carousel-card-active" : "project-carousel-card-side"}`}
              style={style}
              aria-hidden={!current}
              aria-label={`${index + 1} of ${count}: ${project.title}`}
            >
              <div className={`portfolio-card flex h-[390px] min-w-0 flex-col overflow-hidden rounded-2xl border bg-[#17151f]/95 shadow-2xl shadow-black/40 sm:h-[440px] ${current ? "border-white/20" : "border-white/10"}`}>
                {image ? (
                  <div className="relative h-[200px] shrink-0 overflow-hidden bg-white/5 sm:h-[250px]">
                    <Image
                      src={image}
                      height={224}
                      width={620}
                      unoptimized
                      alt={`${project.title} project`}
                      className={`h-full w-full object-cover ${current ? "" : "brightness-[.55]"}`}
                    />
                  </div>
                ) : (
                  <div aria-hidden="true" className={`h-32 shrink-0 bg-gradient-to-br from-purple-500/30 via-fuchsia-400/10 to-orange-300/20 sm:h-40 ${current ? "" : "brightness-[.65]"}`} />
                )}
                {current ? (
                  <div className="flex min-h-0 flex-1 flex-col items-start p-5 sm:p-6">
                    <h3 className="break-words text-lg font-semibold text-white sm:text-xl">{project.title}</h3>
                    {project.description ? (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/65 sm:line-clamp-3 sm:text-base sm:leading-7">
                        {projectSummary(project.description)}
                      </p>
                    ) : null}
                    <Link
                      href={`/projects/${slug}`}
                      className="mt-auto inline-flex min-h-10 items-center rounded-full border border-purple-300/40 px-4 py-2 text-sm font-medium text-purple-100 transition hover:border-purple-200 hover:bg-purple-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
                    >
                      View project <span className="ml-2" aria-hidden="true">→</span>
                    </Link>
                  </div>
                ) : (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 pb-5 pt-12 sm:px-5">
                    <p className="truncate text-sm font-semibold text-white/90">{project.title}</p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {count > 1 ? (
        <div className="relative z-20 mt-3 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => move(-1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-purple-300/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
          >
            <span aria-hidden="true">←</span>
          </button>
          <div className="flex items-center gap-2" role="group" aria-label="Choose a project">
            {projects.map((project, index) => (
              <button
                type="button"
                key={`${project.title}-${index}-indicator`}
                aria-label={`Show project ${index + 1}: ${project.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 ${index === activeIndex ? "w-7 bg-purple-300" : "w-2.5 bg-white/35 hover:bg-white/70"}`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => move(1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-purple-300/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
          >
            <span aria-hidden="true">→</span>
          </button>
          <span className="sr-only" aria-live="polite">
            Project {activeIndex + 1} of {count}: {projects[activeIndex].title}
          </span>
        </div>
      ) : null}
    </div>
  );
}


