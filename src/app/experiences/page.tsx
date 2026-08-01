import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { activities, site } from "@/lib/content";
import { SiteFooter } from "@/components/site-footer";
import { ArriveAndBook } from "@/components/arrive-and-book";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Weddings, field trips, animal encounters, Gem Jungle, Bouquet Bunker, and private events at Hobe Sound Farms.",
};

const experiences = [
  {
    id: "weddings",
    title: "Weddings & private events",
    desc: "Magnolia Barn and outdoor celebrations on 126 acres — birthdays, showers, corporate.",
    image: "/images/live/offer-5.png",
  },
  {
    id: "field-trips",
    title: "Field trips & Farm Explorer",
    desc: "Hands-on farm days for classes and kids — animals, crafts, tractor rides.",
    image: "/images/live/offer-1.png",
  },
  {
    id: "encounters",
    title: "Private animal encounters",
    desc: "Reserved meet-and-greets Mon–Thu. Book ahead for an up-close livestock experience.",
    image: "/images/live/goat.jpg",
  },
  ...activities.slice(0, 3).map((a) => ({
    id: a.id,
    title: a.title,
    desc: a.desc,
    image: a.image,
  })),
];

export default function ExperiencesPage() {
  return (
    <>
      <header className="border-b border-ink/10 bg-ink px-5 py-6 text-bleach sm:px-10">
        <Link href="/" className="font-stamp text-[10px] text-flare hover:underline">
          ← Back to trail
        </Link>
        <div className="mt-6 flex items-center gap-4">
          <Image src={site.logo} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
          <h1 className="font-display text-4xl uppercase tracking-tight sm:text-6xl">Experiences</h1>
        </div>
      </header>

      <main>
        <section className="grid gap-4 bg-bleach px-5 py-16 sm:grid-cols-2 sm:px-10">
          {experiences.map((exp) => (
            <Link
              key={exp.id}
              href="/#arrive"
              className="group relative min-h-[300px] overflow-hidden"
            >
              <Image
                src={exp.image}
                alt=""
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-bleach">
                <h2 className="font-display text-2xl uppercase tracking-tight sm:text-3xl">{exp.title}</h2>
                <p className="mt-2 text-sm text-bleach/75">{exp.desc}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-flare">Inquire →</span>
              </div>
            </Link>
          ))}
        </section>
        <ArriveAndBook />
      </main>
      <SiteFooter />
    </>
  );
}
