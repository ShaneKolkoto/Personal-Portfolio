import React from "react";
import { experience } from '../constant/index'
const Experience: React.FC<{}> = () => {
  return (
    <div id="experience" className="z-[20] cursor-default">
      <h1 className="text-white font-semibold text-center text-6xl   pt-[35px] z-0">
        EXPERIENCE
      </h1>
      <p className=" tracking-[0.5em] text-center text-transparent font-light pb-5  bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500  text-1xl ">
        EXPLORE NOW
      </p>
      {experience.map((exp, index) => (
              <div key={index} className="container mx-auto 2xl">
              <div className="flex flex-row justify-between pt-5">
                <p className="text-gray-300">
                  <span className="font-semibold"><a href={exp.link} target="_blank" rel="noopener noreferrer" className="cursor-pointer">{exp.company}</a> /</span> {exp.position}
                </p>
                <p className="text-gray-300">{exp.duration}, {exp.location}</p>
              </div>
              <p className="text-gray-300 pt-5">{exp.description1}</p>
              {exp.description2 &&  <br />}
              {exp.description2 &&  <p className="text-gray-300 pt-5">{exp.description2}</p>}
              <div className="grid lg:grid-cols-5 grid-cols-3">
                {exp.skills.map((skill, index) => (
                  <div key={index}  className={`bg-transparent text-center mt-5 mr-2 cursor-pointer rounded-3xl text-white py-2 px-5 border border-[#2E2E2E] w-full`}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
      ))}

    </div>
  );
};

export default Experience;
