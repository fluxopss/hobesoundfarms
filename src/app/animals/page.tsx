import type { Metadata } from "next";
import Image from "next/image";
import { animals } from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { AnimalsStrip } from "@/components/animals-strip";
import { ContactSection } from "@/components/contact-section";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Animals",
  description:
    "Meet the residents of Hobe Sound Farms — goats, deer, donkeys, giant chickens, bees, and butterflies.",
};

export default function AnimalsPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-24">
        <div className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Livestock & wildlife</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
            Meet our residents
          </h1>
          <p className="mt-4 max-w-2xl text-ink-muted">
            Character stories below are demo-quality until the farm shares official names and photos —
            the encounters are real.
          </p>
        </div>

        <AnimalsStrip showCta={false} />

        <section className="bg-bg py-20 sm:py-24">
          <div className="mx-auto max-w-7xl space-y-16 px-5 sm:px-8">
            {animals.map((animal, i) => (
              <Reveal key={animal.slug}>
                <article
                  className={`grid items-center gap-8 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&_.animal-media]:order-2" : ""
                  }`}
                >
                  <div className="animal-media relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={animal.image}
                      alt={animal.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky">
                      {animal.species}
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{animal.name}</h2>
                    <p className="mt-4 text-lg text-ink-muted">{animal.blurb}</p>
                    <p className="mt-4 leading-relaxed text-ink-muted">{animal.story}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
