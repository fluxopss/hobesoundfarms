import Image from "next/image";
import Link from "next/link";
import { animals } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function AnimalsStrip({ showCta = true }: { showCta?: boolean }) {
  return (
    <section id="animals" className="bg-mangrove py-20 text-bg-chalk sm:py-24" aria-label="Farm animal residents">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-citrus">Meet the residents</p>
              <h2 className="mt-3 font-display text-3xl tracking-tight sm:text-5xl">The farm family</h2>
              <p className="mt-3 max-w-xl text-bg-chalk/70">
                Goats, giants, deer, bees, and a butterfly barn — come say hello.
              </p>
            </div>
            {showCta && (
              <Link
                href="/animals"
                className="rounded-full border border-bg-chalk/30 px-5 py-2.5 text-sm font-medium transition hover:border-citrus hover:text-citrus"
              >
                Meet them all
              </Link>
            )}
          </div>
        </Reveal>
      </div>

      <div className="animals-track mt-10 flex gap-5 overflow-x-auto px-5 pb-4 sm:px-8">
        {animals.map((animal, i) => (
          <Reveal key={animal.slug} delayMs={i * 60} className="shrink-0">
            <article className="w-[min(78vw,320px)] overflow-hidden bg-ink/30">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={animal.image}
                  alt={animal.alt}
                  fill
                  className="object-cover transition duration-700 hover:scale-105"
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mangrove via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-citrus">
                    {animal.species}
                  </p>
                  <h3 className="mt-1 font-display text-2xl">{animal.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-bg-chalk/80">{animal.blurb}</p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
