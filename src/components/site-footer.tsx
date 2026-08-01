import Image from "next/image";
import Link from "next/link";
import { modes, site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-shell/10 bg-soil text-shell">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-14 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr] lg:px-16">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={site.logo}
              alt={site.name}
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <p className="font-display text-2xl tracking-tight">{site.name}</p>
          </div>
          <p className="mt-4 max-w-md text-sm text-shell/65">{site.blurb}</p>
          <p className="font-atlas mt-4 text-[10px] text-citrus">
            {site.tagline}
          </p>
        </div>
        <div>
          <p className="font-atlas text-[9px] text-shell/40">Visit</p>
          <p className="mt-3 text-sm">{site.address}</p>
          <a
            href={site.phoneHref}
            className="mt-2 block text-sm text-citrus hover:underline"
          >
            {site.phone}
          </a>
          <p className="mt-3 text-sm text-shell/60">
            Market {site.marketHours}
          </p>
          <Link
            href="/visit"
            className="mt-4 inline-block text-sm font-semibold text-citrus hover:underline"
          >
            Open Visit OS →
          </Link>
        </div>
        <div>
          <p className="font-atlas text-[9px] text-shell/40">Modes</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/#atlas" className="hover:text-citrus">
                Acreage Atlas
              </Link>
            </li>
            {modes.map((mode) => (
              <li key={mode.id}>
                <Link href={mode.href} className="hover:text-citrus">
                  {mode.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-shell/10 px-5 py-5 text-center text-xs text-shell/40 sm:px-10">
        Crafted by{" "}
        <a
          href="https://fluxlab.agency"
          className="underline underline-offset-2 hover:text-shell"
          target="_blank"
          rel="noreferrer"
        >
          Flux Labs
        </a>
      </div>
    </footer>
  );
}
