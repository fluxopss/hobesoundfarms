"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trailChapters, site } from "@/lib/content";
import { useTrail } from "@/components/trail-provider";

gsap.registerPlugin(ScrollTrigger);

export function TrailHUD() {
  const { gateDone, activeChapter, setActiveChapter, scrollTo, reducedMotion } = useTrail();

  useEffect(() => {
    if (!gateDone) return;

    const triggers = trailChapters.map((chapter) =>
      ScrollTrigger.create({
        trigger: `#${chapter.id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveChapter(chapter.id),
        onEnterBack: () => setActiveChapter(chapter.id),
      }),
    );

    return () => triggers.forEach((t) => t.kill());
  }, [gateDone, setActiveChapter]);

  if (!gateDone) return null;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 text-bleach">
            <Image src={site.logo} alt="" width={40} height={40} className="h-9 w-9 object-contain" />
            <span className="font-display hidden text-lg uppercase tracking-tight sm:inline">
              Hobe Sound Farms
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollTo("#weekend")}
              className="font-stamp hidden text-[10px] text-bleach/80 transition hover:text-flare sm:inline"
            >
              This Weekend
            </button>
            <button
              type="button"
              onClick={() => scrollTo("#arrive")}
              className="rounded-full bg-flare px-4 py-2 font-stamp text-[10px] text-ink transition hover:bg-flare-deep hover:text-bleach"
            >
              Plan a Visit
            </button>
          </div>
        </div>
      </header>

      <nav
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-ink/15 bg-bleach/90 px-2 py-2 shadow-lg backdrop-blur-md sm:bottom-auto sm:left-5 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2 sm:flex-col sm:rounded-2xl sm:px-2 sm:py-3"
        aria-label="Trail chapters"
      >
        {trailChapters.map((chapter) => {
          const active = activeChapter === chapter.id;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollTo(chapter.href)}
              className={`font-stamp rounded-full px-3 py-2 text-[9px] transition ${
                active
                  ? "bg-ink text-bleach"
                  : "text-mute hover:bg-ink/5 hover:text-ink"
              }`}
              aria-current={active ? "true" : undefined}
            >
              {chapter.label}
            </button>
          );
        })}
      </nav>

      {!reducedMotion && (
        <p className="font-stamp pointer-events-none fixed bottom-5 right-5 z-40 hidden text-[9px] text-mute lg:block">
          Scroll the trail
        </p>
      )}
    </>
  );
}
