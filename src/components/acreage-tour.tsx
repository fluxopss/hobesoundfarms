"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mapZones, site } from "@/lib/content";
import { useTrail } from "@/components/trail-provider";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

type Zone = (typeof mapZones)[number];

export function AcreageTour() {
  const { reducedMotion, gateDone } = useTrail();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Zone | null>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (!gateDone || reducedMotion) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const img = stage.querySelector<HTMLElement>(".map-img-active");
    if (!img) return;

    const end = window.innerWidth < 768 ? "+=120%" : "+=220%";
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
                Math.min(mapZones.length - 1, Math.floor(self.progress * mapZones.length)),
              );
            },
          },
        })
        .fromTo(img, { scale: 1.05, xPercent: 0, yPercent: 0 }, { scale: 1.35, xPercent: -8, yPercent: -6 });
    }, section);

    return () => ctx.revert();
  }, [gateDone, reducedMotion]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section
      id="acreage"
      ref={sectionRef}
      data-chrome-dark
      className="relative bg-ink text-bleach"
      aria-label="Interactive acreage tour"
    >
      <div className="flex min-h-[100svh] flex-col justify-between px-5 py-20 sm:px-10 lg:pl-28">
        <div className="relative z-10 max-w-xl">
          <p className="font-stamp text-[10px] text-flare">Acreage · 126 acres</p>
          <h2 className="font-display mt-3 text-4xl uppercase tracking-tight sm:text-6xl">
            Walk the property
          </h2>
          <p className="mt-3 max-w-md text-bleach/70">
            Scrub the trail. Tap a hotspot — Gem Jungle, Bouquet Bunker, House of the Giants, and more.
          </p>
        </div>

        <div
          ref={stageRef}
          className="map-stage relative mx-auto mt-8 aspect-[16/9] w-full max-w-6xl overflow-hidden border border-bleach/15"
        >
          <Image
            src={site.map}
            alt="Illustrated Hobe Sound Farms property map"
            fill
            className="map-img-active hidden object-cover object-center md:block"
            sizes="100vw"
          />
          <Image
            src={site.mapMobile}
            alt="Hobe Sound Farms property map"
            fill
            className="map-img-active object-cover object-center md:hidden"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-ink/10" />

          {mapZones.map((zone, i) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setActive(zone)}
              className={`absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[10px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flare ${
                lit === i || active?.id === zone.id
                  ? "scale-110 border-flare bg-flare text-ink shadow-[0_0_20px_rgba(255,90,60,0.7)]"
                  : "border-bleach/80 bg-bleach/30 text-bleach hover:bg-flare hover:text-ink"
              }`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              aria-label={zone.label}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <p className="font-stamp relative z-10 mt-6 text-[10px] text-bleach/45">
          {mapZones[lit]?.label ?? "Explore"} · hotspot {lit + 1}/{mapZones.length}
        </p>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-4 sm:items-center"
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
              exit={{ y: 30, opacity: 0 }}
              className="relative grid w-full max-w-2xl overflow-hidden bg-bleach text-ink sm:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative min-h-[220px]">
                <Image
                  src={active.image}
                  alt={active.label}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="font-stamp text-[10px] text-flare">Zone</p>
                <h3 className="font-display mt-2 text-3xl uppercase tracking-tight">{active.label}</h3>
                <p className="mt-3 text-mute">{active.desc}</p>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="mt-6 self-start rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bleach"
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
