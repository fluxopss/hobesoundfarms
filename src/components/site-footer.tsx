import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-bleach/10 bg-ink text-bleach">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-14 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr] lg:pl-28">
        <div>
          <div className="flex items-center gap-3">
            <Image src={site.logo} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
            <p className="font-display text-2xl uppercase tracking-tight">{site.name}</p>
          </div>
          <p className="mt-4 max-w-md text-sm text-bleach/65">{site.blurb}</p>
        </div>
        <div>
          <p className="font-stamp text-[9px] text-bleach/40">Visit</p>
          <p className="mt-3 text-sm">{site.address}</p>
          <a href={site.phoneHref} className="mt-2 block text-sm text-flare hover:underline">
            {site.phone}
          </a>
        </div>
        <div>
          <p className="font-stamp text-[9px] text-bleach/40">Trail</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/#acreage" className="hover:text-flare">
                Acreage
              </Link>
            </li>
            <li>
              <Link href="/animals" className="hover:text-flare">
                Residents
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-flare">
                Nights
              </Link>
            </li>
            <li>
              <Link href="/experiences" className="hover:text-flare">
                Experiences
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bleach/10 px-5 py-5 text-center text-xs text-bleach/40 sm:px-10">
        Crafted by{" "}
        <a href="https://fluxlab.agency" className="underline underline-offset-2 hover:text-bleach" target="_blank" rel="noreferrer">
          Flux Labs
        </a>{" "}
        · OPEN THE GATE pitch for {site.name}
      </div>
    </footer>
  );
}
