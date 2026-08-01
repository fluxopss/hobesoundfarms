"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { mapZones, site } from "@/lib/content";
import { useAcreage } from "@/components/acreage-provider";

gsap.registerPlugin(ScrollTrigger);

type Zone = (typeof mapZones)[number];

const zoneMode: Record<string, string> = {
  "gem-jungle": "/market",
  "bouquet-bunker": "/market",
  "main-stage": "/events",
  "animal-alley": "/animals",
  "petting-zoo": "/animals",
  "cattle-feed": "/animals",
  "house-of-giants": "/animals",
  "duck-pond": "/animals",
  "sunflower-barn": "/experiences",
  "magnolia-barn": "/experiences",
};

export function AcreageAtlas() {
  const { reducedMotion, entered } = useAcreage();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Zone | null>(null);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (!entered || reducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const imgs = stage.querySelectorAll<HTMLElement>(".map-img-active");
    if (!imgs.length) return;

    const end = window.innerWidth < 768 ? "+=160%" : "+=240%";
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
          { scale: 1.04, xPercent: 0, yPercent: 0 },
          { scale: 1.32, xPercent: -8, yPercent: -5 },
        );
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [entered, reducedMotion]);

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
      id="atlas"
      ref={sectionRef}
      data-chrome-dark
      className="relative bg-soil text-shell"
      aria-label="Acreage Atlas interactive map"
    >
      <div className="flex min-h-[100svh] flex-col justify-between px-5 py-24 sm:px-10 lg:px-16">
        <div className="relative z-10 max-w-xl">
          <p className="font-atlas text-[10px] text-citrus">
            Atlas · Interactive map · 126 acres
          </p>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-6xl">
            Walk the property
          </h2>
          <p className="mt-3 max-w-md text-shell/65">
            Scroll to scrub the map. Tap a hotspot to open a zone — then jump
            into its world.
          </p>
        </div>

        <div
          ref={stageRef}
          className="map-stage relative mx-auto mt-8 aspect-[16/9] w-full max-w-6xl overflow-hidden rounded-sm border border-shell/15"
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
          <div className="absolute inset-0 bg-soil/10" />
          <div className="vignette absolute inset-0" />

          {mapZones.map((zone, i) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setActive(zone)}
              className={`absolute z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[10px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-citrus ${
                lit === i || active?.id === zone.id
                  ? "scale-110 border-citrus bg-citrus text-soil shadow-[0_0_28px_rgba(240,162,2,0.55)]"
                  : "border-shell/80 bg-shell/20 text-shell hover:bg-citrus hover:text-soil"
              }`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              aria-label={zone.label}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-atlas text-[10px] text-citrus">
              Zone {lit + 1}/{mapZones.length}
            </p>
            <p className="font-display text-2xl tracking-tight">
              {mapZones[lit]?.label}
            </p>
            <p className="mt-1 max-w-md text-sm text-shell/60">
              {mapZones[lit]?.desc}
            </p>
          </div>
          <Link
            href={zoneMode[mapZones[lit]?.id ?? ""] ?? "/visit"}
            className="rounded-full border border-shell/30 px-5 py-2.5 text-sm font-semibold transition hover:border-citrus hover:bg-citrus hover:text-soil"
          >
            Enter this world →
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
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              className="relative grid w-full max-w-2xl overflow-hidden bg-shell text-soil sm:grid-cols-2"
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
                <p className="font-atlas text-[10px] text-citrus">Zone</p>
                <h3 className="font-display mt-2 text-3xl tracking-tight">
                  {active.label}
                </h3>
                <p className="mt-3 text-mute">{active.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href={zoneMode[active.id] ?? "/visit"}
                    className="rounded-full bg-citrus px-5 py-2.5 text-sm font-semibold text-soil"
                  >
                    Go there
                  </Link>
                  <Link
                    href="/visit"
                    className="rounded-full border border-soil/20 px-5 py-2.5 text-sm font-semibold"
                  >
                    Add to visit
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="rounded-full px-4 py-2.5 text-sm text-mute"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
