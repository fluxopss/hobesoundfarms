import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { EventsRail } from "@/components/events-rail";
import { TicketCards } from "@/components/ticket-cards";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Farmers market weekends, Farm After Dark, line dancing, and seasonal festivals at Hobe Sound Farms.",
};

export default function EventsPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-24">
        <div className="mx-auto max-w-7xl px-5 pb-4 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">This weekend & beyond</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
            Coming up on the farm
          </h1>
        </div>
        <EventsRail />
        <TicketCards />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
