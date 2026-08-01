"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/lib/content";
import { TrailChrome } from "@/components/trail-chrome";
import { SiteFooter } from "@/components/site-footer";
import { ArriveAndBook } from "@/components/arrive-and-book";
import { useTrail } from "@/components/trail-provider";

export default function ExperiencesPage() {
  const { reducedMotion } = useTrail();
  const [active, setActive] = useState(0);
  const current = experiences[active];

  return (
    <>
      <TrailChrome />
      <main>
        <section
          data-chrome-dark
          className="relative min-h-[100svh] overflow-hidden bg-ink pt-20 text-bleach"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reducedMotion ? false : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 sm:px-10 lg:pl-28">
            <p className="font-stamp text-[10px] text-flare">{current.tag}</p>
            <h1 className="font-display mt-3 max-w-[12ch] text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.85] tracking-tight">
              {current.title}
            </h1>
            <p className="mt-4 max-w-lg text-lg text-bleach/80">{current.desc}</p>
            <Link
              href="/#arrive"
              className="mt-8 inline-flex w-fit rounded-full bg-flare px-7 py-3.5 text-sm font-bold text-ink"
            >
              Inquire about {current.title}
            </Link>

            <div className="mt-12 flex gap-2 overflow-x-auto pb-2">
              {experiences.map((exp, i) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`font-stamp min-h-11 shrink-0 rounded-full px-4 py-2.5 text-[10px] transition ${
                    i === active
                      ? "bg-flare text-ink"
                      : "border border-bleach/30 text-bleach/70 hover:border-flare"
                  }`}
                >
                  {exp.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section data-chrome-light className="grid gap-3 bg-bleach p-5 sm:grid-cols-2 sm:p-10 lg:grid-cols-3">
          {experiences.map((exp, i) => (
            <button
              key={exp.id}
              type="button"
              onClick={() => {
                setActive(i);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group relative min-h-[240px] overflow-hidden text-left"
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-ink/45 transition group-hover:bg-ink/30" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-bleach">
                <p className="font-stamp text-[9px] text-flare">{exp.tag}</p>
                <h2 className="font-display mt-1 text-2xl uppercase tracking-tight">{exp.title}</h2>
              </div>
            </button>
          ))}
        </section>

        <ArriveAndBook />
      </main>
      <SiteFooter />
    </>
  );
}
