import type { CvData } from "@/lib/cv";

type Project = NonNullable<CvData["projects"]>[number];

export function projectSlug(project: Project, index: number) {
  const title = project.title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${title || "project"}-${project.order}-${index + 1}`;
}
