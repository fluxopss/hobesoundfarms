import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export function ArriveStrip() {
  return (
    <section
      id="arrive"
      data-chrome-light
      className="relative overflow-hidden bg-shell px-5 py-24 text-soil sm:px-10 sm:py-32"
      aria-label="Plan your visit"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Image
          src={site.logo}
          alt={site.name}
          width={64}
          height={64}
          className="h-14 w-14 object-contain"
        />
        <p className="font-atlas mt-8 text-[10px] text-citrus">Visit OS</p>
        <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-6xl">
          Plan your day on the farm
        </h2>
        <p className="mt-4 max-w-lg text-mute">
          Hours, directions, passes, and inquiries — your visit planner.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/visit"
            className="rounded-full bg-soil px-8 py-4 text-sm font-bold text-shell transition hover:bg-citrus hover:text-soil"
          >
            Open Visit OS
          </Link>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-soil/20 px-8 py-4 text-sm font-semibold transition hover:border-citrus hover:text-citrus-deep"
          >
            Directions
          </a>
        </div>
        <p className="font-atlas mt-8 text-[9px] text-mute">
          Market {site.marketHours} · Stand {site.standHours}
        </p>
      </div>
    </section>
  );
}
