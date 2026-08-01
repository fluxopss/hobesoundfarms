"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useAcreage } from "@/components/acreage-provider";
import { site } from "@/lib/content";

export function Prologue() {
  const { entered, setEntered, reducedMotion } = useAcreage();
  const rootRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (reducedMotion && !entered) setEntered(true);
  }, [reducedMotion, entered, setEntered]);

  useEffect(() => {
    if (entered || reducedMotion) return;
    enterRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") setEntered(true);
    };
    window.addEventListener("keydown", onKey);

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".prologue-layer",
        { scale: 1.12, opacity: 0.7 },
        { scale: 1.05, opacity: 1, duration: 2.2, ease: "power2.out" },
      );
      gsap.fromTo(
        ".prologue-copy > *",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.35,
          ease: "power3.out",
        },
      );
    }, root);

    return () => {
      ctx.revert();
      window.removeEventListener("keydown", onKey);
    };
  }, [entered, reducedMotion, setEntered]);

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
        <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/55 to-soil/25" />
        <div className="vignette absolute inset-0" />
        <div className="grain absolute inset-0" />
      </div>

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
          onClick={() => setEntered(true)}
          className="mt-10 rounded-full bg-citrus px-8 py-4 text-sm font-bold tracking-wide text-soil transition hover:bg-citrus-deep hover:text-shell"
        >
          Enter the acreage
        </button>
        <button
          type="button"
          onClick={() => setEntered(true)}
          className="font-atlas mt-4 text-[10px] text-shell/40 transition hover:text-shell/70"
        >
          Skip
        </button>
      </div>
    </div>
  );
}
