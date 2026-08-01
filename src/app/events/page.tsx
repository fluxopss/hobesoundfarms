"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { events, site } from "@/lib/content";
import { TrailChrome } from "@/components/trail-chrome";
import { SiteFooter } from "@/components/site-footer";
import { ArriveAndBook } from "@/components/arrive-and-book";
import { useTrail } from "@/components/trail-provider";

export default function EventsPage() {
  const { reducedMotion } = useTrail();
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });

  return (
    <>
      <TrailChrome />
      <main>
        <section
          data-chrome-dark
          className="relative flex min-h-[80svh] items-end overflow-hidden bg-shade pt-24 text-bleach"
        >
          <Image
            src="/images/live/merica.png"
            alt="'Merica Farm Yeah event at Hobe Sound Farms"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-shade via-ink/70 to-ink/40" />
          <div className="relative z-10 w-full px-5 pb-16 sm:px-10 lg:pl-28">
            <p className="font-stamp text-[10px] text-flare">Nights · Billboards</p>
            <h1 className="font-display mt-4 text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.85] tracking-tight">
              Coming up
            </h1>
            <p className="mt-4 max-w-xl text-lg text-bleach/75">
              Markets, sendoffs, line dancing, farm stand — drag the posters.
            </p>
          </div>
        </section>

        <section data-chrome-dark className="bg-shade py-16">
          <p className="font-stamp px-5 text-[10px] text-bleach/40 sm:px-10 lg:pl-28">
            Drag / swipe billboards →
          </p>
          <div
            ref={trackRef}
            className="mt-6 flex gap-5 overflow-x-auto px-5 pb-4 sm:px-10 lg:pl-28"
            onPointerDown={(e) => {
              const el = trackRef.current;
              if (!el) return;
              drag.current = { active: true, startX: e.clientX, scroll: el.scrollLeft, moved: false };
              el.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!drag.current.active || !trackRef.current) return;
              const dx = e.clientX - drag.current.startX;
              if (Math.abs(dx) > 8) drag.current.moved = true;
              if (drag.current.moved) {
                trackRef.current.scrollLeft = drag.current.scroll - dx;
              }
            }}
            onPointerUp={() => {
              drag.current.active = false;
            }}
          >
            {events.map((event, i) => (
              <motion.article
                key={event.id}
                initial={reducedMotion ? false : { opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative h-[480px] w-[min(85vw,400px)] shrink-0 overflow-hidden sm:h-[560px]"
              >
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="400px"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-bleach">
                  <p className="font-stamp text-[10px] text-flare">{event.when}</p>
                  <h2 className="font-display mt-2 text-3xl uppercase tracking-tight">{event.title}</h2>
                  <p className="mt-2 text-sm text-bleach/75">{event.desc}</p>
                  <Link
                    href={event.href}
                    className="mt-5 inline-block rounded-full bg-flare px-5 py-2.5 text-sm font-semibold text-ink"
                    onClick={(e) => {
                      if (drag.current.moved) e.preventDefault();
                    }}
                  >
                    {event.cta}
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section data-chrome-light className="bg-bleach px-5 py-16 text-center sm:px-10">
          <p className="font-stamp text-[10px] text-flare">Every weekend</p>
          <h2 className="font-display mt-3 text-4xl uppercase tracking-tight text-ink">
            The Market never sleeps
          </h2>
          <Link
            href="/market"
            className="mt-8 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-bleach"
          >
            Enter Market Mode →
          </Link>
          <p className="font-stamp mt-4 text-[9px] text-mute">{site.marketHours}</p>
        </section>

        <ArriveAndBook />
      </main>
      <SiteFooter />
    </>
  );
}
