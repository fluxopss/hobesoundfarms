import { site } from "@/lib/content";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export function ContactSection() {
  return (
    <section id="contact" className="bg-bg-chalk py-20 sm:py-24" aria-label="Plan your visit">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Plan your visit</p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-5xl">
            See you at the farm
          </h2>
          <p className="mt-4 max-w-md text-ink-muted">
            Tell us what you&apos;re planning — market day, private event, field trip, or tickets — and we&apos;ll
            follow up.
          </p>
          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-ink">Address</dt>
              <dd className="mt-1 text-ink-muted">{site.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Phone</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="text-sky hover:underline">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">Hours</dt>
              <dd className="mt-1 text-ink-muted">Market {site.marketHours}</dd>
              <dd className="text-ink-muted">Farm Stand {site.standHours}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delayMs={80}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
