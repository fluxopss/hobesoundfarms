import Link from "next/link";
import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-mangrove text-bg-chalk">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl tracking-tight">{site.name}</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-bg-chalk/75">{site.blurb}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bg-chalk/55">Visit</p>
          <p className="mt-3 text-sm leading-relaxed">{site.address}</p>
          <a href={site.phoneHref} className="mt-2 block text-sm text-citrus hover:underline">
            {site.phone}
          </a>
          <p className="mt-4 text-sm text-bg-chalk/70">Market: {site.marketHours}</p>
          <p className="text-sm text-bg-chalk/70">Farm Stand: {site.standHours}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-bg-chalk/55">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/events" className="hover:text-citrus">
                Events
              </Link>
            </li>
            <li>
              <Link href="/animals" className="hover:text-citrus">
                Animals
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="hover:text-citrus">
                Experiences
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-citrus">
                Plan Your Visit
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bg-chalk/10 px-5 py-5 text-center text-xs text-bg-chalk/50 sm:px-8">
        Crafted by{" "}
        <a
          href="https://fluxlab.agency"
          className="underline decoration-bg-chalk/30 underline-offset-2 hover:text-bg-chalk"
          target="_blank"
          rel="noreferrer"
        >
          Flux Labs
        </a>{" "}
        · Demo pitch build for {site.name}
      </div>
    </footer>
  );
}
