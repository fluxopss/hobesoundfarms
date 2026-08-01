import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <AppShell showStatus={false}>
      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 pt-28 text-center">
        <p className="font-atlas text-[10px] text-citrus">Message received</p>
        <h1 className="font-display mt-3 text-5xl tracking-tight text-soil">
          Thank you
        </h1>
        <p className="mt-4 text-lg text-mute">See you at the farm.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/#hub"
            className="rounded-full bg-citrus px-6 py-3 text-sm font-bold text-soil"
          >
            Back to app hub
          </Link>
          <Link
            href="/market"
            className="rounded-full bg-soil px-6 py-3 text-sm font-semibold text-shell"
          >
            Farmers Market
          </Link>
        </div>
      </main>
    </AppShell>
  );
}
