"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trailChapters } from "@/lib/content";
import { useTrail } from "@/components/trail-provider";
import { TrailChrome } from "@/components/trail-chrome";

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
    <TrailChrome showChapterNav>
      <nav
        className="fixed bottom-0 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-ink/15 bg-bleach/95 px-2 py-2 shadow-lg backdrop-blur-md pb-safe sm:bottom-auto sm:left-5 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2 sm:flex-col sm:rounded-2xl sm:px-2 sm:py-3 sm:pb-3"
        aria-label="Trail chapters"
        style={{ marginBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        {trailChapters.map((chapter) => {
          const active = activeChapter === chapter.id;
          return (
            <button
              key={chapter.id}
              type="button"
              onClick={() => scrollTo(chapter.href)}
              className={`font-stamp min-h-11 rounded-full px-3 py-2.5 text-[11px] transition ${
                active ? "bg-ink text-bleach" : "text-mute hover:bg-ink/5 hover:text-ink"
              }`}
              aria-current={active ? "true" : undefined}
            >
              {chapter.label}
            </button>
          );
        })}
      </nav>

      {!reducedMotion && (
        <p className="font-stamp pointer-events-none fixed bottom-20 right-5 z-40 hidden text-[10px] text-mute lg:bottom-5 lg:block">
          Scroll the trail
        </p>
      )}
    </TrailChrome>
  );
}
