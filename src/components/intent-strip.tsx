import Link from "next/link";
import { intents } from "@/lib/content";
import { Reveal } from "@/components/reveal";

export function IntentStrip() {
  return (
    <section className="border-b border-ink/8 bg-bg-chalk py-16 sm:py-20" aria-label="Ways to experience the farm">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">I would like to…</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Choose your path through the farm
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {intents.map((item, i) => (
            <li key={item.label}>
              <Reveal delayMs={i * 40}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col justify-between border border-ink/10 bg-bg px-5 py-5 transition hover:border-sky/40 hover:bg-white"
                >
                  <span className="font-medium text-ink group-hover:text-sky-deep">{item.label}</span>
                  <span className="mt-3 text-sm text-ink-muted">{item.hint}</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
