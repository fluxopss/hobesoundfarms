import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";
import { TrailChrome } from "@/components/trail-chrome";
import { MarketSimulator } from "@/components/market-simulator";
import {
  MarketActivityDeck,
  MarketFindIt,
  MarketJoinStrip,
  MarketKnowBefore,
  ReviewTicker,
} from "@/components/market-layers";
import { ArriveAndBook } from "@/components/arrive-and-book";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "The Market",
  description:
    "Hobe Sound Farmers Market — Sat & Sun 9am–2pm. 60+ vendors, Gem Jungle, Bouquet Bunker, tractor rides, live music, and animals.",
};

export default function MarketPage() {
  return (
    <>
      <TrailChrome />
      <main>
        <section
          data-chrome-dark
          className="relative flex min-h-[90svh] items-end overflow-hidden bg-ink pt-24 text-bleach"
        >
          <Image
            src="/images/live/event-market.png"
            alt="Hobe Sound Farmers Market"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-ink/25" />
          <div className="grain absolute inset-0" />
          <div className="relative z-10 w-full px-5 pb-16 sm:px-10 lg:pl-28">
            <p className="font-stamp text-[10px] text-flare">Market Mode · {site.marketHours}</p>
            <h1 className="font-display mt-4 max-w-[10ch] text-[clamp(3.5rem,12vw,8rem)] leading-[0.85] uppercase tracking-tight">
              Enter the weekend
            </h1>
            <p className="mt-4 max-w-xl text-lg text-bleach/80">
              Year-round farmers market on a working farm — vendors, music, activities, animals, bar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#simulator"
                className="rounded-full bg-flare px-6 py-3.5 text-sm font-bold text-ink"
              >
                Start the walk
              </a>
              <Link
                href="/#arrive"
                className="rounded-full border border-bleach/40 px-6 py-3.5 text-sm font-semibold text-bleach"
              >
                Plan a visit
              </Link>
            </div>
          </div>
        </section>

        <MarketSimulator />
        <MarketActivityDeck />
        <MarketFindIt />
        <ReviewTicker />
        <MarketKnowBefore />
        <MarketJoinStrip />
        <ArriveAndBook />
      </main>
      <SiteFooter />
    </>
  );
}
