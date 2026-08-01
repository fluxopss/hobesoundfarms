"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  activities,
  knowBefore,
  reviews,
  site,
  vendorCategories,
  vendorTypes,
} from "@/lib/content";
import { useAcreage } from "@/components/acreage-provider";

export function MarketActivityDeck() {
  const { reducedMotion } = useAcreage();
  const [open, setOpen] = useState<string | null>(activities[0]?.id ?? null);

  return (
    <section
      data-chrome-light
      className="bg-shell py-20 text-soil sm:py-28"
      aria-label="Market activities"
    >
      <div className="px-5 sm:px-10 lg:px-16">
        <p className="font-atlas text-[10px] text-citrus">Activity deck</p>
        <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-6xl">
          More than shopping
        </h2>
        <p className="font-atlas mt-4 text-[10px] text-mute">Swipe →</p>
      </div>

      <div className="mt-10 flex gap-3 overflow-x-auto px-5 pb-2 sm:px-10 lg:px-16">
        {activities.map((item) => {
          const isOpen = open === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              layout={!reducedMotion}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className={`relative h-[360px] shrink-0 overflow-hidden text-left sm:h-[420px] ${
                isOpen ? "w-[min(88vw,440px)]" : "w-[170px] sm:w-[190px]"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="440px"
              />
              <div
                className={`absolute inset-0 ${isOpen ? "bg-soil/55" : "bg-soil/40"}`}
              />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-atlas text-[9px] text-citrus">
                  {isOpen ? "Open" : "Tap"}
                </p>
                <h3 className="font-display mt-1 text-xl tracking-tight text-shell sm:text-2xl">
                  {item.title}
                </h3>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={
                        reducedMotion ? false : { opacity: 0, height: 0 }
                      }
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-sm text-shell/80"
                    >
                      {item.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}

export function MarketFindIt() {
  const [filter, setFilter] = useState("all");
  const list =
    filter === "all"
      ? vendorTypes
      : vendorTypes.filter((v) => v.category === filter);

  return (
    <section
      data-chrome-dark
      className="bg-canopy py-20 text-shell sm:py-28"
      aria-label="Find vendors"
    >
      <div className="px-5 sm:px-10 lg:px-16">
        <p className="font-atlas text-[10px] text-citrus">Find it</p>
        <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-6xl">
          What&apos;s at the market
        </h2>
        <p className="mt-4 max-w-xl text-shell/70">
          Roster rotates weekly. Categories stay. Check Facebook a few days
          before for who&apos;s on the ground.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {vendorCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={`rounded-full px-4 py-2.5 text-[11px] font-medium transition ${
                filter === c.id
                  ? "bg-citrus text-soil"
                  : "border border-shell/25 text-shell/70 hover:border-citrus hover:text-citrus"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <li
              key={v.title}
              className="border border-shell/15 bg-soil/30 p-6 backdrop-blur-sm"
            >
              <p className="font-atlas text-[9px] text-citrus">{v.tag}</p>
              <h3 className="font-display mt-2 text-2xl tracking-tight">
                {v.title}
              </h3>
              <p className="mt-2 text-sm text-shell/70">{v.desc}</p>
            </li>
          ))}
        </ul>

        <a
          href={site.facebookMarket}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-full border border-shell/30 px-5 py-3 text-sm font-semibold transition hover:border-citrus hover:text-citrus"
        >
          This week&apos;s vendor list on Facebook →
        </a>
      </div>
    </section>
  );
}

export function MarketKnowBefore() {
  return (
    <section
      data-chrome-light
      className="bg-shell py-20 text-soil sm:py-28"
      aria-label="Know before you go"
    >
      <div className="px-5 sm:px-10 lg:px-16">
        <p className="font-atlas text-[10px] text-citrus">Know before you go</p>
        <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-5xl">
          Real farm. Real rules.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {knowBefore.map((item, i) => (
            <li
              key={item.title}
              className="relative border border-soil/10 bg-white/70 p-6"
            >
              <span className="font-atlas absolute right-4 top-4 text-[10px] text-citrus">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display pr-8 text-xl tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-mute">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ReviewTicker() {
  const loop = [...reviews, ...reviews];
  return (
    <section
      data-chrome-dark
      className="overflow-hidden bg-soil py-16 text-shell"
      aria-label="Market reviews"
    >
      <p className="font-atlas px-5 text-[10px] text-citrus sm:px-10 lg:px-16">
        Crowd says
      </p>
      <div className="mt-6 flex animate-[ticker_40s_linear_infinite] gap-4 whitespace-nowrap hover:[animation-play-state:paused]">
        {loop.map((r, i) => (
          <blockquote
            key={`${r.author}-${i}`}
            className="inline-block w-[min(85vw,380px)] shrink-0 whitespace-normal border border-shell/15 bg-canopy/50 px-6 py-5"
          >
            <p className="text-sm leading-relaxed text-shell/90">
              &ldquo;{r.quote}&rdquo;
            </p>
            <footer className="font-atlas mt-3 text-[9px] text-citrus">
              — {r.author} · Google
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export function MarketJoinStrip() {
  return (
    <section
      data-chrome-dark
      className="relative overflow-hidden bg-citrus px-5 py-20 text-soil sm:px-10 sm:py-24 lg:px-16"
      aria-label="Join the market"
    >
      <div className="grain absolute inset-0 opacity-30" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="font-atlas text-[10px]">Vendors · Bundles</p>
          <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-6xl">
            Be part of the weekend
          </h2>
          <p className="mt-4 max-w-lg text-soil/80">
            Apply to sell, grab an HSFM Activity Bundle, or just show up
            Saturday morning hungry.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/visit"
            className="rounded-full bg-soil px-6 py-3.5 text-sm font-bold text-shell transition hover:bg-canopy"
          >
            Vendor / visit inquire
          </Link>
          <Link
            href="/visit#tickets"
            className="rounded-full border-2 border-soil px-6 py-3.5 text-sm font-bold transition hover:bg-soil hover:text-shell"
          >
            Activity Bundle
          </Link>
        </div>
      </div>
    </section>
  );
}
