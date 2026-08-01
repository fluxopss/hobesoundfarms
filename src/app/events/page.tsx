"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { events, site } from "@/lib/content";
import { AppShell } from "@/components/app-shell";
import { useAcreage } from "@/components/acreage-provider";

export default function EventsPage() {
  const { reducedMotion } = useAcreage();
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });

  return (
    <AppShell>
      <main>
        <section
          data-chrome-dark
          className="relative flex min-h-[85svh] items-end overflow-hidden bg-canopy pt-24 text-shell"
        >
          <Image
            src="/images/live/merica.png"
            alt="'Merica Farm Yeah event at Hobe Sound Farms"
            fill
            className="object-cover kenburns"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canopy via-soil/70 to-soil/40" />
          <div className="grain absolute inset-0" />
          <div className="relative z-10 w-full px-5 pb-16 sm:px-10 lg:px-16">
            <p className="font-atlas text-[10px] text-citrus">
              Coming Up · Events & nights
            </p>
            <h1 className="font-display mt-4 text-[clamp(3rem,10vw,7rem)] leading-[0.85] tracking-tight">
              After dark
            </h1>
            <p className="mt-4 max-w-xl text-lg text-shell/75">
              Farm After Dark, &apos;Merica Farm Yeah, line dancing, market
              weekends, and the Farm Stand — drag the posters.
            </p>
          </div>
        </section>

        <section data-chrome-dark className="bg-canopy py-16">
          <p className="font-atlas px-5 text-[10px] text-shell/40 sm:px-10 lg:px-16">
            Drag / swipe billboards →
          </p>
          <div
            ref={trackRef}
            className="billboard-track mt-6 flex gap-5 overflow-x-auto px-5 pb-4 sm:px-10 lg:px-16"
            onPointerDown={(e) => {
              const el = trackRef.current;
              if (!el) return;
              drag.current = {
                active: true,
                startX: e.clientX,
                scroll: el.scrollLeft,
                moved: false,
              };
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
                transition={{ delay: i * 0.05 }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-shell">
                  <p className="font-atlas text-[10px] text-citrus">
                    {event.when}
                  </p>
                  <h2 className="font-display mt-2 text-3xl tracking-tight">
                    {event.title}
                  </h2>
                  <p className="mt-2 text-sm text-shell/75">{event.desc}</p>
                  <Link
                    href={event.href}
                    className="mt-5 inline-block rounded-full bg-citrus px-5 py-2.5 text-sm font-semibold text-soil"
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

        <section
          data-chrome-light
          className="bg-shell px-5 py-20 text-center sm:px-10"
        >
          <p className="font-atlas text-[10px] text-citrus">Every weekend</p>
          <h2 className="font-display mt-3 text-4xl tracking-tight text-soil">
            Year-round farmers market
          </h2>
          <p className="font-atlas mt-3 text-[9px] text-mute">
            {site.marketHours}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/market"
              className="inline-flex rounded-full bg-soil px-7 py-3.5 text-sm font-bold text-shell"
            >
              Farmers Market →
            </Link>
            <Link
              href="/visit#tickets"
              className="inline-flex rounded-full border border-soil/20 px-7 py-3.5 text-sm font-bold"
            >
              Get tickets
            </Link>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
