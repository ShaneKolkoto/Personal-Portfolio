"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface ClientSliderProps {
  clients: { title: string; image: string; link: string }[];
}

const ClientSlider: React.FC<ClientSliderProps> = ({ clients }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (clients.length > 5 && sliderRef.current) {
      const slider = sliderRef.current;
      const scrollWidth = slider.scrollWidth / 2;
      let scrollAmount = 0;
      const scrollStep = 1;

      const scroll = () => {
        if (scrollAmount >= scrollWidth) {
          scrollAmount = 0;
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollAmount += scrollStep;
          slider.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
      };

      const intervalId = setInterval(scroll, 20); // Adjust the interval time as needed

      return () => clearInterval(intervalId);
    }
  }, [clients]);

  return (
    <section id="clients" className="z-[20]">
      <h1 className="text-white font-semibold text-center text-6xl pt-[35px]">
        BRANDS WORKED WITH
      </h1>
      <p className=" tracking-[0.5em] text-center text-transparent font-light pb-5  bg-clip-text bg-gradient-to-r from-purple-700 to-orange-500  text-1xl ">
        EXPLORE NOW
      </p>
      <div className="container !max-w-[1440px] mx-auto 2xl flex justify-center">
        <div className="relative overflow-hidden">
          {clients.length > 5 ? (
            <div ref={sliderRef} className="flex animate-slide">
              {clients.map((client, index) => (
                <div key={index} className="flex-shrink-0 w-1/5 p-2">
                  <Link
                    href={client.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="cursor-pointer"
                  >
                  <Image
                    src={client.image}
                    height={100}
                    width={100}
                    alt={`${client.title}`}
                    className={`object-contain`}
                  />
                  </Link>
                </div>
              ))}
              {/* Duplicate clients for infinite loop effect */}
              {clients.map((client, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="flex-shrink-0 w-1/5 p-2"
                >
                  <Link
                    href={client.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <Image
                      src={client.image}
                      height={100}
                      width={100}
                      alt={`${client.title}`}
                      className={`object-contain`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              {clients.map((client, index) => (
                <div key={index} className="p-2">
                  <Link
                    href={client.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="cursor-pointer"
                  >
                    <Image
                      src={client.image}
                      height={100}
                      width={100}
                      alt={`${client.title}`}
                      className={`object-contain`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientSlider;
