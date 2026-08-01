import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { residents, site } from "@/lib/content";
import { SiteFooter } from "@/components/site-footer";
import { ArriveAndBook } from "@/components/arrive-and-book";

export const metadata: Metadata = {
  title: "Livestock",
  description:
    "Meet the livestock of Hobe Sound Farms — Brangus cattle, goats, hatchery chicks, Indio Gigante, bees, and more.",
};

export default function AnimalsPage() {
  return (
    <>
      <header className="border-b border-ink/10 bg-ink px-5 py-6 text-bleach sm:px-10">
        <Link href="/" className="font-stamp text-[10px] text-flare hover:underline">
          ← Back to trail
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <Image src={site.logo} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
          <h1 className="font-display text-4xl uppercase tracking-tight sm:text-6xl">Livestock</h1>
        </div>
        <p className="mt-4 max-w-2xl text-bleach/70">
          A working commercial farm — beef, eggs, honey, breeding stock, and the Hatchery for families and classrooms.
        </p>
      </header>

      <main>
        <section className="space-y-16 bg-bleach px-5 py-16 sm:px-10">
          {residents.map((animal, i) => (
            <article
              key={animal.slug}
              className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&_.media]:order-2" : ""}`}
            >
              <div className="media relative aspect-[5/4] overflow-hidden">
                <Image src={animal.image} alt={animal.alt} fill className="object-cover" sizes="50vw" />
              </div>
              <div>
                <p className="font-stamp text-[10px] text-flare">{animal.role}</p>
                <h2 className="font-display mt-2 text-3xl uppercase tracking-tight sm:text-4xl">
                  {animal.species}
                </h2>
                <p className="mt-4 text-lg text-mute">{animal.blurb}</p>
              </div>
            </article>
          ))}
        </section>
        <ArriveAndBook />
      </main>
      <SiteFooter />
    </>
  );
}
