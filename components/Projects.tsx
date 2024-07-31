'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css"; // Import CSS file for additional styling

interface Project {
  title: string;
  image: string;
  alt: string;
  link: string;
  description: string;
  tool_stacks: string[];
}

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (index: number) => {
    if (isMobile) {
      setOpenProjectIndex(index === openProjectIndex ? null : index);
    }
  };

  const handleArrowClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();
    handleClick(index);
  };

  return (
    <section id="projects" className="z-[20]">
      <h1 className="text-white font-semibold text-center text-6xl pt-[35px]">
        PROJECTS WORKED ON
      </h1>
      <p className="tracking-[0.5em] text-center text-transparent font-light pb-5 bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500 text-1xl">
        EXPLORE NOW
      </p>
      <div className="container !max-w-[1440px] mx-auto grid gap-[10px] sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project, index) => (
          <div
            className="relative z-10 group block overflow-hidden cursor-pointer"
            key={index}
            onClick={() => handleClick(index)}
          >
            <Image
              src={project.image}
              height={250}
              width={250}
              className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
              alt={project.alt}
            />
            {isMobile && (
              <div
                className={`absolute right-0 top-[20%] h-1/2 transform cursor-pointer p-2 ${styles.arrowButton} ${openProjectIndex === index ? styles.arrowRotated : ''}`}
                onClick={(e) => handleArrowClick(e, index)}
              >
                <Image
                  src="/arrow.png" // Replace with your arrow image path
                  height={24}
                  width={24}
                  alt="Arrow"
                />
              </div>
            )}
            <div
              className={`absolute inset-0 bg-black bg-opacity-75 p-4 text-white transform ${
                isMobile ? (openProjectIndex === index ? "translate-x-0" : "translate-x-full") : "translate-x-full group-hover:translate-x-0"
              } transition-transform duration-500 ease-in-out`}
            >
              <div className="flex flex-col justify-between gap-2 h-full">
                <p className="text-xl font-semibold">{project.title}</p>
                <p className="text-sm mb-4">{project.description}</p>
                <div className="flex flex-row justify-between gap-2">
                  <div className="flex flex-wrap gap-2">
                    {project.tool_stacks.map((tool: string, idx) => (
                      <Image
                        key={idx}
                        src={tool}
                        height={30}
                        width={30}
                        alt={`Tool ${idx}`}
                        className={`object-contain ${
                          tool.includes("next") ? "invert" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <Link
                    href={project.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:text-red-400"
                  >
                    Visit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;


