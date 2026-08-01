"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marketStats, site } from "@/lib/content";
import { useAcreage } from "@/components/acreage-provider";

gsap.registerPlugin(ScrollTrigger);

function useWeekendStatus() {
  const [label, setLabel] = useState("Open this weekend");
  useEffect(() => {
    const d = new Date();
    const day = d.getDay();
    const hour = d.getHours();
    if ((day === 6 || day === 0) && hour >= 9 && hour < 14) {
      setLabel("Open now · until 2pm");
    } else if (day === 6 || day === 0) {
      setLabel(hour < 9 ? "Opens today at 9am" : "See you next weekend");
    } else {
      const days = day === 0 ? 6 : 6 - day;
      setLabel(days === 1 ? "Opens tomorrow 9am" : `Opens in ${days} days`);
    }
  }, []);
  return label;
}

function CountUp({
  value,
  suffix,
  play,
}: {
  value: number;
  suffix: string;
  play: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!play) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, value]);
  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}

export function MarketPulse({ embedded = false }: { embedded?: boolean }) {
  const { reducedMotion, entered } = useAcreage();
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);
  const status = useWeekendStatus();

  useEffect(() => {
    if (!entered && !embedded) return;
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      setPlay(true);
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-pulse]"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            onEnter: () => setPlay(true),
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [entered, embedded, reducedMotion]);

  return (
    <section
      id="market-pulse"
      ref={ref}
      data-chrome-dark
      className={`relative overflow-hidden bg-soil text-shell ${
        embedded ? "min-h-[70svh] py-20" : "flex min-h-[100svh] items-end"
      }`}
      aria-label="Farmers Market pulse"
    >
      {!embedded && (
        <div className="absolute inset-0">
          <Image
            src="/images/live/event-market.png"
            alt="Hobe Sound Farmers Market weekend crowd and vendors"
            fill
            className="object-cover scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/70 to-soil/30" />
          <div className="grain absolute inset-0" />
        </div>
      )}

      <div
        className={`relative z-10 w-full px-5 sm:px-10 lg:px-16 ${
          embedded ? "" : "pb-28 pt-32 sm:pb-32"
        }`}
      >
        <p
          data-pulse
          className="font-atlas inline-flex items-center gap-2 rounded-full border border-citrus/50 bg-citrus/15 px-4 py-2 text-[10px] text-citrus"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-citrus" />
          {status}
        </p>

        <h2
          data-pulse
          className="font-display mt-5 max-w-[12ch] text-[clamp(2.5rem,8vw,5rem)] leading-[0.9] tracking-tight"
        >
          {embedded ? "The weekend pulse" : "The Market"}
        </h2>

        <p data-pulse className="mt-4 max-w-xl text-lg text-shell/80">
          South Florida&apos;s weekend ritual — {site.marketHours}. 60+ vendors,
          live music, Gem Jungle, tractor rides, animals, and a bar on a working
          farm.
        </p>

        <div
          data-pulse
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {marketStats.map((stat) => (
            <div
              key={stat.label}
              className="border border-shell/20 bg-soil/40 px-4 py-5 backdrop-blur-sm"
            >
              <p className="font-display text-3xl text-citrus sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} play={play} />
              </p>
              <p className="font-atlas mt-2 text-[9px] text-shell/55">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {!embedded && (
          <div data-pulse className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/market"
              className="rounded-full bg-citrus px-7 py-4 text-sm font-bold tracking-wide text-soil transition hover:bg-citrus-deep hover:text-shell"
            >
              Enter Market Mode
            </Link>
            <Link
              href="/visit"
              className="rounded-full border border-shell/45 bg-shell/10 px-7 py-4 text-sm font-semibold text-shell backdrop-blur-sm"
            >
              Plan visit
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
