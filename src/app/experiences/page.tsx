import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ExperiencesPanels } from "@/components/experiences-panels";
import { ContactSection } from "@/components/contact-section";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Weddings, field trips, birthday parties, and Farm After Dark at Hobe Sound Farms.",
};

export default function ExperiencesPage() {
  return (
    <>
      <SiteNav />
      <main className="pt-24">
        <div className="mx-auto max-w-7xl px-5 pb-4 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Book the farm</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
            Celebrate here
          </h1>
          <p className="mt-4 max-w-2xl text-ink-muted">
            From &quot;I do&quot; to field trips and after-dark nights — inquire and we&apos;ll help you plan.
          </p>
        </div>
        <ExperiencesPanels />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
