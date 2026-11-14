import type { CvData } from "@/lib/cv";

type Job = NonNullable<CvData["jobs"]>[number];

export function experienceSlug(job: Job, index: number) {
  const label = `${job.position}-${job.companyName}`
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `${label || "role"}-${index + 1}`;
}

export function experienceSummary(description?: string | null, maxLength = 220) {
  if (!description) return "";
  const normalized = description.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trimEnd()}…`;
}
