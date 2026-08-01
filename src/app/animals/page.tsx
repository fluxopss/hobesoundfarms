"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { residents, site } from "@/lib/content";
import { AtlasChrome } from "@/components/atlas-chrome";
import { SiteFooter } from "@/components/site-footer";
import { PageTransition } from "@/components/motion/page-transition";
import { ParallaxFrame } from "@/components/motion/parallax-frame";
import { useAcreage } from "@/components/acreage-provider";

export default function AnimalsPage() {
  const { reducedMotion } = useAcreage();
  const [active, setActive] = useState(0);
  const current = residents[active];

  return (
    <>
      <AtlasChrome />
      <PageTransition>
        <main className="pb-20 md:pb-0">
          <section
            data-chrome-dark
            className="relative flex min-h-[90svh] items-end overflow-hidden bg-soil pt-24 text-shell"
          >
            <ParallaxFrame className="absolute inset-0" speed={30}>
              <Image
                src="/images/live/goat.jpg"
                alt="Goat at Hobe Sound Farms petting zoo"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </ParallaxFrame>
            <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/55 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(61,122,110,0.35),transparent_50%)]" />
            <div className="grain absolute inset-0" />
            <div className="relative z-10 w-full px-5 pb-16 sm:px-10 lg:px-16">
              <p className="font-atlas text-[10px] text-lagoon">
                Mode · Residents · Working farm
              </p>
              <h1 className="font-display mt-4 text-[clamp(3rem,10vw,7rem)] leading-[0.85] tracking-tight">
                Meet the livestock
              </h1>
              <p className="mt-4 max-w-xl text-lg text-shell/75">
                Commercial agriculture up close — cattle, goats, hatchery,
                giants, guardians.
              </p>
            </div>
          </section>

          <section
            data-chrome-dark
            className="relative min-h-[100svh] overflow-hidden bg-soil text-shell"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.slug}
                initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-soil via-soil/75 to-soil/20" />
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 py-16 sm:px-10 lg:px-16">
              <p className="font-atlas text-[10px] text-lagoon">
                {current.role}
              </p>
              <h2 className="font-display mt-3 max-w-[14ch] text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] tracking-tight">
                {current.species}
              </h2>
              <p className="mt-4 max-w-lg text-shell/80">{current.blurb}</p>

              <div className="residents-track mt-12 flex gap-2 overflow-x-auto pb-2">
                {residents.map((animal, i) => (
                  <button
                    key={animal.slug}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`min-h-11 shrink-0 rounded-full px-4 py-2.5 text-[11px] font-medium transition ${
                      i === active
                        ? "bg-lagoon text-shell"
                        : "border border-shell/30 text-shell/70 hover:border-lagoon"
                    }`}
                  >
                    {animal.species.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section
            data-chrome-dark
            className="bg-soil py-10"
            aria-label="Herd cinema"
          >
            <div className="residents-track flex gap-4 overflow-x-auto px-5 pb-6 sm:px-10 lg:px-16">
              {residents.map((animal, i) => (
                <motion.button
                  key={animal.slug}
                  type="button"
                  onClick={() => {
                    setActive(i);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative h-[70svh] w-[min(88vw,400px)] shrink-0 overflow-hidden text-left"
                >
                  <Image
                    src={animal.image}
                    alt={animal.alt}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-atlas text-[10px] text-lagoon">
                      {animal.role}
                    </p>
                    <h3 className="font-display mt-2 text-3xl tracking-tight text-shell">
                      {animal.species}
                    </h3>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>

          <section
            data-chrome-light
            className="bg-shell px-5 py-20 text-center sm:px-10"
          >
            <Image
              src={site.logo}
              alt={site.name}
              width={56}
              height={56}
              className="mx-auto h-14 w-14"
            />
            <h2 className="font-display mt-6 text-3xl tracking-tight text-soil sm:text-5xl">
              Book a private encounter
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/visit?experience=Animal%20Encounters"
                className="inline-flex rounded-full bg-lagoon px-7 py-3.5 text-sm font-bold text-shell"
              >
                Inquire →
              </Link>
              <Link
                href="/#hub"
                className="inline-flex rounded-full border border-soil/20 px-7 py-3.5 text-sm font-semibold"
              >
                ← Atlas
              </Link>
            </div>
          </section>
        </main>
      </PageTransition>
      <SiteFooter />
    </>
  );
}
