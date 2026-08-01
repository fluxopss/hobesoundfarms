"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { mapZones, site, type MapZone, type ZoneMode } from "@/lib/content";

const filters: { id: "all" | ZoneMode; label: string }[] = [
  { id: "all", label: "All" },
  { id: "market", label: "Market" },
  { id: "residents", label: "Residents" },
  { id: "nights", label: "Nights" },
  { id: "experiences", label: "Book" },
];

type FarmMapProps = {
  zones?: MapZone[];
  highlightIds?: string[];
  litIndex?: number;
  showFilters?: boolean;
  className?: string;
  onZoneSelect?: (zone: MapZone) => void;
};

export function FarmMap({
  zones = mapZones,
  highlightIds,
  litIndex,
  showFilters = true,
  className = "",
  onZoneSelect,
}: FarmMapProps) {
  const [filter, setFilter] = useState<"all" | ZoneMode>("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<MapZone | null>(null);

  const visible = useMemo(() => {
    return zones.filter((z) => {
      const modeOk = filter === "all" || z.mode === filter;
      const q = query.trim().toLowerCase();
      const textOk =
        !q ||
        z.label.toLowerCase().includes(q) ||
        z.desc.toLowerCase().includes(q);
      return modeOk && textOk;
    });
  }, [zones, filter, query]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  function openZone(zone: MapZone) {
    setActive(zone);
    onZoneSelect?.(zone);
  }

  return (
    <div className={className}>
      {showFilters && (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`rounded-full px-3.5 py-2 text-[11px] font-medium transition ${
                  filter === f.id
                    ? "bg-citrus text-soil"
                    : "border border-shell/25 text-shell/70 hover:border-citrus hover:text-citrus"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <label className="relative block w-full sm:max-w-xs">
            <span className="sr-only">Search places</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Gem Jungle, Magnolia…"
              className="w-full rounded-full border border-shell/20 bg-shell/10 px-4 py-2.5 text-sm text-shell placeholder:text-shell/40 outline-none focus:border-citrus"
            />
          </label>
        </div>
      )}

      <div className="map-stage relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-shell/15 bg-soil">
        <Image
          src={site.map}
          alt="Illustrated Hobe Sound Farms property map with real named places"
          fill
          className="map-img-active hidden object-cover object-center md:block"
          sizes="100vw"
          priority
        />
        <Image
          src={site.mapMobile}
          alt="Hobe Sound Farms property map"
          fill
          className="map-img-active object-cover object-center md:hidden"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-soil/10" />
        <div className="vignette absolute inset-0" />

        {visible.map((zone, i) => {
          const lit =
            litIndex !== undefined
              ? zones[litIndex]?.id === zone.id
              : highlightIds?.includes(zone.id);
          const activePin = active?.id === zone.id || lit;
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => openZone(zone)}
              className={`absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-[10px] font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-citrus sm:h-11 sm:w-11 ${
                activePin
                  ? "scale-110 border-citrus bg-citrus text-soil shadow-[0_0_28px_rgba(240,162,2,0.55)]"
                  : "border-shell/80 bg-shell/25 text-shell hover:bg-citrus hover:text-soil"
              }`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              aria-label={zone.label}
              title={zone.label}
            >
              {i + 1}
            </button>
          );
        })}

        {visible.length === 0 && (
          <p className="absolute inset-0 z-10 flex items-center justify-center bg-soil/50 text-sm text-shell">
            No places match that search.
          </p>
        )}
      </div>

      <p className="font-atlas mt-3 text-[9px] text-shell/45">
        {visible.length} places · tap a pin for the real name
      </p>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-soil/80 p-4 sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label={active.label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.article
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="relative grid w-full max-w-2xl overflow-hidden bg-shell text-soil sm:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative min-h-[220px]">
                <Image
                  src={active.image}
                  alt={active.label}
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <p className="font-atlas text-[10px] text-citrus">
                  {active.mode} · Real place
                </p>
                <h3 className="font-display mt-2 text-3xl tracking-tight">
                  {active.label}
                </h3>
                <p className="mt-3 text-mute">{active.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link
                    href={active.href}
                    className="rounded-full bg-citrus px-5 py-2.5 text-sm font-semibold text-soil"
                  >
                    Go there
                  </Link>
                  <Link
                    href="/visit"
                    className="rounded-full border border-soil/20 px-5 py-2.5 text-sm font-semibold"
                  >
                    Plan visit
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="rounded-full px-4 py-2.5 text-sm text-mute"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
