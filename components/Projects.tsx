import Image from "next/image";
import Link from "next/link";
import React from "react";

const Projects: React.FC<{}> = () => {
  return (
    <section id="projects">
      <h1 className="text-white font-semibold text-center text-6xl pt-[35px]">
        PROJECTS
      </h1>
      <p className=" tracking-[0.5em] text-center text-transparent font-light pb-5  bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500  text-1xl ">
        EXPLORE NOW
      </p>
      <div className=" container mx-auto 2xl  ">
        <div className="flex-col flex md:flex-row  mt-7">
          <Link
            href="https://web.hr/"
            rel="noopener noreferrer"
            target="_blank"
            className="z-[1]"
          >
            <div className="flex-row flex mb-5">
              <Image
                src="/FirstProject.png"
                height={150}
                width={150}
                alt="disney-clone"
              />
              <div className="p-3">
                <p className="text-white font-semibold text-xl">Disney+ Clone</p>
                <p className="text-gray-500 text-[10px]">
                The Disney+ Clone project is a web application designed to mimic the functionality and aesthetics of the popular streaming platform Disney+.
                Utilizing HTML, CSS, and JavaScript, this project aims to replicate the user interface and features of Disney+ for a seamless viewing experience.
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="https://hireside.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="z-[1]"
          >
            <div className="flex-row flex mb-5">
              <Image
                src="/SecondProject.png"
                height={150}
                width={150}
                alt="Health-concept"
              />
              <div className="p-3">
                <p className="text-white font-semibold text-xl">Health Concept</p>
                <p className="text-gray-500 text-[10px]">
                The Disney+ Clone project is a web application designed to mimic the functionality and aesthetics of the popular streaming platform Disney+.
                Utilizing HTML, CSS, and JavaScript, this project aims to replicate the user interface and features of Disney+ for a seamless viewing experience.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex-col flex md:flex-row ">
          <Link
            href="https://www.vergesystems.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="z-[1]"
          >
            <div className="flex-row flex mb-5">
              <Image
                src="/ThirdProject.png"
                height={150}
                width={150}
                alt="VergeSystems"
              />
              <div className=" p-3 ">
                <p className="text-white font-semibold text-xl">
                  Ubuntu Portfolio
                </p>
                <p className="text-gray-500 text-[10px]">
                  Developed the Verge Systems website using React.js.
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="http://44.201.47.75/"
            rel="noopener noreferrer"
            target="_blank"
            className="z-[1]"
          >
            <div className="flex-row flex mb-5">
              <Image
                src="/FourProject.png"
                height={150}
                width={150}
                alt="Payoasis"
              />
              <div className="p-3 ">
                <p className="text-white font-semibold text-xl">Fondations algorithms</p>
                <p className="text-gray-500 text-[10px]">
                  Designed the modern UI for a banking website utilizing Gatsby.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
