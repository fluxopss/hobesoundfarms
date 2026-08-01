"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { site, vendorFilters, vendors } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function MarketSection() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(
    () => (filter === "all" ? vendors : vendors.filter((v) => v.category === filter)),
    [filter],
  );

  return (
    <section id="market" className="bg-bg py-20 sm:py-24" aria-label="Farmers market and farm stand">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Shop the farm</p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-5xl">
                The Market & Farm Stand
              </h2>
              <p className="mt-3 max-w-xl text-ink-muted">
                Weekend market energy plus weekday farm-stand freshness — produce, eggs, honey, and local beef.
              </p>
            </div>
            <Link
              href="/#contact"
              className="rounded-full bg-mangrove px-5 py-2.5 text-sm font-medium text-bg-chalk transition hover:bg-sky-deep"
            >
              Vendor application
            </Link>
          </div>
        </Reveal>

        <Reveal delayMs={60}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="border border-ink/10 bg-bg-chalk px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky">Farmers Market</p>
              <p className="mt-2 font-display text-2xl text-ink">{site.marketHours}</p>
              <p className="mt-1 text-sm text-ink-muted">60+ vendors · activities · food trucks · music</p>
            </div>
            <div className="border border-ink/10 bg-bg-chalk px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky">Farm Stand</p>
              <p className="mt-2 font-display text-2xl text-ink">{site.standHours}</p>
              <p className="mt-1 text-sm text-ink-muted">Local produce, eggs, honey & beef</p>
            </div>
          </div>
        </Reveal>

        <div
          className="mt-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter vendors by category"
        >
          {vendorFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                filter === f.id
                  ? "bg-mangrove text-bg-chalk"
                  : "border border-ink/15 bg-bg-chalk text-ink-muted hover:border-sky/40 hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vendor) => (
            <li key={vendor.name} className="border border-ink/10 bg-bg-chalk px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky">{vendor.tag}</p>
              <p className="mt-2 font-display text-xl text-ink">{vendor.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{vendor.desc}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ink-muted">
          Vendor names are demo placeholders until Hobe Sound Farms provides the live roster.
        </p>
      </div>
    </section>
  );
}
