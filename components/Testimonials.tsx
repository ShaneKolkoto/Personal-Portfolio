"use client";

import Image from "next/image";
import { useState } from "react";
import type { CvData } from "@/lib/cv";

type Testimonial = NonNullable<CvData["testimonials"]>[number];

type Props = {
  testimonials: Testimonial[];
};

const PAGE_SIZE = 2;

function dateLabel(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const photo = testimonial.photoUrl
    ? `/api/cv-image?url=${encodeURIComponent(testimonial.photoUrl)}`
    : null;
  const longMessage = testimonial.message.length > 360;

  return (
    <article className="testimonial-card flex min-w-0 flex-col rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.055] to-white/[0.02] p-5 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <span aria-hidden="true" className="select-none text-5xl font-serif leading-[0.8] text-purple-300/70">
          “
        </span>
        {dateLabel(testimonial.createdAt) ? (
          <time dateTime={testimonial.createdAt ?? undefined} className="pt-1 text-xs text-white/40">
            {dateLabel(testimonial.createdAt)}
          </time>
        ) : null}
      </div>

      <blockquote
        className={`mt-4 whitespace-pre-line break-words text-sm leading-7 text-white/75 sm:text-base sm:leading-8 ${longMessage && !expanded ? "line-clamp-5" : ""}`}
      >
        {testimonial.message}
      </blockquote>
      {longMessage ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-2 self-start text-sm font-medium text-purple-200 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      ) : null}

      <div className="mt-6 flex min-w-0 items-center gap-3 border-t border-white/[0.08] pt-5">
        {photo ? (
          <Image
            src={photo}
            alt=""
            width={44}
            height={44}
            unoptimized
            className="h-11 w-11 shrink-0 rounded-full bg-white/10 object-cover ring-1 ring-white/10"
          />
        ) : (
          <span
            aria-hidden="true"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-purple-300/10 text-sm font-semibold text-purple-200 ring-1 ring-purple-200/15"
          >
            {testimonial.firstName.slice(0, 1).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">{testimonial.firstName}</p>
          {testimonial.company ? (
            <p className="mt-0.5 truncate text-xs text-white/50">{testimonial.company}</p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function Testimonials({ testimonials }: Props) {
  const [page, setPage] = useState(0);
  if (!testimonials.length) return null;

  const pageCount = Math.ceil(testimonials.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const visibleTestimonials = testimonials.slice(start, start + PAGE_SIZE);
  const indicatorStart = Math.max(0, Math.min(page - 2, pageCount - 5));
  const indicatorCount = Math.min(pageCount, 5);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">
            Kind words
          </p>
          <h2
            id="testimonials-title"
            className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            Testimonials
          </h2>
        </div>
        {pageCount > 1 ? (
          <p className="text-xs text-white/45" aria-live="polite">
            {start + 1}–{Math.min(start + PAGE_SIZE, testimonials.length)} of {testimonials.length}
          </p>
        ) : null}
      </div>

      <div className="grid items-start gap-4 md:grid-cols-2 sm:gap-5" aria-live="polite">
        {visibleTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.firstName}-${testimonial.createdAt ?? start + index}`}
            testimonial={testimonial}
          />
        ))}
      </div>

      {pageCount > 1 ? (
        <nav aria-label="Testimonial pages" className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setPage((value) => Math.max(0, value - 1))}
            disabled={page === 0}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:border-purple-300/40 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <span aria-hidden="true">←</span> Previous
          </button>
          <div className="flex items-center gap-1.5" role="group" aria-label="Choose testimonial page">
            {Array.from({ length: indicatorCount }, (_, offset) => {
              const index = indicatorStart + offset;
              return (
              <button
                type="button"
                key={index}
                aria-label={`Page ${index + 1}`}
                aria-current={page === index ? "page" : undefined}
                onClick={() => setPage(index)}
                className={`h-2 rounded-full transition-all ${page === index ? "w-6 bg-purple-300" : "w-2 bg-white/25 hover:bg-white/55"}`}
              />
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))}
            disabled={page === pageCount - 1}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/75 transition hover:border-purple-300/40 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-35"
          >
            Next <span aria-hidden="true">→</span>
          </button>
        </nav>
      ) : null}
    </section>
  );
}
