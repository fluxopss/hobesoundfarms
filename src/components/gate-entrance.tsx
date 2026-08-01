"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useTrail } from "@/components/trail-provider";
import { site } from "@/lib/content";

export function GateEntrance() {
  const { gateDone, setGateDone, reducedMotion } = useTrail();
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (reducedMotion && !gateDone) {
      setGateDone(true);
    }
  }, [reducedMotion, gateDone, setGateDone]);

  useEffect(() => {
    if (gateDone || reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    skipRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGateDone(true);
    };
    window.addEventListener("keydown", onKey);

    const left = root.querySelector<HTMLElement>(".gate-left");
    const right = root.querySelector<HTMLElement>(".gate-right");
    const stamp = root.querySelector<HTMLElement>(".gate-stamp");
    const brand = root.querySelector<HTMLElement>(".gate-brand");
    const dust = root.querySelectorAll<HTMLElement>(".gate-dust");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => setGateDone(true),
      });

      tl.fromTo(stamp, { opacity: 0, y: 20, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.55 })
        .to(stamp, { opacity: 0, y: -12, duration: 0.35, delay: 0.35 })
        .to(left, { xPercent: -105, duration: 1.1 }, "-=0.1")
        .to(right, { xPercent: 105, duration: 1.1 }, "<")
        .fromTo(brand, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
        .to(dust, { opacity: 0.35, duration: 0.4, stagger: 0.05 }, "-=0.8")
        .to(dust, { opacity: 0, y: -40, duration: 0.8, stagger: 0.04 })
        .to(brand, { opacity: 0, duration: 0.35, delay: 0.25 })
        .to(root, { opacity: 0, duration: 0.4, pointerEvents: "none" });
    }, root);

    return () => {
      ctx.revert();
      window.removeEventListener("keydown", onKey);
    };
  }, [gateDone, reducedMotion, setGateDone]);

  if (gateDone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-ink"
      role="dialog"
      aria-modal="true"
      aria-label="Opening the farm gate"
    >
      <div className="gate-left absolute inset-y-0 left-0 w-1/2 bg-shade" />
      <div className="gate-right absolute inset-y-0 right-0 w-1/2 bg-ink">
        <div className="absolute inset-y-0 left-0 w-px bg-flare/40" />
      </div>

      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="gate-dust absolute h-1.5 w-1.5 rounded-full bg-dust opacity-0"
          style={{ left: `${20 + i * 8}%`, top: `${40 + (i % 3) * 12}%` }}
        />
      ))}

      <p className="gate-stamp font-stamp absolute z-10 text-center text-[11px] text-bleach/80 sm:text-xs">
        126 acres · Hobe Sound, FL
      </p>

      <div className="gate-brand absolute z-10 flex flex-col items-center gap-4 opacity-0">
        <Image
          src={site.logo}
          alt={site.name}
          width={72}
          height={72}
          className="h-16 w-16 object-contain"
          priority
        />
        <p className="font-display text-center text-4xl uppercase tracking-tight text-bleach sm:text-6xl">
          {site.name}
        </p>
      </div>

      <button
        ref={skipRef}
        type="button"
        onClick={() => setGateDone(true)}
        className="font-stamp absolute bottom-8 right-6 z-20 min-h-11 px-3 text-[10px] text-bleach/50 transition hover:text-flare"
      >
        Skip
      </button>
    </div>
  );
}
