import React from "react";

const About: React.FC<{}> = () => {
  return (
    <div
      id="about"
      className="flex flex-col items-center justify-center h-full relative overflow-hidden pt-[35px] z-[20] cursor-default"
      style={{ transform: "scale(0.9)" }}
    >
      <div className="flex flex-col  justify-around flex-wrap items-center   max-w-[900px]">
        <h1 className="text-white font-semibold text-6xl">ABOUT ME</h1>
        <p className=" tracking-[0.5em] text-transparent font-light pb-5  bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500  text-1xl">
          EXPLORE NOW
        </p>
        <p className="text-gray-300 text-center ">
        As a passionate full-stack developer, I revel in the delicate balance between logic and creativity. Currently deeply immersed in the dynamic world of shopify, where I seamlessly integrate technology with innovation.
          <br />
          <br />
          With a fervor for crafting elegant solutions, I navigate the
          ever-evolindex and scape of software development. My journey involves
          translating concepts into code, creating seamless user experiences,
          and constantly pushing the boundaries of what&#39;s possible
          <br />
          <br />
          In my personal time, I love watching anime, listening to music, taking my Rottweiler on walks, writing blogs on <a href="https://medium.com/@shanekolkoto" className="font-bold underline"> Medium</a> and spending time with the people close to me.
        </p>
      </div>
    </div>
  );
};

export default About;
