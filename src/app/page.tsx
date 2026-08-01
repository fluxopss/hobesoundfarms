import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/hero";
import { IntentStrip } from "@/components/intent-strip";
import { AnimalsStrip } from "@/components/animals-strip";
import { EventsRail } from "@/components/events-rail";
import { FarmMap } from "@/components/farm-map";
import { MarketSection } from "@/components/market-section";
import { ExperiencesPanels } from "@/components/experiences-panels";
import { TicketCards } from "@/components/ticket-cards";
import { ContactSection } from "@/components/contact-section";

export default function HomePage() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <IntentStrip />
        <AnimalsStrip />
        <EventsRail limit={3} />
        <FarmMap />
        <MarketSection />
        <ExperiencesPanels />
        <TicketCards />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
