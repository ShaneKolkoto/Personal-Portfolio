"use client";

import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed z-50 h-[65px] w-full border-b border-white/[0.08] bg-[#0b0b10]/85 px-3 backdrop-blur-xl sm:px-6 md:px-10">
      <nav aria-label="Main navigation" className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
        <a href="/" aria-label="Home" className="flex shrink-0">
          <Image src="/Logo.svg" alt="" width={100} height={40} className="h-auto w-14 sm:w-[90px]" />
        </a>
        <div className="flex min-w-0 items-center justify-end gap-1 sm:gap-3">
          <a
            href="https://medium.com/@shanekolkoto"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-2 py-2 text-xs text-white transition-colors hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            Blog
          </a>
          <a
            href="https://shanekolkotoportfolio.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-2 py-2 text-xs text-white transition-colors hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            <span className="sm:hidden">PC</span><span className="hidden sm:inline">Virtual PC</span> <span aria-hidden="true">💻</span>
          </a>
          <a
            href="/#contact"
            className="rounded-xl bg-white/5 px-2 py-2 text-xs text-white transition-colors hover:bg-white/10 sm:px-4 sm:text-sm"
          >
            Contact
          </a>
        </div>
      </nav>
    </header>
  );
}
