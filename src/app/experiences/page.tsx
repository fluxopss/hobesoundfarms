"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/lib/content";
import { AppShell } from "@/components/app-shell";
import { useAcreage } from "@/components/acreage-provider";

export default function ExperiencesPage() {
  const { reducedMotion } = useAcreage();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(0);
  const current = experiences[active];

  useEffect(() => {
    const focus = searchParams.get("focus");
    if (!focus) return;
    const idx = experiences.findIndex((e) => e.id === focus);
    if (idx >= 0) setActive(idx);
  }, [searchParams]);

  return (
    <AppShell>
      <main>
        <section
          data-chrome-dark
          className="relative min-h-[100svh] overflow-hidden bg-soil pt-20 text-shell"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reducedMotion ? false : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 }}
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
              <div className="absolute inset-0 bg-gradient-to-r from-soil via-soil/70 to-soil/20" />
              <div className="vignette absolute inset-0" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-16 sm:px-10 lg:px-16">
            <p className="font-atlas text-[10px] text-citrus">
              Mode · Experiences · {current.tag}
            </p>
            <h1 className="font-display mt-3 max-w-[12ch] text-[clamp(3rem,10vw,7rem)] leading-[0.85] tracking-tight">
              {current.title}
            </h1>
            <p className="mt-4 max-w-lg text-lg text-shell/80">
              {current.desc}
            </p>
            <Link
              href={`/visit?experience=${encodeURIComponent(current.title)}`}
              className="mt-8 inline-flex w-fit rounded-full bg-citrus px-7 py-3.5 text-sm font-bold text-soil"
            >
              Inquire about {current.title}
            </Link>

            <div className="mt-12 flex gap-2 overflow-x-auto pb-2">
              {experiences.map((exp, i) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`min-h-11 shrink-0 rounded-full px-4 py-2.5 text-[11px] font-medium transition ${
                    i === active
                      ? "bg-citrus text-soil"
                      : "border border-shell/30 text-shell/70 hover:border-citrus"
                  }`}
                >
                  {exp.title}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section
          data-chrome-light
          className="grid gap-3 bg-shell p-5 sm:grid-cols-2 sm:p-10 lg:grid-cols-3"
        >
          {experiences.map((exp, i) => (
            <motion.button
              key={exp.id}
              type="button"
              onClick={() => {
                setActive(i);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              whileHover={reducedMotion ? undefined : { scale: 1.01 }}
              className="group relative min-h-[260px] overflow-hidden text-left"
            >
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div className="absolute inset-0 bg-soil/45 transition group-hover:bg-soil/30" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-shell">
                <p className="font-atlas text-[9px] text-citrus">{exp.tag}</p>
                <h2 className="font-display mt-1 text-2xl tracking-tight">
                  {exp.title}
                </h2>
              </div>
            </motion.button>
          ))}
        </section>

        <section
          data-chrome-light
          className="bg-shell px-5 py-16 text-center sm:px-10"
        >
          <Link
            href="/visit"
            className="inline-flex rounded-full bg-soil px-8 py-4 text-sm font-bold text-shell"
          >
            Open Visit OS →
          </Link>
        </section>
      </main>
    </AppShell>
  );
}
