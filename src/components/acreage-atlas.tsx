"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mapZones } from "@/lib/content";
import { useAcreage } from "@/components/acreage-provider";
import { FarmMap } from "@/components/farm-map";

gsap.registerPlugin(ScrollTrigger);

export function AcreageAtlas() {
  const { reducedMotion, entered } = useAcreage();
  const sectionRef = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (!entered || reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const section = sectionRef.current;
    if (!section) return;
    const imgs = section.querySelectorAll<HTMLElement>(".map-img-active");
    if (!imgs.length) return;

    const end = window.innerWidth < 768 ? "+=140%" : "+=220%";
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setLit(
                Math.min(
                  mapZones.length - 1,
                  Math.floor(self.progress * mapZones.length),
                ),
              );
            },
          },
        })
        .fromTo(
          imgs,
          { scale: 1.02, xPercent: 0, yPercent: 0 },
          { scale: 1.28, xPercent: -6, yPercent: -4 },
        );
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [entered, reducedMotion]);

  const current = mapZones[lit];

  return (
    <section
      id="atlas"
      ref={sectionRef}
      data-chrome-dark
      className="relative bg-soil text-shell"
      aria-label="Interactive acreage atlas"
    >
      <div className="flex min-h-[100svh] flex-col justify-between px-5 py-24 sm:px-10 lg:px-16">
        <div className="relative z-10 max-w-2xl">
          <p className="font-atlas text-[10px] text-citrus">
            Atlas · Real property map · 126 acres
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-6xl">
            Walk the property
          </h2>
          <p className="mt-3 max-w-lg text-shell/65">
            Scroll to scrub. Filter by world. Tap pins for real place names from
            the Hobe Sound Farms map — Gem Jungle, Animal Alley, Magnolia Barn,
            and more.
          </p>
        </div>

        <FarmMap
          litIndex={lit}
          className="relative z-10 mt-8 w-full max-w-6xl self-center"
        />

        <div className="relative z-10 mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-atlas text-[10px] text-citrus">
              Highlight {lit + 1}/{mapZones.length}
            </p>
            <p className="font-display text-2xl tracking-tight">
              {current?.label}
            </p>
            <p className="mt-1 max-w-md text-sm text-shell/60">
              {current?.desc}
            </p>
          </div>
          {current && (
            <Link
              href={current.href}
              className="rounded-full border border-shell/30 px-5 py-2.5 text-sm font-semibold transition hover:border-citrus hover:bg-citrus hover:text-soil"
            >
              Open {current.mode} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
