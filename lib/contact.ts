"use server";

export async function sendContactMessage(formData: FormData): Promise<{
  ok: boolean;
  status?: number;
}> {
  const emailValue = formData.get("email");
  const subjectValue = formData.get("subject");
  const messageValue = formData.get("message");
  if (
    typeof emailValue !== "string" ||
    typeof subjectValue !== "string" ||
    typeof messageValue !== "string"
  ) {
    return { ok: false, status: 400 };
  }

  const submission = {
    email: emailValue.trim(),
    subject: subjectValue.trim(),
    message: messageValue.trim(),
  };
  if (
    submission.email.length === 0 ||
    submission.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email) ||
    submission.subject.length === 0 ||
    submission.subject.length > 200 ||
    submission.message.length === 0 ||
    submission.message.length > 10000
  ) {
    return { ok: false, status: 400 };
  }

  const baseUrl = process.env.JADI_APP_BASE_URL;
  const token = process.env.JADI_API_TOKEN || process.env.JADI_CV_API_TOKEN;
  if (!baseUrl || !token) {
    console.log("Missing base URL or API token");
    return { ok: false, status: 503 };
  }

  let url: URL;
  try {
    url = new URL("/api/v1/contact", baseUrl);
  } catch {
    console.log("Invalid URL for contact endpoint");
    return { ok: false, status: 503 };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(submission),
      cache: "no-store",
    });

    return response.status === 201 ? { ok: true } : { ok: false, status: response.status };
  } catch(error: any) {
    console.log("Error sending contact message:", error)
    return { ok: false, status: 503 };
  }
}
