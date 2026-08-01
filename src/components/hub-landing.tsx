"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { intents, modes, site } from "@/lib/content";
import { useAcreage } from "@/components/acreage-provider";

const modeVisual: Record<string, { image: string; tone: string }> = {
  market: {
    image: "/images/live/event-market.png",
    tone: "from-citrus/40",
  },
  residents: {
    image: "/images/live/goat.jpg",
    tone: "from-lagoon/40",
  },
  nights: {
    image: "/images/live/merica.png",
    tone: "from-canopy/50",
  },
  experiences: {
    image: "/images/live/offer-5.png",
    tone: "from-shell/20",
  },
};

export function HubLanding() {
  const { reducedMotion, scrollTo } = useAcreage();

  return (
    <section
      id="hub"
      data-chrome-dark
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-soil pt-24 text-shell"
      aria-label="Acreage world hub"
    >
      <div className="absolute inset-0">
        <Image
          src={site.map}
          alt=""
          fill
          className="object-cover opacity-35 kenburns"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/85 to-soil/45" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-10 px-5 pb-10 sm:px-10 lg:px-16">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-atlas text-[10px] text-citrus">
            The Acreage · App hub
          </p>
          <h1 className="font-display mt-3 max-w-[14ch] text-[clamp(2.75rem,9vw,6rem)] leading-[0.88] tracking-tight">
            You&apos;re on the property
          </h1>
          <p className="mt-4 max-w-xl text-lg text-shell/75">
            {site.blurb}
          </p>
        </motion.div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {intents.map((intent) => (
            <Link
              key={intent.label}
              href={intent.href}
              className="shrink-0 rounded-full border border-shell/20 bg-shell/5 px-4 py-2 text-[12px] text-shell/85 backdrop-blur-sm transition hover:border-citrus hover:bg-citrus hover:text-soil"
            >
              {intent.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {modes.map((mode, i) => {
            const visual = modeVisual[mode.id];
            return (
              <motion.div
                key={mode.id}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.07, duration: 0.55 }}
              >
                <Link
                  href={mode.href}
                  className="group relative flex min-h-[190px] flex-col justify-end overflow-hidden p-5"
                >
                  <Image
                    src={visual.image}
                    alt=""
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="25vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${visual.tone} via-soil/50 to-soil/20`}
                  />
                  <div className="absolute inset-0 bg-soil/35 transition group-hover:bg-soil/15" />
                  <div className="relative z-10">
                    <p className="font-atlas text-[9px] text-citrus">
                      Mode {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-display mt-1 text-2xl tracking-tight">
                      {mode.label}
                    </h2>
                    <p className="mt-1 text-sm text-shell/70">{mode.desc}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => scrollTo("#atlas")}
            className="rounded-full bg-citrus px-7 py-3.5 text-sm font-bold text-soil transition hover:bg-citrus-deep hover:text-shell"
          >
            Open interactive map
          </button>
          <Link
            href="/visit"
            className="rounded-full border border-shell/35 px-7 py-3.5 text-sm font-semibold text-shell transition hover:bg-shell/10"
          >
            Plan a visit
          </Link>
        </div>
      </div>
    </section>
  );
}
