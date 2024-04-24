import About from "@/components/About";
import Banner from "@/components/Banner";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import DiscordBot from "@/components/DiscordBot";

export default function Home() {
  return (
    <main className="h-full w-full  bg-[url('/LooperGroup2.png')] bg-no-repeat">
      <div className="flex flex-col gap-20">
        <Banner />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <DiscordBot />
        <Footer />
      </div>
    </main>
  );
}
