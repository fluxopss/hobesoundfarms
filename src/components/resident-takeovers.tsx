"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { residents } from "@/lib/content";

function ResidentPanel({
  resident,
}: {
  resident: (typeof residents)[number];
}) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const x = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const y = useTransform(sy, [-0.5, 0.5], [-12, 12]);

  return (
    <article
      ref={ref}
      className="relative h-[100svh] w-[min(92vw,520px)] shrink-0 overflow-hidden"
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set((e.clientX - rect.left) / rect.width - 0.5);
        my.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div className="absolute inset-[-8%]" style={{ x, y }}>
        <Image
          src={resident.image}
          alt={resident.alt}
          fill
          className="object-cover"
          sizes="520px"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <p className="font-stamp text-[10px] text-flare">{resident.role}</p>
        <h3 className="font-display mt-2 text-3xl uppercase tracking-tight text-bleach sm:text-4xl">
          {resident.species}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-bleach/75">{resident.blurb}</p>
      </div>
    </article>
  );
}

export function ResidentTakeovers() {
  return (
    <section id="residents" className="bg-ink py-16 text-bleach sm:py-20" aria-label="Livestock residents">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6 px-5 sm:px-10 lg:pl-28">
        <div>
          <p className="font-stamp text-[10px] text-flare">Residents · Working farm</p>
          <h2 className="font-display mt-3 text-4xl uppercase tracking-tight sm:text-6xl">
            Meet the livestock
          </h2>
          <p className="mt-3 max-w-lg text-bleach/65">
            Commercial agriculture up close — cattle, goats, hatchery chicks, giants, and guardians.
          </p>
        </div>
        <Link
          href="/animals"
          className="rounded-full border border-bleach/30 px-5 py-2.5 text-sm font-medium transition hover:border-flare hover:text-flare"
        >
          Full livestock story
        </Link>
      </div>

      <div className="residents-track flex gap-4 overflow-x-auto px-5 pb-4 sm:px-10 lg:pl-28">
        {residents.map((resident) => (
          <ResidentPanel key={resident.slug} resident={resident} />
        ))}
      </div>
    </section>
  );
}
