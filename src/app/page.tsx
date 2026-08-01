import { GateEntrance } from "@/components/gate-entrance";
import { TrailHUD } from "@/components/trail-hud";
import { LandingStrip } from "@/components/landing-strip";
import { AcreageTour } from "@/components/acreage-tour";
import { ResidentTakeovers } from "@/components/resident-takeovers";
import { WeekendArcade } from "@/components/weekend-arcade";
import { EventBillboards } from "@/components/event-billboards";
import { ArriveAndBook } from "@/components/arrive-and-book";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <>
      <GateEntrance />
      <TrailHUD />
      <main>
        <LandingStrip />
        <AcreageTour />
        <ResidentTakeovers />
        <WeekendArcade />
        <EventBillboards />
        <ArriveAndBook />
      </main>
      <SiteFooter />
    </>
  );
}
