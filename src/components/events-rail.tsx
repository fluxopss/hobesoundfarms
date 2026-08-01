import Image from "next/image";
import Link from "next/link";
import { events } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function EventsRail({ limit }: { limit?: number }) {
  const list = limit ? events.slice(0, limit) : events;

  return (
    <section id="events" className="bg-bg py-20 sm:py-24" aria-label="Upcoming events">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Coming up</p>
              <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-5xl">
                Events at the farm
              </h2>
              <p className="mt-3 max-w-xl text-ink-muted">
                Markets every weekend, music after dark, seasonal sendoffs, and nights made for dancing.
              </p>
            </div>
            <Link
              href="/events"
              className="rounded-full bg-sky px-5 py-2.5 text-sm font-semibold text-bg-chalk transition hover:bg-sky-deep"
            >
              Full calendar
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 space-y-8">
          {list.map((event, i) => (
            <Reveal key={event.id} delayMs={i * 50}>
              <article
                id={event.id === "after-dark" ? "after-dark" : undefined}
                className="grid overflow-hidden border border-ink/10 bg-bg-chalk md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
              >
                <div className="relative min-h-[220px] md:min-h-[280px]">
                  <Image
                    src={event.image}
                    alt={event.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 45vw"
                  />
                </div>
                <div className="flex flex-col justify-center px-6 py-8 sm:px-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky">{event.when}</p>
                  <h3 className="mt-2 font-display text-2xl text-ink sm:text-3xl">{event.title}</h3>
                  <p className="mt-3 max-w-lg text-ink-muted">{event.desc}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <span className="text-sm font-semibold text-mangrove">{event.price}</span>
                    <Link
                      href={event.href}
                      className="rounded-full bg-mangrove px-5 py-2.5 text-sm font-medium text-bg-chalk transition hover:bg-sky-deep"
                    >
                      {event.cta}
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
