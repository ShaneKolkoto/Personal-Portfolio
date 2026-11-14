import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCv } from "@/lib/cv";
import { experienceSlug } from "@/lib/experience";

type Props = { params: { slug: string } };

function dateLabel(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(date);
}

function safeUrl(value?: string | null) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

async function findJob(slug: string) {
  const result = await getCv();
  if (!result.ok) return result;
  const index = (result.data.jobs ?? []).findIndex((job, jobIndex) => experienceSlug(job, jobIndex) === slug);
  return index < 0
    ? { ok: true as const, job: null }
    : { ok: true as const, job: result.data.jobs![index] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await findJob(params.slug);
  if (!result.ok || !result.job) return { title: "Experience not found" };
  const title = `${result.job.position} at ${result.job.companyName}`;
  return {
    title,
    description: result.job.description?.slice(0, 160) || `Explore Shane Kolkoto's experience at ${result.job.companyName}.`,
    alternates: { canonical: `/experience/${params.slug}` },
    openGraph: { title, description: result.job.description?.slice(0, 160) || title },
  };
}

export default async function ExperienceDetails({ params }: Props) {
  const result = await findJob(params.slug);
  if (!result.ok) {
    return (
      <main className="relative z-10 mx-auto min-h-screen max-w-4xl px-5 pb-20 pt-28 text-white sm:px-8">
        <h1 className="text-3xl font-semibold">Experience unavailable</h1>
        <p className="mt-3 text-white/70">{result.message}</p>
        <Link href="/#experience" className="mt-8 inline-flex rounded-full border border-white/20 px-5 py-3 text-sm transition-colors hover:border-purple-300 hover:bg-white/10">
          Back to experience
        </Link>
      </main>
    );
  }
  if (!result.job) notFound();

  const { job } = result;
  const companyUrl = safeUrl(job.companyLink);
  const dates = [
    dateLabel(job.startDate),
    job.isCurrent ? "Present" : dateLabel(job.endDate),
  ].filter(Boolean);

  return (
    <main className="relative z-10 mx-auto min-h-screen max-w-4xl px-5 pb-24 pt-28 text-white sm:px-8">
      <Link href="/#experience" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:border-purple-300 hover:text-white">
        <span aria-hidden="true">←</span> All experience
      </Link>
      <article className="mt-8 rounded-3xl border border-white/10 bg-[#15131b]/85 p-6 shadow-2xl shadow-black/30 sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-purple-300">Work experience</p>
        <h1 className="mt-3 break-words text-3xl font-semibold tracking-tight sm:text-5xl">{job.position}</h1>
        <p className="mt-3 text-lg text-white/70">
          {companyUrl ? <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:text-purple-200">{job.companyName}</a> : job.companyName}
          {job.location ? ` · ${job.location}` : ""}
        </p>
        {dates.length ? <p className="mt-3 text-sm text-white/50">{dates.join(" – ")}</p> : null}
        {job.description ? <div className="mt-8 whitespace-pre-line text-base leading-8 text-white/75 sm:text-lg">{job.description}</div> : null}
        {job.techStack?.length ? (
          <section className="mt-9">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">Technologies</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {job.techStack.filter(Boolean).map((technology, index) => <li key={`${technology}-${index}`} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-sm text-white/75">{technology}</li>)}
            </ul>
          </section>
        ) : null}
        {job.references?.length ? (
          <section className="mt-9">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/60">References</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {job.references.map((reference, index) => (
                <li key={`${reference.name}-${index}`} className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
                  <p className="font-medium text-white">{reference.name}</p>
                  {reference.position ? <p className="mt-1 text-sm text-white/60">{reference.position}</p> : null}
                  {reference.contact ? <p className="mt-2 break-words text-sm text-white/60">{reference.contact}</p> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
}
