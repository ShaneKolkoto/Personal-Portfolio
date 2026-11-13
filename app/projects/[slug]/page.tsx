import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCv } from "@/lib/cv";
import { projectSlug } from "@/lib/projects";

type Props = { params: { slug: string } };

function safeUrl(value?: string | null) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

async function findProject(slug: string) {
  const result = await getCv();
  if (!result.ok) return result;

  const projects = [...(result.data.projects ?? [])].sort((a, b) => a.order - b.order);
  const index = projects.findIndex((project, projectIndex) => projectSlug(project, projectIndex) === slug);
  return index < 0
    ? { ok: true as const, project: null }
    : { ok: true as const, project: projects[index] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await findProject(params.slug);
  if (!result.ok || !result.project) return { title: "Project not found" };

  return {
    title: result.project.title,
    description: result.project.description || `Explore ${result.project.title} by Shane Kolkoto.`,
    alternates: { canonical: `/projects/${params.slug}` },
    openGraph: {
      title: result.project.title,
      description: result.project.description || `Explore ${result.project.title} by Shane Kolkoto.`,
      ...(result.project.imageUrl
        ? { images: [`/api/cv-image?url=${encodeURIComponent(result.project.imageUrl)}`] }
        : {}),
    },
  };
}

export default async function ProjectDetails({ params }: Props) {
  const result = await findProject(params.slug);
  if (!result.ok) {
    return (
      <main className="relative z-10 mx-auto min-h-screen max-w-4xl px-5 pb-20 pt-28 text-white sm:px-8">
        <h1 className="text-3xl font-semibold">Project unavailable</h1>
        <p className="mt-3 text-white/70">{result.message}</p>
        <Link href="/#projects" className="mt-8 inline-flex rounded-full border border-white/20 px-5 py-3 text-sm transition-colors hover:border-purple-300 hover:bg-white/10">
          Back to projects
        </Link>
      </main>
    );
  }

  if (!result.project) notFound();
  const { project } = result;
  const image = project.imageUrl
    ? `/api/cv-image?url=${encodeURIComponent(project.imageUrl)}`
    : null;
  const externalUrl = safeUrl(project.link);

  return (
    <main className="relative z-10 mx-auto min-h-screen max-w-5xl px-5 pb-24 pt-28 text-white sm:px-8">
      <Link href="/#projects" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition-colors hover:border-purple-300 hover:text-white">
        <span aria-hidden="true">←</span> All projects
      </Link>
      <article className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-[#15131b]/85 shadow-2xl shadow-black/30">
        {image ? (
          <div className="relative aspect-[16/8] w-full overflow-hidden bg-white/5">
            <Image src={image} alt={`${project.title} project`} fill unoptimized className="object-cover" priority />
          </div>
        ) : null}
        <div className="p-6 sm:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-purple-300">Project</p>
          <h1 className="mt-3 break-words text-3xl font-semibold tracking-tight [overflow-wrap:anywhere] sm:text-5xl">{project.title}</h1>
          {project.description ? (
            <p className="mt-6 max-w-3xl whitespace-pre-line text-base leading-8 text-white/70 sm:text-lg">
              {project.description}
            </p>
          ) : null}
          {externalUrl ? (
            <a href={externalUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex rounded-full bg-purple-500 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300">
              Visit project <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </article>
    </main>
  );
}
