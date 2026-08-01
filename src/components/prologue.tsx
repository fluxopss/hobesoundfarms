"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useAcreage } from "@/components/acreage-provider";
import { site } from "@/lib/content";

export function Prologue() {
  const { entered, setEntered, reducedMotion, scrollTo, lenis } = useAcreage();
  const rootRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (entered || exiting) return;
    window.scrollTo(0, 0);
    enterRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") enter();
    };
    window.addEventListener("keydown", onKey);

    const root = rootRef.current;
    if (!root || reducedMotion) {
      return () => window.removeEventListener("keydown", onKey);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".prologue-layer",
        { scale: 1.18, opacity: 0.55 },
        { scale: 1.06, opacity: 1, duration: 2.4, ease: "power2.out" },
      )
        .fromTo(
          ".prologue-veil",
          { opacity: 0.85 },
          { opacity: 1, duration: 1.2 },
          0,
        )
        .fromTo(
          ".prologue-copy > *",
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.14,
            ease: "power3.out",
          },
          0.4,
        )
        .fromTo(
          ".prologue-cta",
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55 },
          "-=0.35",
        );
    }, root);

    return () => {
      ctx.revert();
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered, reducedMotion, exiting]);

  function enter() {
    if (exiting || entered) return;
    setExiting(true);
    const root = rootRef.current;

    const finish = () => {
      setEntered(true);
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        scrollTo("#hub");
      });
    };

    if (!root || reducedMotion) {
      finish();
      return;
    }

    const tl = gsap.timeline({ onComplete: finish });
    tl.to(".prologue-copy", { y: -24, opacity: 0, duration: 0.4 })
      .to(
        ".prologue-wipe",
        { scaleY: 1, duration: 0.55, ease: "power3.inOut" },
        "-=0.15",
      )
      .to(root, { opacity: 0, duration: 0.25 });
  }

  if (entered) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] overflow-hidden bg-soil text-shell"
      role="dialog"
      aria-modal="true"
      aria-label="Enter Hobe Sound Farms"
    >
      <div className="prologue-layer absolute inset-0">
        <Image
          src={site.hero}
          alt="Hobe Sound Farms acreage at golden hour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="prologue-veil absolute inset-0 bg-gradient-to-t from-soil via-soil/55 to-soil/25" />
        <div className="vignette absolute inset-0" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="prologue-wipe pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-soil" />

      <div className="prologue-copy relative z-10 flex h-full flex-col items-center justify-end px-6 pb-16 text-center sm:justify-center sm:pb-0">
        <Image
          src={site.logo}
          alt={site.name}
          width={88}
          height={88}
          className="h-20 w-20 object-contain sm:h-24 sm:w-24"
          priority
        />
        <h1 className="font-display mt-6 text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.88] tracking-tight">
          {site.name}
        </h1>
        <p className="font-atlas mt-4 text-[10px] text-citrus">
          126 acres · Hobe Sound, Florida
        </p>
        <p className="mt-4 max-w-md text-base text-shell/75 sm:text-lg">
          {site.tagline}
        </p>
        <button
          ref={enterRef}
          type="button"
          onClick={enter}
          className="prologue-cta mt-10 rounded-full bg-citrus px-8 py-4 text-sm font-bold tracking-wide text-soil transition hover:bg-citrus-deep hover:text-shell"
        >
          Enter the acreage
        </button>
        <button
          type="button"
          onClick={enter}
          className="font-atlas mt-4 text-[10px] text-shell/40 transition hover:text-shell/70"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}
