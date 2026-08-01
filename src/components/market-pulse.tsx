"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marketStats, site } from "@/lib/content";
import { useTrail } from "@/components/trail-provider";

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

export function MarketPulse() {
  const { reducedMotion, gateDone } = useTrail();
  const ref = useRef<HTMLElement>(null);
  const [play, setPlay] = useState(false);
  const status = useWeekendStatus();

  useEffect(() => {
    if (!gateDone) return;
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
  }, [gateDone, reducedMotion]);

  return (
    <section
      id="market"
      ref={ref}
      data-chrome-dark
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-bleach"
      aria-label="Farmers Market pulse"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/live/event-market.png"
          alt="Hobe Sound Farmers Market weekend crowd and vendors"
          fill
          className="object-cover scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,90,60,0.35),transparent_45%)]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative z-10 w-full px-5 pb-28 pt-32 sm:px-10 sm:pb-32 lg:pl-28">
        <p
          data-pulse
          className="font-stamp inline-flex items-center gap-2 rounded-full border border-flare/50 bg-flare/15 px-4 py-2 text-[10px] text-flare"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-flare" />
          {status}
        </p>

        <h2
          data-pulse
          className="font-display mt-5 max-w-[10ch] text-[clamp(4rem,14vw,10rem)] leading-[0.82] uppercase tracking-tight"
        >
          The Market
        </h2>

        <p data-pulse className="mt-4 max-w-xl text-lg text-bleach/80 sm:text-xl">
          South Florida&apos;s weekend ritual — {site.marketHours}. 60+ vendors, live music, Gem
          Jungle, tractor rides, animals, and a bar on a working farm.
        </p>

        <div data-pulse className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {marketStats.map((stat) => (
            <div
              key={stat.label}
              className="border border-bleach/20 bg-ink/40 px-4 py-5 backdrop-blur-sm"
            >
              <p className="font-display text-3xl text-flare sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} play={play} />
              </p>
              <p className="font-stamp mt-2 text-[9px] text-bleach/55">{stat.label}</p>
            </div>
          ))}
        </div>

        <div data-pulse className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/market"
            className="rounded-full bg-flare px-7 py-4 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-flare-deep hover:text-bleach"
          >
            Enter Market Mode
          </Link>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-bleach/45 bg-bleach/10 px-7 py-4 text-sm font-semibold text-bleach backdrop-blur-sm transition hover:bg-bleach/20"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
