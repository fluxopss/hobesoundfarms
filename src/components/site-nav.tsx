"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/events", label: "Events" },
  { href: "/#map", label: "Farm Map" },
  { href: "/#market", label: "The Market" },
  { href: "/animals", label: "Animals" },
  { href: "/experiences", label: "Experiences" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 transition-all duration-300 sm:px-8 ${
          scrolled || open
            ? "bg-bg-chalk/95 shadow-[0_1px_0_rgba(20,40,31,0.08)] backdrop-blur-md"
            : "bg-transparent"
        }`}
        aria-label="Main"
      >
        <Link href="/" className="flex items-center gap-3 text-ink" onClick={() => setOpen(false)}>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-mangrove text-bg-chalk"
            aria-hidden
          >
            <svg width="18" height="18" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 28 C18 28 10 22 10 15 C10 10.5 13.5 8 18 8 C22.5 8 26 10.5 26 15 C26 22 18 28 18 28Z"
                fill="currentColor"
                opacity="0.95"
              />
              <path d="M18 28 L18 14" stroke="#14281F" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display text-lg tracking-tight sm:text-xl">Hobe Sound Farms</span>
        </Link>

        <ul className="hidden items-center gap-7 text-sm font-medium text-ink-muted lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition hover:text-ink">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/events"
              className="text-sky transition hover:text-sky-deep"
            >
              This Weekend
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="rounded-full bg-mangrove px-4 py-2.5 text-sm font-medium text-bg-chalk transition hover:bg-sky-deep"
            >
              Plan Your Visit
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-ink transition ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`block h-0.5 w-5 bg-ink transition ${open ? "opacity-0" : ""}`} />
          <span
            className={`block h-0.5 w-5 bg-ink transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-bg-chalk px-5 py-6 lg:hidden">
          <ul className="flex flex-col gap-4 text-base font-medium">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/events" onClick={() => setOpen(false)} className="text-sky">
                This Weekend
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="inline-flex rounded-full bg-mangrove px-4 py-2.5 text-bg-chalk"
              >
                Plan Your Visit
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
