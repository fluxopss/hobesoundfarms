import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function ExperiencesPanels() {
  return (
    <section id="experiences" className="bg-bg-chalk py-20 sm:py-24" aria-label="Farm experiences">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Celebrate & book</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-5xl">Experiences</h2>
          <p className="mt-3 max-w-xl text-ink-muted">
            Weddings, field trips, birthdays, and nights that stay with you — the farm is ready when you are.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {experiences.map((exp, i) => (
            <Reveal key={exp.id} delayMs={i * 50}>
              <Link
                id={exp.id}
                href={exp.href}
                className="group relative block min-h-[300px] overflow-hidden sm:min-h-[340px]"
              >
                <Image
                  src={exp.image}
                  alt={exp.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mangrove/90 via-mangrove/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-citrus">{exp.tag}</p>
                  <h3 className="mt-2 font-display text-2xl text-bg-chalk sm:text-3xl">{exp.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-bg-chalk/80">{exp.desc}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-bg-chalk underline decoration-citrus/60 underline-offset-4">
                    Inquire
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
