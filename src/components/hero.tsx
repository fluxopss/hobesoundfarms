"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";

export function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.4) setOffset(y * 0.28);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden" aria-label="Hero">
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <Image
          src="/images/hero-farm.jpg"
          alt="Golden light across fields at Hobe Sound Farms"
          fill
          priority
          className="hero-kenburns object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-mangrove/85 via-mangrove/35 to-mangrove/25" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
        <p className="font-display text-[clamp(3.25rem,10vw,7.5rem)] leading-[0.92] tracking-tight text-bg-chalk">
          {site.name}
        </p>
        <h1 className="mt-5 max-w-xl font-display text-[clamp(1.5rem,3.5vw,2.35rem)] leading-tight text-bg-chalk/95">
          {site.tagline}
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-bg-chalk/80 sm:text-lg">
          Weekend market, animals, music, and celebrations on a working South Florida farm.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#contact"
            className="rounded-full bg-citrus px-6 py-3.5 text-sm font-semibold text-mangrove transition hover:bg-citrus-deep hover:text-bg-chalk"
          >
            Plan Your Visit
          </Link>
          <Link
            href="/events"
            className="rounded-full border border-bg-chalk/55 bg-bg-chalk/10 px-6 py-3.5 text-sm font-semibold text-bg-chalk backdrop-blur-sm transition hover:bg-bg-chalk/20"
          >
            This Weekend
          </Link>
        </div>
      </div>
    </section>
  );
}
