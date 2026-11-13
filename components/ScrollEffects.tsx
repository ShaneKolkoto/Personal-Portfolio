"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealEffect = "up" | "left" | "right" | "scale";

export function ScrollReveal({
  children,
  effect = "up",
  delay = 0,
}: {
  children: ReactNode;
  effect?: RevealEffect;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);
    document.documentElement.classList.add("motion-ready");
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="scroll-reveal"
      data-effect={effect}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function ParallaxBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.08, 100);
        if (layerRef.current) {
          layerRef.current.style.transform = `translate3d(0, -${offset}px, 0)`;
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        ref={layerRef}
        className="parallax-layer absolute -inset-x-0 -top-[8vh] h-[130vh] bg-[url('/LooperGroup2.png')] bg-cover bg-top bg-no-repeat opacity-60"
      />
    </div>
  );
}
