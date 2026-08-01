"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { residents, site } from "@/lib/content";
import { TrailChrome } from "@/components/trail-chrome";
import { SiteFooter } from "@/components/site-footer";
import { ArriveAndBook } from "@/components/arrive-and-book";
import { useTrail } from "@/components/trail-provider";

export default function AnimalsPage() {
  const { reducedMotion } = useTrail();

  return (
    <>
      <TrailChrome />
      <main>
        <section
          data-chrome-dark
          className="relative flex min-h-[85svh] items-end overflow-hidden bg-ink pt-24 text-bleach"
        >
          <Image
            src="/images/live/goat.jpg"
            alt="Goat at Hobe Sound Farms petting zoo"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
          <div className="grain absolute inset-0" />
          <div className="relative z-10 w-full px-5 pb-16 sm:px-10 lg:pl-28">
            <p className="font-stamp text-[10px] text-flare">Residents · Working farm</p>
            <h1 className="font-display mt-4 text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.85] tracking-tight">
              Meet the livestock
            </h1>
            <p className="mt-4 max-w-xl text-lg text-bleach/75">
              Commercial agriculture up close — cattle, goats, hatchery, giants, guardians.
            </p>
            <p className="font-stamp mt-8 text-[10px] text-bleach/45">Swipe the herd →</p>
          </div>
        </section>

        <section data-chrome-dark className="bg-ink py-10">
          <div className="flex gap-4 overflow-x-auto px-5 pb-6 sm:px-10 lg:pl-28">
            {residents.map((animal, i) => (
              <motion.article
                key={animal.slug}
                initial={reducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05 }}
                className="relative h-[75svh] w-[min(88vw,420px)] shrink-0 overflow-hidden"
              >
                <Image src={animal.image} alt={animal.alt} fill className="object-cover" sizes="420px" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-stamp text-[10px] text-flare">{animal.role}</p>
                  <h2 className="font-display mt-2 text-3xl uppercase tracking-tight text-bleach">
                    {animal.species}
                  </h2>
                  <p className="mt-3 text-sm text-bleach/75">{animal.blurb}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section data-chrome-light className="bg-bleach px-5 py-16 text-center sm:px-10">
          <Image src={site.logo} alt={site.name} width={56} height={56} className="mx-auto h-14 w-14" />
          <h2 className="font-display mt-6 text-3xl uppercase tracking-tight text-ink sm:text-5xl">
            Book a private encounter
          </h2>
          <Link
            href="/#arrive"
            className="mt-8 inline-flex rounded-full bg-flare px-7 py-3.5 text-sm font-bold text-ink"
          >
            Inquire →
          </Link>
        </section>

        <ArriveAndBook />
      </main>
      <SiteFooter />
    </>
  );
}
