"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { activities, knowBefore, reviews, site } from "@/lib/content";

export function WeekendArcade() {
  const [open, setOpen] = useState<string | null>(activities[0]?.id ?? null);

  return (
    <section id="weekend" className="bg-bleach py-20 text-ink sm:py-28" aria-label="Weekend market arcade">
      <div className="px-5 sm:px-10 lg:pl-28">
        <p className="font-stamp text-[10px] text-flare">Weekend · Market + activities</p>
        <h2 className="font-display mt-3 max-w-[12ch] text-4xl uppercase tracking-tight sm:text-6xl">
          More than a market
        </h2>
        <p className="mt-4 max-w-xl text-mute">
          Sat & Sun {site.marketHours.replace("Sat & Sun ", "")}. Vendors, food, live music — plus Gem Jungle,
          Bouquet Bunker, tractor rides, and animal encounters.
        </p>
      </div>

      <div className="mt-12 flex gap-3 overflow-x-auto px-5 pb-2 sm:px-10 lg:pl-28">
        {activities.map((item) => {
          const isOpen = open === item.id;
          return (
            <motion.button
              key={item.id}
              type="button"
              layout
              onClick={() => setOpen(isOpen ? null : item.id)}
              className={`relative shrink-0 overflow-hidden text-left transition ${
                isOpen ? "w-[min(88vw,420px)]" : "w-[160px] sm:w-[180px]"
              } h-[340px] sm:h-[400px]`}
            >
              <Image src={item.image} alt="" fill className="object-cover" sizes="420px" />
              <div
                className={`absolute inset-0 transition ${
                  isOpen ? "bg-ink/55" : "bg-ink/35 hover:bg-ink/25"
                }`}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="font-stamp text-[9px] text-flare">{isOpen ? "Open" : "Tap"}</p>
                <h3 className="font-display mt-1 text-xl uppercase tracking-tight text-bleach sm:text-2xl">
                  {item.title}
                </h3>
                <AnimatePresence>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
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

      <div className="mt-16 grid gap-10 px-5 sm:px-10 lg:grid-cols-[1.2fr_1fr] lg:pl-28">
        <div>
          <p className="font-stamp text-[10px] text-flare">Know before you go</p>
          <ul className="mt-4 space-y-2">
            {knowBefore.map((item) => (
              <li key={item} className="border-l-2 border-flare pl-4 text-sm text-ink">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-mute">
            Vendor roster rotates weekly — check their Facebook list a few days before you visit. No fake names
            here.
          </p>
        </div>
        <div className="space-y-4">
          {reviews.map((r) => (
            <blockquote key={r.author} className="border border-ink/10 bg-white p-5">
              <p className="text-sm leading-relaxed text-ink">&ldquo;{r.quote}&rdquo;</p>
              <footer className="font-stamp mt-3 text-[9px] text-mute">— {r.author} · Google</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
