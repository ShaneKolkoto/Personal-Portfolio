import React from "react";
import Image from "next/image";
import { skills } from "../constant/index";

const Skills: React.FC<{}> = () => {
  return (
    <section
      id="skill"
      className="flex flex-col items-center justify-center h-full relative overflow-hidden pt-[35px] "
      style={{ transform: "scale(0.9)" }}
    >
      <div className="flex flex-col  justify-around flex-wrap items-center   max-w-[900px]">
        <h1 className="text-white font-semibold text-6xl">Skills</h1>
        <p className=" tracking-[0.5em] text-transparent font-light pb-5  bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500  text-1xl">
          EXPLORE NOW
        </p>
        <div className="grid lg:grid-cols-5 grid-cols-3 gap-[15px]">
          {skills.map((skill, index) => (
            <Image
              key={index}
              src={skill.image}
              height={100}
              width={100}
              alt={skill.alt}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
