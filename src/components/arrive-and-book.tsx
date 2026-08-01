import { site, tickets } from "@/lib/content";
import { ContactForm } from "@/components/contact-form";
import { PricingCard } from "@/components/pricing-card";

export function ArriveAndBook() {
  return (
    <section id="arrive" className="bg-bleach py-20 text-ink sm:py-28" aria-label="Plan your visit">
      <div className="px-5 sm:px-10 lg:pl-28">
        <p className="font-stamp text-[10px] text-flare">Arrive · Book</p>
        <h2 className="font-display mt-3 text-4xl uppercase tracking-tight sm:text-6xl">
          See you at the farm
        </h2>
      </div>

      <div className="mt-12 grid gap-12 px-5 sm:px-10 lg:grid-cols-2 lg:pl-28">
        <div>
          <dl className="space-y-5 text-sm">
            <div>
              <dt className="font-stamp text-[9px] text-mute">Address</dt>
              <dd className="mt-1 text-lg">{site.address}</dd>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-flare underline underline-offset-4"
              >
                Get directions
              </a>
            </div>
            <div>
              <dt className="font-stamp text-[9px] text-mute">Phone</dt>
              <dd className="mt-1">
                <a href={site.phoneHref} className="text-lg hover:text-flare">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-stamp text-[9px] text-mute">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${site.email}`} className="hover:text-flare">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-stamp text-[9px] text-mute">Hours</dt>
              <dd className="mt-1">Market {site.marketHours}</dd>
              <dd>Farm Stand {site.standHours}</dd>
            </div>
          </dl>

          <div id="tickets" className="mt-10 grid gap-4 sm:grid-cols-2">
            {tickets.map((ticket) => (
              <PricingCard key={ticket.name} {...ticket} />
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
