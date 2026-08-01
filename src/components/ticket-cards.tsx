import { tickets } from "@/lib/content";
import { PricingCard } from "@/components/pricing-card";
import { Reveal } from "@/components/reveal";

export function TicketCards() {
  return (
    <section id="tickets" className="bg-bg py-20 sm:py-24" aria-label="Tickets and paid experiences">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Get tickets</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Paid experiences
          </h2>
          <p className="mt-3 max-w-xl text-ink-muted">
            Square checkout wired for demo — sandbox until the farm goes live.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {tickets.map((ticket) => (
            <Reveal key={ticket.name}>
              <PricingCard {...ticket} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
