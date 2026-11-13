import type { MetadataRoute } from "next";
import { getCv } from "@/lib/cv";
import { projectSlug } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await getCv();
  const projects =
    result.ok && result.data.projects
      ? [...result.data.projects].sort((a, b) => a.order - b.order)
      : [];

  return [
    { url: "https://personal-portfolio-dxm0vcep9-shane-kolkotos-projects.vercel.app/" },
    ...projects.map((project, index) => ({
      url: `https://personal-portfolio-dxm0vcep9-shane-kolkotos-projects.vercel.app/projects/${projectSlug(project, index)}`,
    })),
  ];
}
