"use client";

import { useCallback, useState } from "react";
import { farmZones } from "@/lib/content";
import { Reveal } from "@/components/reveal";

type Zone = (typeof farmZones)[number];

export function FarmMap() {
  const [active, setActive] = useState<Zone | null>(null);
  const [pos, setPos] = useState({ left: 24, top: 24 });

  const show = useCallback((zone: Zone, clientX: number, clientY: number, wrap: DOMRect) => {
    setActive(zone);
    let left = clientX - wrap.left + 14;
    let top = clientY - wrap.top - 12;
    if (left + 240 > wrap.width) left = clientX - wrap.left - 250;
    if (top + 110 > wrap.height) top = clientY - wrap.top - 120;
    setPos({ left: Math.max(8, left), top: Math.max(8, top) });
  }, []);

  return (
    <section id="map" className="bg-bg-chalk py-20 sm:py-24" aria-label="Interactive farm map">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Explore the property</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-5xl">Farm map</h2>
          <p className="mt-3 max-w-xl text-ink-muted">
            126 acres with something around every corner. Hover or tap a zone to learn more.
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <div
            className="relative mt-10 overflow-hidden border border-ink/10 bg-field"
            onMouseLeave={() => setActive(null)}
          >
            <svg
              viewBox="80 80 720 440"
              className="h-auto w-full"
              role="img"
              aria-label="Interactive farm map of Hobe Sound Farms"
            >
              <rect x="80" y="80" width="720" height="440" fill="#c5d4b8" />
              <path
                d="M 80 310 H 800"
                stroke="#c4b59a"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 400 80 V 520"
                stroke="#c4b59a"
                strokeWidth="18"
                fill="none"
                strokeLinecap="round"
              />

              {farmZones.map((zone) => (
                <g
                  key={zone.id}
                  className="map-zone"
                  role="button"
                  tabIndex={0}
                  aria-label={zone.label}
                  onMouseEnter={(e) => {
                    const wrap = e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
                    if (!wrap) return;
                    show(zone, e.clientX, e.clientY, wrap);
                  }}
                  onMouseMove={(e) => {
                    const wrap = e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
                    if (!wrap) return;
                    show(zone, e.clientX, e.clientY, wrap);
                  }}
                  onFocus={(e) => {
                    const wrap = e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
                    if (!wrap) return;
                    show(zone, wrap.left + wrap.width / 2, wrap.top + wrap.height / 3, wrap);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setActive(null);
                  }}
                  onClick={(e) => {
                    const wrap = e.currentTarget.ownerSVGElement?.parentElement?.getBoundingClientRect();
                    if (!wrap) return;
                    show(zone, e.clientX, e.clientY, wrap);
                  }}
                >
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.w}
                    height={zone.h}
                    rx={zone.rx}
                    fill={zone.color}
                    stroke="rgba(20,40,31,0.18)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={zone.x + zone.w / 2}
                    y={zone.y + zone.h / 2 + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#14281f"
                    pointerEvents="none"
                  >
                    {zone.label}
                  </text>
                </g>
              ))}
            </svg>

            <div
              className={`map-popover absolute z-10 w-[min(240px,70vw)] border border-ink/10 bg-bg-chalk p-4 shadow-lg ${
                active ? "visible" : ""
              }`}
              style={{ left: pos.left, top: pos.top }}
              role="tooltip"
              aria-live="polite"
            >
              {active && (
                <>
                  <p className="font-display text-lg text-ink">{active.label}</p>
                  <p className="mt-1 text-sm text-ink-muted">{active.desc}</p>
                </>
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-ink-muted">Hover or tap any zone to explore</p>
        </Reveal>
      </div>
    </section>
  );
}
