"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { events } from "@/lib/content";

export function EventBillboards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });

  return (
    <section
      id="nights"
      data-chrome-dark
      className="bg-shade py-20 text-bleach sm:py-28"
      aria-label="Events billboard theater"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 px-5 sm:px-10 lg:pl-28">
        <div>
          <p className="font-stamp text-[10px] text-flare">Nights · Billboards</p>
          <h2 className="font-display mt-3 text-4xl uppercase tracking-tight sm:text-6xl">
            Coming up on the farm
          </h2>
        </div>
        <Link
          href="/events"
          className="rounded-full border border-bleach/30 px-5 py-2.5 text-sm transition hover:border-flare hover:text-flare"
        >
          Full calendar
        </Link>
      </div>

      <div
        ref={trackRef}
        className="billboard-track flex gap-5 overflow-x-auto px-5 pb-4 sm:px-10 lg:pl-28"
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
        {events.map((event) => (
          <article
            key={event.id}
            className="relative h-[420px] w-[min(85vw,380px)] shrink-0 overflow-hidden sm:h-[520px] sm:w-[440px]"
          >
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="440px"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-stamp text-[10px] text-flare">{event.when}</p>
              <h3 className="font-display mt-2 text-3xl uppercase tracking-tight">{event.title}</h3>
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
          </article>
        ))}
      </div>
      <p className="font-stamp mt-4 px-5 text-[9px] text-bleach/40 sm:px-10 lg:pl-28">
        Drag / swipe billboards →
      </p>
    </section>
  );
}
