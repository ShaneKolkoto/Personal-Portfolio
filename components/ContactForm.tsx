"use client";

import { FormEvent, useState } from "react";
import { sendContactMessage } from "@/lib/contact";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "sending") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus({ kind: "sending" });

    try {
      const result = await sendContactMessage(formData);
      console.log(result, "result")
      if (result.ok) {
        form.reset();
        setStatus({ kind: "success" });
        return;
      }

      const message =
        result.status === 400
          ? "Please enter a valid email, subject, and message within the character limits."
          : result.status === 401
            ? "Jadi rejected the API token. Check the server-side Jadi token configuration."
            : result.status === 403
              ? "Jadi denied this request. Check that the token is allowed to use the contact endpoint."
          : result.status === 502
            ? "Your message may have been saved, but its notification could not be sent. Please don't submit it again; contact me directly instead."
            : result.status === 503
              ? "The contact service is unavailable. Please don't resubmit if you aren't sure the message was received; contact me directly instead."
              : result.status === 404
                ? "The Jadi contact endpoint was not found. Check the server-side Jadi base URL."
              : "We couldn't send your message. Please try again later.";
      setStatus({ kind: "error", message });
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't reach the contact service. Please try again later.",
      });
    }
  }

  return (
    <section id="contact" className="mx-auto w-full max-w-5xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16">
      <div className="grid gap-8 rounded-3xl border border-white/[0.08] bg-white/[0.035] p-6 sm:p-9 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:p-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-purple-300">Have a project in mind?</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Let&apos;s talk.</h2>
          <p className="mt-4 max-w-sm text-sm leading-7 text-white/60 sm:text-base">
            Send a note and I&apos;ll get back to you as soon as I can.
          </p>
        </div>

        <form action={sendContactMessage} className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-white/80">Your email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              className="min-h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/30 focus:border-purple-300/70 focus:ring-2 focus:ring-purple-400/20"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-white/80">Subject</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              maxLength={200}
              required
              className="min-h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/30 focus:border-purple-300/70 focus:ring-2 focus:ring-purple-400/20"
              placeholder="What would you like to discuss?"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-white/80">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              maxLength={10000}
              required
              className="w-full resize-y rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base leading-7 text-white outline-none transition placeholder:text-white/30 focus:border-purple-300/70 focus:ring-2 focus:ring-purple-400/20"
              placeholder="Tell me a little about it..."
            />
          </div>
          <button
            type="submit"
            disabled={status.kind === "sending"}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#111] transition hover:bg-purple-100 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
          >
            {status.kind === "sending" ? "Sending..." : "Send message"}
          </button>
          <div aria-live="polite" role={status.kind === "error" ? "alert" : "status"} className="min-h-6 text-sm">
            {status.kind === "success" ? (
              <p className="text-emerald-300">Thanks — your message was sent successfully.</p>
            ) : status.kind === "error" ? (
              <p className="text-rose-300">{status.message}</p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
