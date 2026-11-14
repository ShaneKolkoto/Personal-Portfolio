import type { CvData } from "@/lib/cv";
import Link from "next/link";
import { experienceSlug, experienceSummary } from "@/lib/experience";

type Props = {
  jobs: NonNullable<CvData["jobs"]>;
  education: NonNullable<CvData["education"]>;
  certifications: NonNullable<CvData["certifications"]>;
};

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

export default function Experience({ jobs, education, certifications }: Props) {
  const hasContent = jobs.length || education.length || certifications.length;
  if (!hasContent) return null;

  return (
    <div id="experience" className="relative z-10 mx-auto w-full max-w-5xl cursor-default px-5 sm:px-8">
      {jobs.length ? (
        <section>
          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">Career</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Experience</h2>
          </div>
          <div className="space-y-4">
            {jobs.map((job, index) => (
            <article key={`${job.companyName}-${job.position}-${index}`} className="portfolio-card rounded-2xl border border-white/[0.08] border-l-2 border-l-purple-400/70 bg-white/[0.035] p-5 text-gray-300 sm:p-7">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div className="min-w-0">
                  <p className="text-lg font-semibold leading-snug text-white sm:text-xl">{job.position}</p>
                  <p className="mt-1 text-sm text-white/60 sm:text-base">
                    {safeUrl(job.companyLink) ? <a href={safeUrl(job.companyLink)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-purple-200">{job.companyName}</a> : job.companyName}
                  </p>
                </div>
                <p className="shrink-0 text-sm text-white/55 sm:text-right">
                  {[dateLabel(job.startDate), job.isCurrent ? "Present" : dateLabel(job.endDate)].filter(Boolean).join(" – ")}
                </p>
              </div>
              {job.description && <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">{experienceSummary(job.description)}</p>}
              <Link href={`/experience/${experienceSlug(job, index)}`} className="mt-4 inline-flex min-h-10 items-center rounded-full border border-purple-300/30 px-4 py-2 text-sm font-medium text-purple-200 transition hover:border-purple-200 hover:bg-purple-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300">
                View experience
              </Link>
              {job.techStack?.length ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {job.techStack.filter(Boolean).map((skill, skillIndex) => (
                    <li key={`${skill}-${skillIndex}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70 sm:text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              ) : null}
              {job.references?.length ? (
                <ul className="mt-5 flex flex-wrap gap-2 text-xs text-white/55 sm:text-sm">
                  {job.references.map((reference, referenceIndex) => (
                    <li key={`${reference.name}-${referenceIndex}`} className="max-w-full break-words rounded-lg border border-white/[0.07] px-3 py-2">
                      <span className="font-medium text-white/75">{reference.name}</span>{reference.position ? ` · ${reference.position}` : ""}
                      {reference.contact ? ` · ${reference.contact}` : ""}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
          </div>
        </section>
      ) : null}

      {education.length ? (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Education</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {education.map((item, index) => (
              <article key={`${item.institution}-${index}`} className="portfolio-card min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 text-gray-300 sm:p-6">
                <h3 className="break-words font-semibold text-white">{item.qualification || item.institution}</h3>
                {item.qualification && <p className="mt-1 text-sm text-white/60">{item.institution}</p>}
                <p className="mt-2 text-xs text-white/45 sm:text-sm">{[dateLabel(item.startDate), dateLabel(item.endDate)].filter(Boolean).join(" – ")}</p>
                {item.description && <p className="mt-3 whitespace-pre-line text-sm leading-6 text-white/65">{item.description}</p>}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {certifications.length ? (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Certifications</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {certifications.map((item, index) => (
              <article key={`${item.name}-${index}`} className="portfolio-card min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 text-gray-300 sm:p-6">
                <h3 className="break-words font-semibold text-white">{item.name}</h3>
                {item.issuer && <p className="mt-1 text-sm text-white/60">{item.issuer}</p>}
                <p className="mt-2 text-xs text-white/45 sm:text-sm">{[dateLabel(item.issueDate), dateLabel(item.expirationDate)].filter(Boolean).join(" – ")}</p>
                {item.credentialUrl && safeUrl(item.credentialUrl) && <a className="mt-2 inline-block underline" href={safeUrl(item.credentialUrl)} target="_blank" rel="noopener noreferrer">View credential</a>}
                {item.description && <p className="mt-2">{item.description}</p>}
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
