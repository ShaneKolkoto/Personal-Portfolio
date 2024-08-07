"use client";

import React from "react";
import Image from "next/image";

const Banner: React.FC<{}> = () => {
  return (
    <div className="flex flex-row items-center justify-center px-[20px]  md:px-20 mt-[60px] lg:mt-[150px] z-[20] ">
      <div className="flex flex-col  justify-center  text-center">
        <div className="justify-center flex ">
          <Image
            priority
            src="/Me.png"
            height={300}
            width={300}
            alt="Shane Kolkoto"
          />
        </div>

        <div className="flex flex-col gap-6 mt-6 cursor-pointer lg:animate-bounce tracking-tighter text-[47px] lg:text-7xl font-semibold text-white max-w-[620px] w-auto h-auto">
          I&apos;m Shane Kolkoto!
        </div>
        <div className="flex justify-center">
          <p className="text-2xl font-medium tracking-tighter text-gray-300 max-w-[600px]">
            I do Code &amp;{" "}
            <span className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-500 to-orange-400">
              Chill
            </span>
          </p>
          <Image
            src="/popcorn.gif"
            height={50}
            width={50}
            alt="chill"
            sizes="50px"
            className="w-auto h-auto" // Use inline-block or other classes as needed for layout
          />{" "}
        </div>

        <p className="lg:text-md text-[10px] text-gray-200 lg:mt-5 mt-[0.25rem] mb-5  max-w-[600px]">
          Passionate Full Stack Developer adept in Node.js, Vue.js, React.js,
          Firebase, PostgreSQL, MongoDB, Shopify, WordPress, PHP, and Python,
          dedicated to crafting intuitive and seamless mobile applications.
        </p>
        <div className="text-md flex justify-center">
          <button
            onClick={() => window.open("mailto:shanekolkoto@gmail.com")}
            className=" z-[1]     padding-20  hover:bg-white rounded-3xl  text-white font-semibold hover:text-black py-3 px-10  border-[0.1px] border-white hover:border-transparent "
          >
            Contact Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
