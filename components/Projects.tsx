import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.css"; // Import CSS file for styling

const Projects: React.FC<{}> = () => {
  return (
    <section id="projects">
      <h1 className="text-white font-semibold text-center text-6xl pt-[35px]">
        PROJECTS WORKED ON
      </h1>
      <p className=" tracking-[0.5em] text-center text-transparent font-light pb-5  bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500  text-1xl ">
        EXPLORE NOW
      </p>
      <div className="container !max-w-[1440px] mx-auto 2xl flex flex-col gap-[15px]">
        <div className="flex-col flex md:flex-row  mt-7 gap-[10px]">
          <Link
            href="https://vans.co.za/"
            rel="noopener noreferrer"
            target="_blank"
            className="z-[1] h-full hover:bg-[#eb1d25] transition-all duration-500 ease-in-out w-full"
          >
            <div className={`flex-row flex gap-0 lg:gap-[10px] ${styles.linkContainer}`}>
              <Image
                src="/Vans-logo.jpeg"
                height={10}
                width={150}
                className="h-[100px] lg:h-[150px] w-[90px] lg:w-[435px]"
                alt="vans-clone"
              />
              <div className="p-0 lg:p-3 px-[10px] lg:px-0 w-full">
                <p className="text-white font-semibold text-xl">Vans SA</p>
                <p className="text-gray-500 text-[8px] lg:text-[10px]">
                  I had the privilege of contributing to the enhancement of the
                  Vans South Africa website. My primary focus revolved around
                  refining the user experience for both the account and wishlist
                  pages.
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="https://bashafrica.com/"
            rel="noopener noreferrer"
            target="_blank"
            className="z-[1] h-full hover:bg-[#024089] transition-all duration-500 ease-in-out w-full"
          >
            <div className={`flex-row flex gap-0 lg:gap-[10px] ${styles.linkContainer}`}>
              <Image
                src="/Birkenstock-logo.png"
                height={250}
                width={150}
                alt="Birkenstock"
                className=" h-[100px] lg:h-[150px] w-[90px] lg:w-[435px]"
              />
              <div className="p-0 lg:p-3 px-[10px] lg:px-0 w-full">
                <p className="text-white font-semibold text-xl">
                  Birkenstock SA
                </p>
                <p className="text-gray-500 text-[8px] lg:text-[10px]">
                  I had the opportunity to further elevate the Birkenstock SA
                  website. My role in this project primarily involved
                  implementing updates and integrating new features, with a
                  special focus on enhancing the product cards and refining the
                  filtering system.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex-col flex md:flex-row gap-[10px]">
          <Link
            href="https://crocssa.co.za/"
            rel="noopener noreferrer"
            target="_blank"
            className="z-[1] h-full hover:bg-[#86bc06] transition-all duration-500 ease-in-out w-full"
          >
            <div className={`flex-row flex gap-0 lg:gap-[10px] ${styles.linkContainer}`}>
              <Image
                src="/Crocs-logo.jpeg"
                height={150}
                width={150}
                alt="Crocs South Africa"
                className="h-[100px] lg:h-[150px] w-[90px] lg:w-[435px]"
              />
              <div className=" p-0 lg:p-3 px-[10px] lg:px-0 w-full ">
                <p className="text-white font-semibold text-xl">Crocs SA</p>
                <p className="text-gray-500 text-[8px] lg:text-[10px]">
                  I had the privilege of contributing to the enhancement of the
                  Crocs South Africa website. My primary focus revolved around
                  refining the user experience.
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="https://underarmour.co.za/"
            rel="noopener noreferrer"
            target="_blank"
            className="z-[1] h-full hover:bg-[#ffff] transition-all duration-500 ease-in-out w-full"
          >
            <div className={`flex-row flex gap-0 lg:gap-[10px] ${styles.linkContainerUA}`}>
              <Image
                src="/UA-logo.png"
                height={150}
                width={150}
                alt="Under Armour South Africa"
                className="h-[100px] lg:h-[150px] w-[90px] lg:w-[223px]"
              />
              <div className=" p-0 lg:p-3 px-[10px] lg:px-0 w-full">
                <p className="text-white font-semibold text-xl">
                  Under Armour SA
                </p>
                <p className="text-gray-500 text-[8px] lg:text-[10px]">
                  I had the opportunity to further elevate the Under Armour Website and Mobile App. My role in this project primarily involved
                  implementing and integrating new features, with a special focus on enhancing the API on v4 Release.
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
