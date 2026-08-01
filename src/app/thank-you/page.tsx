import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <>
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
        <p className="font-stamp text-[10px] text-flare">Message received</p>
        <h1 className="font-display mt-3 text-5xl uppercase tracking-tight text-ink">Thank you</h1>
        <p className="mt-4 text-lg text-mute">See you at the farm.</p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bleach transition hover:bg-flare hover:text-ink"
        >
          Back to the trail
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
