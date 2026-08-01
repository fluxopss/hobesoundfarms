import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky">Message received</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">Thank you!</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Your submission was received. We will follow up shortly — see you at the farm.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-mangrove px-6 py-3 text-sm font-medium text-bg-chalk transition hover:bg-sky-deep"
        >
          Back to home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
