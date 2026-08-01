"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { marketWalk, site } from "@/lib/content";
import { useAcreage } from "@/components/acreage-provider";

gsap.registerPlugin(ScrollTrigger);

type Stop = (typeof marketWalk)[number];

export function MarketSimulator() {
  const { reducedMotion } = useAcreage();
  const sectionRef = useRef<HTMLElement>(null);
  const [lit, setLit] = useState(0);
  const [active, setActive] = useState<Stop | null>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;
    const img = section.querySelectorAll<HTMLElement>(".sim-map");
    if (!img.length) return;

    const end = window.innerWidth < 768 ? "+=140%" : "+=200%";
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              setLit(
                Math.min(
                  marketWalk.length - 1,
                  Math.floor(self.progress * marketWalk.length),
                ),
              );
            },
          },
        })
        .fromTo(
          img,
          { scale: 1.06, xPercent: 2 },
          { scale: 1.35, xPercent: -8, yPercent: -3 },
        );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  const current = marketWalk[lit];

  return (
    <section
      ref={sectionRef}
      id="simulator"
      data-chrome-dark
      className="relative bg-soil text-shell"
      aria-label="Weekend market walk"
    >
      <div className="flex min-h-[100svh] flex-col justify-between px-5 py-16 sm:px-10 lg:px-16">
        <div className="relative z-10 max-w-xl">
          <p className="font-atlas text-[10px] text-citrus">
            Farmers Market · Weekend walk
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-6xl">
            Walk the market
          </h2>
          <p className="mt-3 max-w-md text-shell/70">
            Scrub the path through real places — Entrance, Main Stage, Gem
            Jungle, Bouquet Bunker, Cattle Feed, Animal Alley, The Bar.
          </p>
        </div>

        <div className="relative mx-auto mt-8 aspect-[16/10] w-full max-w-6xl overflow-hidden border border-shell/15">
          <Image
            src={site.map}
            alt="Hobe Sound Farms market map"
            fill
            className="sim-map hidden object-cover md:block"
            sizes="100vw"
          />
          <Image
            src={site.mapMobile}
            alt="Hobe Sound Farms market map"
            fill
            className="sim-map object-cover md:hidden"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-soil/15" />

          {marketWalk.map((stop, i) => (
            <button
              key={stop.id}
              type="button"
              onClick={() => setActive(stop)}
              className={`absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[10px] font-bold transition ${
                lit === i || active?.id === stop.id
                  ? "scale-110 border-citrus bg-citrus text-soil shadow-[0_0_24px_rgba(240,162,2,0.65)]"
                  : "border-shell/80 bg-shell/25 text-shell hover:bg-citrus hover:text-soil"
              }`}
              style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
              aria-label={stop.label}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-atlas text-[10px] text-citrus">
              Stop {lit + 1}/{marketWalk.length}
            </p>
            <p className="font-display text-2xl tracking-tight">
              {current?.label}
            </p>
            <p className="mt-1 max-w-md text-sm text-shell/65">
              {current?.desc}
            </p>
          </div>
          <Link
            href="/#atlas"
            className="text-sm text-shell/60 underline-offset-4 hover:text-citrus hover:underline"
          >
            Full acreage atlas →
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-soil/75 p-4 sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.article
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="relative grid w-full max-w-2xl overflow-hidden bg-shell text-soil sm:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative min-h-[240px]">
                <Image
                  src={active.image}
                  alt={active.label}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="font-atlas text-[10px] text-citrus">
                  Market stop
                </p>
                <h3 className="font-display mt-2 text-3xl tracking-tight">
                  {active.label}
                </h3>
                <p className="mt-3 text-mute">{active.desc}</p>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="mt-6 self-start rounded-full bg-soil px-5 py-2.5 text-sm font-semibold text-shell"
                >
                  Keep walking
                </button>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
