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
import { useTrail } from "@/components/trail-provider";

export function MarketActivityDeck() {
  const { reducedMotion } = useTrail();
  const [open, setOpen] = useState<string | null>(activities[0]?.id ?? null);

  return (
    <section data-chrome-light className="bg-bleach py-20 text-ink sm:py-28" aria-label="Market activities">
      <div className="px-5 sm:px-10 lg:pl-28">
        <p className="font-stamp text-[10px] text-flare">Activity deck</p>
        <h2 className="font-display mt-3 text-4xl uppercase tracking-tight sm:text-6xl">
          More than shopping
        </h2>
        <p className="font-stamp mt-4 text-[10px] text-mute">Swipe →</p>
      </div>

      <div className="mt-10 flex gap-3 overflow-x-auto px-5 pb-2 sm:px-10 lg:pl-28">
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
              <Image src={item.image} alt={item.title} fill className="object-cover" sizes="440px" />
              <div className={`absolute inset-0 ${isOpen ? "bg-ink/55" : "bg-ink/40"}`} />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-stamp text-[9px] text-flare">{isOpen ? "Open" : "Tap"}</p>
                <h3 className="font-display mt-1 text-xl uppercase tracking-tight text-bleach sm:text-2xl">
                  {item.title}
                </h3>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 text-sm text-bleach/80"
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
    filter === "all" ? vendorTypes : vendorTypes.filter((v) => v.category === filter);

  return (
    <section data-chrome-dark className="bg-shade py-20 text-bleach sm:py-28" aria-label="Find vendors">
      <div className="px-5 sm:px-10 lg:pl-28">
        <p className="font-stamp text-[10px] text-flare">Find it</p>
        <h2 className="font-display mt-3 text-4xl uppercase tracking-tight sm:text-6xl">
          What&apos;s at the market
        </h2>
        <p className="mt-4 max-w-xl text-bleach/70">
          Roster rotates weekly. Categories stay. Check Facebook a few days before for who&apos;s on the
          ground.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {vendorCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setFilter(c.id)}
              className={`font-stamp rounded-full px-4 py-2.5 text-[10px] transition ${
                filter === c.id
                  ? "bg-flare text-ink"
                  : "border border-bleach/25 text-bleach/70 hover:border-flare hover:text-flare"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((v) => (
            <li key={v.title} className="border border-bleach/15 bg-ink/30 p-6 backdrop-blur-sm">
              <p className="font-stamp text-[9px] text-flare">{v.tag}</p>
              <h3 className="font-display mt-2 text-2xl uppercase tracking-tight">{v.title}</h3>
              <p className="mt-2 text-sm text-bleach/70">{v.desc}</p>
            </li>
          ))}
        </ul>

        <a
          href={site.facebookMarket}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex rounded-full border border-bleach/30 px-5 py-3 text-sm font-semibold transition hover:border-flare hover:text-flare"
        >
          This week&apos;s vendor list on Facebook →
        </a>
      </div>
    </section>
  );
}

export function MarketKnowBefore() {
  return (
    <section data-chrome-light className="bg-bleach py-20 text-ink sm:py-28" aria-label="Know before you go">
      <div className="px-5 sm:px-10 lg:pl-28">
        <p className="font-stamp text-[10px] text-flare">Know before you go</p>
        <h2 className="font-display mt-3 text-4xl uppercase tracking-tight sm:text-5xl">
          Real farm. Real rules.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {knowBefore.map((item, i) => (
            <li
              key={item.title}
              className="relative border border-ink/10 bg-white p-6 shadow-[4px_4px_0_0_rgba(14,21,18,0.08)]"
            >
              <span className="font-stamp absolute right-4 top-4 text-[10px] text-flare">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display pr-8 text-xl uppercase tracking-tight">{item.title}</h3>
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
    <section data-chrome-dark className="overflow-hidden bg-ink py-16 text-bleach" aria-label="Market reviews">
      <p className="font-stamp px-5 text-[10px] text-flare sm:px-10 lg:pl-28">Crowd says</p>
      <div className="mt-6 flex animate-[ticker_40s_linear_infinite] gap-4 whitespace-nowrap hover:[animation-play-state:paused]">
        {loop.map((r, i) => (
          <blockquote
            key={`${r.author}-${i}`}
            className="inline-block w-[min(85vw,380px)] shrink-0 whitespace-normal border border-bleach/15 bg-shade/50 px-6 py-5"
          >
            <p className="text-sm leading-relaxed text-bleach/90">&ldquo;{r.quote}&rdquo;</p>
            <footer className="font-stamp mt-3 text-[9px] text-flare">— {r.author} · Google</footer>
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
      className="relative overflow-hidden bg-flare px-5 py-20 text-ink sm:px-10 sm:py-24 lg:pl-28"
      aria-label="Join the market"
    >
      <div className="grain absolute inset-0 opacity-40" />
      <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="font-stamp text-[10px]">Vendors · Bundles</p>
          <h2 className="font-display mt-3 text-4xl uppercase tracking-tight sm:text-6xl">
            Be part of the weekend
          </h2>
          <p className="mt-4 max-w-lg text-ink/80">
            Apply to sell, grab an HSFM Activity Bundle, or just show up Saturday morning hungry.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/#arrive"
            className="rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-bleach transition hover:bg-shade"
          >
            Vendor / visit inquire
          </Link>
          <Link
            href="/#tickets"
            className="rounded-full border-2 border-ink px-6 py-3.5 text-sm font-bold transition hover:bg-ink hover:text-bleach"
          >
            Activity Bundle
          </Link>
        </div>
      </div>
    </section>
  );
}
