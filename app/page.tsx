'use client';

import { useEffect } from "react";
import About from "@/components/About";
import Banner from "@/components/Banner";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import Clients from "@/components/PersonlClients";
import Projects from "@/components/Projects";
import { hotjar } from 'react-hotjar'

import { clients, projects } from '@/constant';

export default function Home() {

  useEffect(() => {
    hotjar.initialize({id: 5079480, sv: 6})
  }, [])
  
  return (
    <main className="h-full w-full  bg-[url('/LooperGroup2.png')] bg-no-repeat">
      <div className="flex flex-col gap-20">
        <Banner />
        <About />
        <Skills />
        <Experience />
        <Clients clients={clients}/>
        <Projects projects={projects}/>
        <Footer />
      </div>
    </main>
  );
}
