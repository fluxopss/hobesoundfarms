import type { Metadata } from "next";
import Link from "next/link";
import { TrailChrome } from "@/components/trail-chrome";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <>
      <TrailChrome />
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="font-stamp text-[10px] text-flare">Message received</p>
        <h1 className="font-display mt-3 text-5xl uppercase tracking-tight text-ink">Thank you</h1>
        <p className="mt-4 text-lg text-mute">See you at the farm.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/market"
            className="rounded-full bg-flare px-6 py-3 text-sm font-bold text-ink"
          >
            Enter Market Mode
          </Link>
          <Link
            href="/"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bleach"
          >
            Back to the trail
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
