export type CvData = {
  profile: null | {
    fullName?: string | null;
    jobTitle?: string | null;
    about?: string | null;
    address?: string | null;
    contactNumber?: string | null;
    email?: string | null;
    photoUrl?: string | null;
    techStack?: string[] | null;
  };
  socials?: { platform?: string | null; url?: string | null }[] | null;
  projects?: { title: string; description?: string | null; imageUrl?: string | null; link?: string | null; order: number }[] | null;
  jobs?: { companyName: string; location?: string | null; companyLink?: string | null; position: string; startDate?: string | null; endDate?: string | null; isCurrent: boolean; techStack?: string[] | null; description?: string | null; references?: { name: string; position?: string | null; contact?: string | null }[] | null }[] | null;
  education?: { institution: string; qualification?: string | null; startDate?: string | null; endDate?: string | null; description?: string | null }[] | null;
  certifications?: { name: string; issuer?: string | null; issueDate?: string | null; expirationDate?: string | null; credentialId?: string | null; credentialUrl?: string | null; description?: string | null; imageUrl?: string | null }[] | null;
  hobbies?: { name: string; description?: string | null }[] | null;
  testimonials?: {
    firstName: string;
    company?: string | null;
    message: string;
    photoUrl?: string | null;
    createdAt?: string | null;
  }[] | null;
};

type CvResult = { ok: true; data: CvData } | { ok: false; message: string };

export async function getCv(): Promise<CvResult> {
  const baseUrl =   process.env.JADI_APP_BASE_URL;
    const token = process.env.JADI_CV_API_TOKEN;
  if (!baseUrl || !token) {
    return { ok: false, message: "CV service is not configured. Please try again later." };
  }

  let url: URL;
  try {
    url = new URL("/api/v1/cv", baseUrl);
  } catch {
    return { ok: false, message: "CV service is not configured correctly." };
  }

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      console.error("CV service request failed", { status: response.status, origin: url.origin });
      const message =
        response.status === 401 ? "CV service credentials are unavailable." :
        response.status === 403 ? "CV service access is not allowed." :
        response.status === 404 ? "No CV profile was found." :
        response.status === 429 ? "The CV service is temporarily out of requests. Please try again later." :
        "The CV could not be loaded right now.";
      return { ok: false, message };
    }
    return { ok: true, data: (await response.json()) as CvData };
  } catch (error) {
    console.error("CV service request could not be completed", {
      origin: url.origin,
      error: error instanceof Error ? error.message : "Unknown fetch error",
    });
    return { ok: false, message: "The CV could not be loaded right now." };
  }
}
