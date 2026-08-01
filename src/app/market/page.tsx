import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";
import { AppShell } from "@/components/app-shell";
import { MarketSimulator } from "@/components/market-simulator";
import {
  MarketActivityDeck,
  MarketFindIt,
  MarketJoinStrip,
  MarketKnowBefore,
  ReviewTicker,
} from "@/components/market-layers";
import { MarketPulse } from "@/components/market-pulse";

export const metadata: Metadata = {
  title: "Market",
  description:
    "Hobe Sound Farmers Market — Sat & Sun 9am–2pm. 60+ vendors, Gem Jungle, Bouquet Bunker, tractor rides, live music, and animals.",
};

export default function MarketPage() {
  return (
    <AppShell>
      <main>
        <section
          data-chrome-dark
          className="relative flex min-h-[88svh] items-end overflow-hidden bg-soil pt-24 text-shell"
        >
          <Image
            src="/images/live/event-market.png"
            alt="Hobe Sound Farmers Market"
            fill
            className="object-cover kenburns"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-soil via-soil/65 to-soil/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(240,162,2,0.28),transparent_45%)]" />
          <div className="grain absolute inset-0" />
          <div className="relative z-10 w-full px-5 pb-16 sm:px-10 lg:px-16">
            <p className="font-atlas text-[10px] text-citrus">
              Mode · Market · {site.marketHours}
            </p>
            <h1 className="font-display mt-4 max-w-[10ch] text-[clamp(3.5rem,12vw,8rem)] leading-[0.85] tracking-tight">
              Enter the weekend
            </h1>
            <p className="mt-4 max-w-xl text-lg text-shell/80">
              Open every Saturday & Sunday — local vendors, farm activities,
              live music, food & drink on a working farm.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#simulator"
                className="rounded-full bg-citrus px-6 py-3.5 text-sm font-bold text-soil"
              >
                Start the walk
              </a>
              <Link
                href="/visit"
                className="rounded-full border border-shell/40 px-6 py-3.5 text-sm font-semibold text-shell"
              >
                Plan a visit
              </Link>
              <Link
                href="/#hub"
                className="rounded-full px-4 py-3.5 text-sm text-shell/60 underline-offset-4 hover:text-shell hover:underline"
              >
                ← App hub
              </Link>
            </div>
          </div>
        </section>

        <MarketPulse embedded />
        <MarketSimulator />
        <MarketActivityDeck />
        <MarketFindIt />
        <ReviewTicker />
        <MarketKnowBefore />
        <MarketJoinStrip />
      </main>
    </AppShell>
  );
}
