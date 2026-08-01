"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/content";
import { useTrail } from "@/components/trail-provider";

const nav = [
  { href: "/market", label: "Market", primary: true },
  { href: "/animals", label: "Residents" },
  { href: "/events", label: "Nights" },
  { href: "/experiences", label: "Book" },
];

export function TrailChrome({
  showChapterNav = false,
  children,
}: {
  showChapterNav?: boolean;
  children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const { gateDone, scrollTo } = useTrail();
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(pathname === "/" || pathname === "/market");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const darkSections = document.querySelectorAll("[data-chrome-dark]");
      let dark = pathname === "/" || pathname === "/market" || pathname === "/animals";
      darkSections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < 80 && r.bottom > 80) dark = true;
      });
      const light = document.querySelectorAll("[data-chrome-light]");
      light.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < 80 && r.bottom > 80) dark = false;
      });
      setOnDark(dark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const ready = pathname !== "/" || gateDone;
  if (!ready) return null;

  const bar = onDark
    ? scrolled
      ? "bg-ink/90 text-bleach backdrop-blur-md"
      : "bg-transparent text-bleach"
    : "bg-bleach/95 text-ink backdrop-blur-md border-b border-ink/10";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${bar}`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={site.logo}
              alt={site.name}
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
            <span className="font-display hidden text-lg uppercase tracking-tight sm:inline">
              Hobe Sound Farms
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-stamp rounded-full px-3 py-2.5 text-[10px] transition sm:px-4 ${
                    item.primary
                      ? "bg-flare text-ink hover:bg-flare-deep hover:text-bleach"
                      : active
                        ? onDark
                          ? "bg-bleach/15 text-bleach"
                          : "bg-ink/10 text-ink"
                        : onDark
                          ? "text-bleach/70 hover:text-flare"
                          : "text-mute hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            {pathname === "/" ? (
              <button
                type="button"
                onClick={() => scrollTo("#arrive")}
                className={`font-stamp hidden rounded-full px-4 py-2.5 text-[10px] sm:inline ${
                  onDark
                    ? "border border-bleach/40 text-bleach hover:bg-bleach/10"
                    : "border border-ink/20 text-ink hover:bg-ink/5"
                }`}
              >
                Plan a Visit
              </button>
            ) : (
              <Link
                href="/#arrive"
                className={`font-stamp hidden rounded-full px-4 py-2.5 text-[10px] sm:inline ${
                  onDark
                    ? "border border-bleach/40 text-bleach hover:bg-bleach/10"
                    : "border border-ink/20 text-ink hover:bg-ink/5"
                }`}
              >
                Plan a Visit
              </Link>
            )}
          </div>
        </div>
      </header>
      {showChapterNav ? children : null}
    </>
  );
}
