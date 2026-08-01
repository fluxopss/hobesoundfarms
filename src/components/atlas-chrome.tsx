"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { modes, site } from "@/lib/content";
import { useAcreage } from "@/components/acreage-provider";

export function AtlasChrome() {
  const pathname = usePathname();
  const { entered } = useAcreage();
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      let dark =
        pathname === "/" ||
        pathname === "/market" ||
        pathname === "/animals" ||
        pathname === "/events" ||
        pathname === "/experiences";
      document.querySelectorAll("[data-chrome-dark]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < 80 && r.bottom > 80) dark = true;
      });
      document.querySelectorAll("[data-chrome-light]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < 80 && r.bottom > 80) dark = false;
      });
      setOnDark(dark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const ready = pathname !== "/" || entered;
  if (!ready) return null;

  const bar = onDark
    ? scrolled
      ? "bg-soil/88 text-shell backdrop-blur-xl"
      : "bg-transparent text-shell"
    : "bg-shell/92 text-soil backdrop-blur-xl border-b border-soil/8";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${bar}`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={site.logo}
              alt={site.name}
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <span className="font-display hidden text-lg tracking-tight sm:inline">
              Hobe Sound Farms
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Modes">
            {modes.map((mode) => {
              const active = pathname === mode.href;
              return (
                <Link
                  key={mode.id}
                  href={mode.href}
                  className={`rounded-full px-3.5 py-2 text-[11px] font-medium tracking-wide transition ${
                    active
                      ? "bg-citrus text-soil"
                      : onDark
                        ? "text-shell/70 hover:bg-shell/10 hover:text-shell"
                        : "text-mute hover:bg-soil/5 hover:text-soil"
                  }`}
                >
                  {mode.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/visit"
            className="rounded-full bg-citrus px-4 py-2.5 text-[11px] font-bold tracking-wide text-soil transition hover:bg-citrus-deep hover:text-shell"
          >
            Plan visit
          </Link>
        </div>
      </header>

      {/* Mobile atlas dock */}
      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-shell/10 bg-soil/95 px-2 py-2 backdrop-blur-xl pb-safe md:hidden"
        aria-label="Mode dock"
      >
        <div className="flex items-stretch justify-around gap-1">
          <Link
            href="/"
            className={`flex flex-1 flex-col items-center rounded-xl px-1 py-2 text-[9px] uppercase tracking-wider ${
              pathname === "/" ? "bg-citrus/20 text-citrus" : "text-shell/55"
            }`}
          >
            Atlas
          </Link>
          {modes.map((mode) => (
            <Link
              key={mode.id}
              href={mode.href}
              className={`flex flex-1 flex-col items-center rounded-xl px-1 py-2 text-[9px] uppercase tracking-wider ${
                pathname === mode.href
                  ? "bg-citrus/20 text-citrus"
                  : "text-shell/55"
              }`}
            >
              {mode.short}
            </Link>
          ))}
          <Link
            href="/visit"
            className={`flex flex-1 flex-col items-center rounded-xl px-1 py-2 text-[9px] uppercase tracking-wider ${
              pathname === "/visit"
                ? "bg-citrus text-soil"
                : "text-shell/55"
            }`}
          >
            Visit
          </Link>
        </div>
      </nav>
    </>
  );
}

/** Compat */
export { AtlasChrome as TrailChrome };
