import About from "@/components/About";
import Banner from "@/components/Banner";
import ContactForm from "@/components/ContactForm";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { ParallaxBackground, ScrollReveal } from "@/components/ScrollEffects";
import { getCv } from "@/lib/cv";

export default async function Home() {
  const result = await getCv();

  if (!result.ok) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-6 py-24 text-white">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-semibold">CV unavailable</h1>
          <p className="mt-3 text-white/70">{result.message}</p>
        </section>
      </main>
    );
  }

  const cv = result.data;
  if (!cv.profile) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-6 py-24 text-white">
        <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-3xl font-semibold">CV not available yet</h1>
          <p className="mt-3 text-white/70">There is no CV profile to display.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="relative isolate min-h-screen w-full">
      <ParallaxBackground />
      <div className="relative z-10 flex min-w-0 flex-col gap-4 sm:gap-8">
        <ScrollReveal effect="scale"><Banner profile={cv.profile} /></ScrollReveal>
        <ScrollReveal effect="left" delay={80}><About profile={cv.profile} /></ScrollReveal>
        {cv.profile.techStack?.length ? (
          <ScrollReveal effect="right" delay={120}><Skills skills={cv.profile.techStack} /></ScrollReveal>
        ) : null}
        <ScrollReveal effect="up" delay={100}>
          <Experience jobs={cv.jobs ?? []} education={cv.education ?? []} certifications={cv.certifications ?? []} />
        </ScrollReveal>
        <ScrollReveal effect="scale" delay={80}>
          <Projects projects={cv.projects ?? []} hobbies={cv.hobbies ?? []} />
        </ScrollReveal>
        <ScrollReveal effect="up"><ContactForm /></ScrollReveal>
        <ScrollReveal effect="up"><Footer socials={cv.socials ?? []} /></ScrollReveal>
      </div>
    </main>
  );
}
