import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { events, site } from "@/lib/content";
import { SiteFooter } from "@/components/site-footer";
import { ArriveAndBook } from "@/components/arrive-and-book";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Farmers market weekends, Farm After Dark, line dancing, and seasonal festivals at Hobe Sound Farms.",
};

export default function EventsPage() {
  return (
    <>
      <header className="border-b border-ink/10 bg-shade px-5 py-6 text-bleach sm:px-10">
        <Link href="/" className="font-stamp text-[10px] text-flare hover:underline">
          ← Back to trail
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <Image src={site.logo} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
          <h1 className="font-display text-4xl uppercase tracking-tight sm:text-6xl">Coming up</h1>
        </div>
      </header>

      <main>
        <section className="grid gap-6 bg-bleach px-5 py-16 sm:grid-cols-2 sm:px-10">
          {events.map((event) => (
            <article key={event.id} className="relative min-h-[360px] overflow-hidden">
              <Image src={event.image} alt="" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-bleach">
                <p className="font-stamp text-[10px] text-flare">{event.when}</p>
                <h2 className="font-display mt-2 text-3xl uppercase tracking-tight">{event.title}</h2>
                <p className="mt-2 text-sm text-bleach/75">{event.desc}</p>
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
