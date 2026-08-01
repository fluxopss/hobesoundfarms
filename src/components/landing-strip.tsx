"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { site } from "@/lib/content";
import { useTrail } from "@/components/trail-provider";

export function LandingStrip() {
  const { gateDone, scrollTo, reducedMotion } = useTrail();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!gateDone || reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-hero]"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out", delay: 0.15 },
      );
    }, el);

    return () => ctx.revert();
  }, [gateDone, reducedMotion]);

  return (
    <section
      id="landing"
      ref={ref}
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
      aria-label="Hobe Sound Farms entrance"
    >
      <div className="absolute inset-0">
        <Image
          src={site.hero}
          alt="Evening gathering under the pavilion at Hobe Sound Farms"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/25" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-10 w-full px-5 pb-24 pt-32 sm:px-10 sm:pb-28 lg:pl-28">
        <div className="flex items-end gap-4" data-hero>
          <Image
            src={site.logo}
            alt=""
            width={64}
            height={64}
            className="mb-2 h-14 w-14 object-contain sm:h-16 sm:w-16"
            priority
          />
        </div>
        <h1
          data-hero
          className="font-display max-w-[14ch] text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] uppercase tracking-tight text-bleach"
        >
          Hobe Sound Farms
        </h1>
        <p data-hero className="mt-5 max-w-md text-lg text-bleach/80 sm:text-xl">
          {site.tagline}
        </p>
        <div data-hero className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => scrollTo("#weekend")}
            className="rounded-full bg-flare px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-flare-deep hover:text-bleach"
          >
            This Weekend
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#arrive")}
            className="rounded-full border border-bleach/50 bg-bleach/10 px-6 py-3.5 text-sm font-semibold text-bleach backdrop-blur-sm transition hover:bg-bleach/20"
          >
            Plan a Visit
          </button>
        </div>
        <p data-hero className="font-stamp mt-10 text-[10px] text-bleach/45">
          1425 SE Bridge Road · Hobe Sound, FL
        </p>
      </div>
    </section>
  );
}
