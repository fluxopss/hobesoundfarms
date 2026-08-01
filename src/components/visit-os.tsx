"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { intents, knowBefore, modes, site, tickets } from "@/lib/content";
import { ContactForm } from "@/components/contact-form";
import { PricingCard } from "@/components/pricing-card";
import { Reveal } from "@/components/motion/reveal";

function useVisitStatus() {
  const [status, setStatus] = useState("Check weekend hours");
  useEffect(() => {
    const d = new Date();
    const day = d.getDay();
    const hour = d.getHours();
    if ((day === 6 || day === 0) && hour >= 9 && hour < 14) {
      setStatus("Market open now · until 2pm");
    } else if (day === 6 || day === 0) {
      setStatus(
        hour < 9
          ? "Market opens today at 9am"
          : "Market closed · see you next weekend",
      );
    } else if (day >= 1 && day <= 5 && hour >= 9 && hour < 16) {
      setStatus("Farm Stand open · until 4pm");
    } else {
      setStatus(`Market ${site.marketHours}`);
    }
  }, []);
  return status;
}

export function VisitOS({ defaultMessage = "" }: { defaultMessage?: string }) {
  const status = useVisitStatus();

  return (
    <div className="bg-shell text-soil">
      <section
        data-chrome-dark
        className="relative flex min-h-[70svh] items-end overflow-hidden bg-soil pt-24 text-shell"
      >
        <Image
          src="/images/live/hero.png"
          alt="Arriving at Hobe Sound Farms"
          fill
          className="object-cover kenburns"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/70 to-soil/30" />
        <div className="grain absolute inset-0" />
        <div className="relative z-10 w-full px-5 pb-14 sm:px-10 lg:px-16">
          <p className="font-atlas inline-flex items-center gap-2 rounded-full border border-citrus/40 bg-citrus/15 px-4 py-2 text-[10px] text-citrus">
            <span className="h-2 w-2 animate-pulse rounded-full bg-citrus" />
            {status}
          </p>
          <h1 className="font-display mt-5 max-w-[12ch] text-[clamp(3rem,10vw,6.5rem)] leading-[0.88] tracking-tight">
            Visit OS
          </h1>
          <p className="mt-4 max-w-xl text-lg text-shell/75">
            Hours, directions, passes, and planning — your day on 126 acres at{" "}
            {site.address}.
          </p>
        </div>
      </section>

      <section data-chrome-light className="px-5 py-16 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-10">
            <Reveal>
              <p className="font-atlas text-[10px] text-citrus">Hours</p>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="border border-soil/10 bg-white/60 p-5">
                  <dt className="font-atlas text-[9px] text-mute">
                    Farmers Market
                  </dt>
                  <dd className="font-display mt-2 text-2xl">
                    {site.marketHours}
                  </dd>
                  <dd className="mt-1 text-sm text-mute">
                    Sat & Sun · year-round
                  </dd>
                </div>
                <div className="border border-soil/10 bg-white/60 p-5">
                  <dt className="font-atlas text-[9px] text-mute">Farm Stand</dt>
                  <dd className="font-display mt-2 text-2xl">
                    {site.standHours}
                  </dd>
                  <dd className="mt-1 text-sm text-mute">
                    Local produce, eggs, honey & beef
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="font-atlas text-[10px] text-citrus">Directions</p>
              <h2 className="font-display mt-2 text-3xl tracking-tight">
                {site.address}
              </h2>
              <p className="mt-2 text-sm text-mute">{site.locationNote}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-soil px-6 py-3 text-sm font-bold text-shell"
                >
                  Open in Maps
                </a>
                <a
                  href={site.phoneHref}
                  className="rounded-full border border-soil/20 px-6 py-3 text-sm font-semibold"
                >
                  {site.phone}
                </a>
              </div>
              <p className="mt-4 max-w-lg text-sm text-mute">
                Parking: enter the property and take a left. First-come,
                first-serve in front of the market.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-atlas text-[10px] text-citrus">I would like to…</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {intents.map((intent) => (
                  <Link
                    key={intent.label}
                    href={intent.href}
                    className="rounded-full border border-soil/15 px-4 py-2.5 text-sm transition hover:border-citrus hover:bg-citrus/10"
                  >
                    {intent.label}
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="font-atlas text-[10px] text-citrus">Modes</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {modes.map((mode) => (
                  <Link
                    key={mode.id}
                    href={mode.href}
                    className="rounded-full border border-soil/15 px-4 py-2.5 text-sm transition hover:border-lagoon hover:bg-lagoon/10"
                  >
                    {mode.label}
                  </Link>
                ))}
                <Link
                  href="/#atlas"
                  className="rounded-full border border-soil/15 px-4 py-2.5 text-sm transition hover:border-citrus hover:bg-citrus/10"
                >
                  Interactive map
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <p id="tickets" className="font-atlas text-[10px] text-citrus">
                Passes
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {tickets.map((ticket) => (
                  <PricingCard key={ticket.name} {...ticket} />
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal>
              <ContactForm defaultMessage={defaultMessage} />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-atlas text-[10px] text-citrus">
                Know before you go
              </p>
              <ul className="mt-4 space-y-3">
                {knowBefore.map((item) => (
                  <li
                    key={item.title}
                    className="border-l-2 border-citrus/60 pl-4"
                  >
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-mute">{item.detail}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <a
                  href={site.facebookMarket}
                  target="_blank"
                  rel="noreferrer"
                  className="text-citrus underline underline-offset-4"
                >
                  Facebook vendor list
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-citrus underline underline-offset-4"
                >
                  Instagram
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
