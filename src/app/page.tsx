import { GateEntrance } from "@/components/gate-entrance";
import { TrailHUD } from "@/components/trail-hud";
import { LandingStrip } from "@/components/landing-strip";
import { MarketPulse } from "@/components/market-pulse";
import { AcreageTour } from "@/components/acreage-tour";
import { ResidentTakeovers } from "@/components/resident-takeovers";
import { MarketSimulator } from "@/components/market-simulator";
import { EventBillboards } from "@/components/event-billboards";
import { ArriveAndBook } from "@/components/arrive-and-book";
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <GateEntrance />
      <TrailHUD />
      <main>
        <LandingStrip />
        <MarketPulse />
        <AcreageTour />
        <ResidentTakeovers />
        <MarketSimulator compact />
        <section data-chrome-light className="bg-bleach px-5 py-10 text-center sm:px-10">
          <Link
            href="/market"
            className="inline-flex rounded-full bg-flare px-8 py-4 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-flare-deep hover:text-bleach"
          >
            Full Market Mode experience →
          </Link>
        </section>
        <EventBillboards />
        <ArriveAndBook />
      </main>
      <SiteFooter />
    </>
  );
}
