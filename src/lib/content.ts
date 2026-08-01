export const site = {
  name: "Hobe Sound Farms",
  tagline: "Enter the acreage.",
  blurb:
    "South Florida’s premier farm destination — a 126-acre working farm just off I-95 and Bridge Road, with a year-round farmers market, livestock, activities, live music, and celebrations.",
  address: "1425 SE Bridge Road, Hobe Sound, FL 33455",
  phone: "(844) 462-3763",
  phoneHref: "tel:+18444623763",
  email: "info@hobesoundfarms.com",
  marketHours: "Sat & Sun 9am – 2pm",
  standHours: "Mon – Fri 9am – 4pm",
  locationNote: "Just off I-95 and Bridge Road, Hobe Sound, FL",
  mapsUrl:
    "https://maps.google.com/?q=1425+SE+Bridge+Road,+Hobe+Sound,+FL+33455",
  facebookMarket: "https://www.facebook.com/hobesoundfarmersmarket",
  instagram: "https://www.instagram.com/hobesoundfarmersmarket/",
  logo: "/images/live/logo.png",
  hero: "/images/live/hero.png",
  map: "/images/live/map.jpg",
  mapMobile: "/images/live/map-mobile.png",
};

export const modes = [
  {
    id: "market",
    label: "Farmers Market",
    short: "Market",
    href: "/market",
    desc: "60+ vendors, activities, live music",
    accent: "citrus",
  },
  {
    id: "residents",
    label: "Meet Our Residents",
    short: "Herd",
    href: "/animals",
    desc: "Meet the livestock of a working farm",
    accent: "lagoon",
  },
  {
    id: "nights",
    label: "Coming Up",
    short: "Events",
    href: "/events",
    desc: "Farm After Dark, sendoffs, line dancing",
    accent: "canopy",
  },
  {
    id: "experiences",
    label: "Farm Experiences",
    short: "Book",
    href: "/experiences",
    desc: "Weddings, field trips, parties, encounters",
    accent: "shell",
  },
] as const;

/** Matches “I would like to…” on hobesoundfarms.com */
export const intents = [
  { label: "Visit the farmers market", href: "/market" },
  { label: "Host a private event", href: "/experiences" },
  { label: 'Say "I Do" at the farm', href: "/experiences?focus=weddings" },
  { label: "Visit with our farm animals", href: "/animals" },
  { label: "Buy local beef", href: "/visit" },
  { label: "Visit the farm after dark", href: "/events" },
  { label: "Plan a field trip", href: "/experiences?focus=field-trips" },
  { label: "Line dance at the farm", href: "/events" },
  { label: "Be a vendor at the market", href: "/visit?intent=vendor" },
] as const;

export type ZoneMode =
  | "market"
  | "residents"
  | "nights"
  | "experiences"
  | "visit";

export type MapZone = {
  id: string;
  label: string;
  desc: string;
  x: number;
  y: number;
  image: string;
  mode: ZoneMode;
  href: string;
};

/**
 * Real named places from the Hobe Sound Farms property map.
 * Coordinates are % of the illustrated map image (desktop).
 */
export const mapZones: MapZone[] = [
  {
    id: "farmers-market-entrance",
    label: "Farmers Market Entrance",
    desc: "Main weekend entry — take a left into parking, then walk into the market.",
    x: 18,
    y: 78,
    image: "/images/live/event-market.png",
    mode: "market",
    href: "/market",
  },
  {
    id: "plants-produce",
    label: "Plants & Produce",
    desc: "Farm-grown veggies, herbs, and plant starters from Hobe Sound Farms.",
    x: 28,
    y: 62,
    image: "/images/live/event-stand.png",
    mode: "market",
    href: "/market",
  },
  {
    id: "coffee-hut",
    label: "Coffee Hut",
    desc: "Fuel up between vendor rows and activities.",
    x: 32,
    y: 58,
    image: "/images/live/hero.png",
    mode: "market",
    href: "/market",
  },
  {
    id: "the-bar",
    label: "The Bar",
    desc: "Yes — there's a bar on the farm. Drink responsibly.",
    x: 42,
    y: 52,
    image: "/images/live/hero.png",
    mode: "market",
    href: "/market",
  },
  {
    id: "main-stage",
    label: "Main Stage",
    desc: "Live band every market weekend — plus after-dark nights.",
    x: 48,
    y: 48,
    image: "/images/live/offer-6.png",
    mode: "nights",
    href: "/events",
  },
  {
    id: "gem-jungle",
    label: "The Gem Jungle",
    desc: "Mine for gems — dig, rinse, and keep what you find.",
    x: 55,
    y: 55,
    image: "/images/live/offer-3.png",
    mode: "market",
    href: "/market#simulator",
  },
  {
    id: "bouquet-bunker",
    label: "Bouquet Bunker",
    desc: "Launch seed bombs across the field — family-approved chaos.",
    x: 52,
    y: 62,
    image: "/images/live/offer-2.png",
    mode: "market",
    href: "/market#simulator",
  },
  {
    id: "farm-slide",
    label: "Farm Slide",
    desc: "Kid energy on a working farm — part of the weekend activity loop.",
    x: 38,
    y: 68,
    image: "/images/live/offer-1.png",
    mode: "market",
    href: "/market",
  },
  {
    id: "coconut-hut",
    label: "The Coconut Hut",
    desc: "A market stop with island snacks and shade.",
    x: 35,
    y: 54,
    image: "/images/live/event-market.png",
    mode: "market",
    href: "/market",
  },
  {
    id: "petunia-porch",
    label: "The Petunia Porch",
    desc: "A porch stop along the market walk — flowers, shade, and stalls nearby.",
    x: 30,
    y: 50,
    image: "/images/live/event-stand.png",
    mode: "market",
    href: "/market",
  },
  {
    id: "duck-pond",
    label: "Duck Pond",
    desc: "Khaki Campbell ducks and a cool pause on hot Florida days.",
    x: 26,
    y: 66,
    image: "/images/live/turtles.jpg",
    mode: "residents",
    href: "/animals",
  },
  {
    id: "animal-alley",
    label: "Animal Alley",
    desc: "The main livestock corridor — goats, guardians, and greetings.",
    x: 44,
    y: 58,
    image: "/images/live/goat.jpg",
    mode: "residents",
    href: "/animals",
  },
  {
    id: "petting-zoo",
    label: "Petting Zoo",
    desc: "Up-close animal encounters that steal the whole afternoon.",
    x: 40,
    y: 64,
    image: "/images/live/goat-2.jpg",
    mode: "residents",
    href: "/animals",
  },
  {
    id: "front-goat-paddock",
    label: "Front Goat Paddock",
    desc: "Nigerian Dwarf goats up front — part of the working breeding herd.",
    x: 36,
    y: 46,
    image: "/images/live/goat.jpg",
    mode: "residents",
    href: "/animals",
  },
  {
    id: "house-of-giants",
    label: "House of the Giants",
    desc: "Home of the Indio Gigante chickens — nearly three feet tall.",
    x: 34,
    y: 40,
    image: "/images/live/rooster.jpg",
    mode: "residents",
    href: "/animals",
  },
  {
    id: "hen-house",
    label: "Hen House",
    desc: "Commercial egg production and hatchery life on display.",
    x: 48,
    y: 38,
    image: "/images/live/chicks.jpg",
    mode: "residents",
    href: "/animals",
  },
  {
    id: "cattle-pen",
    label: "Cattle Pen",
    desc: "Brangus cattle — pasture-raised Florida beef.",
    x: 58,
    y: 36,
    image: "/images/live/offer-4.png",
    mode: "residents",
    href: "/animals",
  },
  {
    id: "cattle-feed",
    label: "Cattle Feed Station",
    desc: "Feed hungry Brangus up close at the cattle feeding station.",
    x: 62,
    y: 42,
    image: "/images/live/offer-4.png",
    mode: "market",
    href: "/market#simulator",
  },
  {
    id: "bamboo-row",
    label: "Bamboo Row",
    desc: "A shaded corridor along the acreage — walk between worlds.",
    x: 50,
    y: 44,
    image: "/images/live/hero.png",
    mode: "visit",
    href: "/#atlas",
  },
  {
    id: "deer-sanctuary",
    label: "Deer Sanctuary",
    desc: "A quieter wildlife corner of the 126-acre property.",
    x: 68,
    y: 28,
    image: "/images/animal-deer.jpg",
    mode: "residents",
    href: "/animals",
  },
  {
    id: "hsf-lake",
    label: "HSF Lake",
    desc: "The farm lake along the north edge of the property.",
    x: 55,
    y: 18,
    image: "/images/live/turtles.jpg",
    mode: "visit",
    href: "/#atlas",
  },
  {
    id: "pp-greenhouses",
    label: "P & P Greenhouses",
    desc: "Plants & Produce greenhouses — starters and Florida greenery.",
    x: 72,
    y: 34,
    image: "/images/live/event-stand.png",
    mode: "market",
    href: "/market",
  },
  {
    id: "sunflower-barn",
    label: "Sunflower Barn",
    desc: "Gatherings, showers, birthdays, and photo moments.",
    x: 78,
    y: 58,
    image: "/images/live/offer-1.png",
    mode: "experiences",
    href: "/experiences?focus=birthdays",
  },
  {
    id: "magnolia-barn",
    label: "Magnolia Barn",
    desc: "Weddings, corporate, and private celebrations on 126 acres.",
    x: 84,
    y: 48,
    image: "/images/live/offer-5.png",
    mode: "experiences",
    href: "/experiences?focus=weddings",
  },
];

/** Weekend market walk — curated stops from real map zones */
export const marketWalk = [
  mapZones.find((z) => z.id === "farmers-market-entrance")!,
  mapZones.find((z) => z.id === "plants-produce")!,
  mapZones.find((z) => z.id === "main-stage")!,
  mapZones.find((z) => z.id === "gem-jungle")!,
  mapZones.find((z) => z.id === "bouquet-bunker")!,
  mapZones.find((z) => z.id === "cattle-feed")!,
  mapZones.find((z) => z.id === "animal-alley")!,
  mapZones.find((z) => z.id === "the-bar")!,
].filter(Boolean);

export const marketStats = [
  { label: "Vendors", value: 60, suffix: "+" },
  { label: "Live Band", value: 1, suffix: "" },
  { label: "Activities", value: 6, suffix: "+" },
  { label: "Acres", value: 126, suffix: "" },
] as const;

export const vendorCategories = [
  { id: "all", label: "All" },
  { id: "produce", label: "Produce" },
  { id: "food", label: "Hot Food" },
  { id: "bakery", label: "Bakery" },
  { id: "plants", label: "Plants" },
  { id: "crafts", label: "Crafts" },
  { id: "wellness", label: "Wellness" },
  { id: "seafood", label: "Seafood" },
] as const;

export const vendorTypes = [
  {
    category: "produce",
    tag: "Produce",
    title: "Farm-fresh Florida",
    desc: "Seasonal veggies, herbs, and plant starters grown on-site and across the state.",
  },
  {
    category: "food",
    tag: "Hot Food",
    title: "Food trucks & plates",
    desc: "Fresh-made eats for the whole family — plus a cocktail if you want one.",
  },
  {
    category: "bakery",
    tag: "Bakery",
    title: "Breads & sweets",
    desc: "Loaves, desserts, and high-protein low-sugar favorites (ask for Yum Yum).",
  },
  {
    category: "plants",
    tag: "Plants",
    title: "Greenery & starters",
    desc: "Florida-ready plants and starters — take the farm home.",
  },
  {
    category: "crafts",
    tag: "Crafts",
    title: "Makers & trades",
    desc: "Handmade goods from artisans and tradesmen across Florida.",
  },
  {
    category: "wellness",
    tag: "Wellness",
    title: "Soaps, tinctures & more",
    desc: "Hand-crafted health and beauty, household goodies, natural goods.",
  },
  {
    category: "seafood",
    tag: "Seafood",
    title: "Local catch",
    desc: "Fish dip legends and seafood from Florida waters.",
  },
] as const;

export const residents = [
  {
    slug: "nigerian-dwarf-goats",
    species: "Nigerian Dwarf Goats",
    role: "Breeding herd · Front Goat Paddock",
    blurb:
      "Raised for breeding and sale. Rotational grazing keeps vegetation in check across the acreage.",
    image: "/images/live/goat.jpg",
    alt: "Goat at Hobe Sound Farms",
    zoneId: "front-goat-paddock",
  },
  {
    slug: "brangus-cattle",
    species: "Brangus Cattle",
    role: "Pasture-raised · Cattle Pen",
    blurb:
      "Angus quality meets Brahman heat tolerance — built for Florida. Locally born, grain finished, USDA processed.",
    image: "/images/live/offer-4.png",
    alt: "Cattle at Hobe Sound Farms",
    zoneId: "cattle-pen",
  },
  {
    slug: "guardian-donkeys",
    species: "Donkeys",
    role: "Livestock guardians",
    blurb:
      "Working guardians protecting cattle and goat herds — a commercial agricultural practice on the farm.",
    image: "/images/animal-donkey.jpg",
    alt: "Donkey livestock guardian at Hobe Sound Farms",
    zoneId: "animal-alley",
  },
  {
    slug: "hens-chicks",
    species: "Hens & Chicks",
    role: "Eggs · Hatchery · Hen House",
    blurb:
      "Commercial egg production plus the Hatchery — fertilized eggs, chicks, and brooder kits for families.",
    image: "/images/live/chicks.jpg",
    alt: "Chicks at the Hobe Sound Hatchery",
    zoneId: "hen-house",
  },
  {
    slug: "indio-gigante",
    species: "Indio Gigante Chickens",
    role: "Heritage stock · House of the Giants",
    blurb:
      "A heritage meat breed raised as breeding stock. Meet them at House of the Giants.",
    image: "/images/live/rooster.jpg",
    alt: "Indio Gigante rooster at Hobe Sound Farms",
    zoneId: "house-of-giants",
  },
  {
    slug: "turkeys-quail",
    species: "Turkeys & Quail",
    role: "Heritage flocks · eggs & stock",
    blurb:
      "White Holland turkeys and Coturnix quail — raised on site as part of the working farm.",
    image: "/images/live/turkey.jpg",
    alt: "Turkeys at Hobe Sound Farms",
    zoneId: "hen-house",
  },
] as const;

export const activities = [
  {
    id: "tractor",
    title: "Barrel Tractor Ride",
    desc: "Hop on and roll through the property — the classic weekend farm loop.",
    image: "/images/live/offer-1.png",
  },
  {
    id: "gems",
    title: "Gem Jungle",
    desc: "Mine for gems. Dig, rinse, discover. Kids disappear for an hour (in a good way).",
    image: "/images/live/offer-3.png",
  },
  {
    id: "bunker",
    title: "Bouquet Bunker",
    desc: "Launch seed bombs across the field. Messy. Loud. Unforgettable.",
    image: "/images/live/offer-2.png",
  },
  {
    id: "cattle",
    title: "Cattle Feed Station",
    desc: "Feed hungry Brangus up close at the cattle feeding station.",
    image: "/images/live/offer-4.png",
  },
  {
    id: "encounters",
    title: "Animal Encounters",
    desc: "Meet-and-greets with the residents — private encounters available by reservation.",
    image: "/images/live/goat.jpg",
  },
  {
    id: "music",
    title: "Live Music",
    desc: "Bands on the Main Stage every market weekend — plus Farm After Dark nights.",
    image: "/images/live/event-market.png",
  },
] as const;

export const events = [
  {
    id: "merica",
    title: "'Merica… Farm Yeah!",
    when: "Seasonal summer sendoff",
    desc: "The ultimate summer sendoff — live music, food trucks, full bar, vendors, VIP seating.",
    image: "/images/live/merica.png",
    cta: "Get tickets",
    href: "/visit#tickets",
  },
  {
    id: "after-dark",
    title: "Farm After Dark",
    when: "Select evenings",
    desc: "Live music, line dancing, and night energy on the farm.",
    image: "/images/live/hero.png",
    cta: "Get tickets",
    href: "/visit#tickets",
  },
  {
    id: "market",
    title: "Weekend Farmers Market",
    when: "Every Sat & Sun · 9am – 2pm",
    desc: "60+ vendors, farm activities, food trucks, live music — year-round.",
    image: "/images/live/event-market.png",
    cta: "Explore Farmers Market",
    href: "/market",
  },
  {
    id: "line-dancing",
    title: "Line Dancing",
    when: "Select evenings",
    desc: "Good music, great company, all skill levels on the farm floor.",
    image: "/images/live/event-line.png",
    cta: "Join the night",
    href: "/visit",
  },
  {
    id: "farm-stand",
    title: "Fresh at the Farm Stand",
    when: "Mon – Fri · 9am – 4pm",
    desc: "Local produce, eggs, honey, and beef — weekday pickup at the stand.",
    image: "/images/live/event-stand.png",
    cta: "Plan a weekday visit",
    href: "/visit",
  },
  {
    id: "pumpkin",
    title: "Legendary Pumpkin Patch",
    when: "Seasonal · Coming soon",
    desc: "Visit the legendary pumpkin patch every year — watch for fall dates.",
    image: "/images/live/offer-6.png",
    cta: "Get updates",
    href: "/visit",
  },
] as const;

export const reviews = [
  {
    quote:
      "Love Hobe Sound farmers market! So many fun activities, food trucks and vendors to keep you and the kids busy for hours. We even got to grab a cocktail.",
    author: "Emilie C",
  },
  {
    quote:
      "One of the best farmers markets I have ever been to — clean, friendly vendors, and even a petting zoo.",
    author: "Kendall S",
  },
  {
    quote:
      "Took my family to tour the farm and meet the animals. One of my favorite places for fresh produce.",
    author: "Judy T",
  },
  {
    quote:
      "Always a great stop — food, snacks, tinctures, plants, soaps. And the fish dip is the BEST I've ever had.",
    author: "Alicia H",
  },
] as const;

export const tickets = [
  {
    name: "HSFM Activity Bundle",
    priceLabel: "$35",
    amountCents: 3500,
    features: [
      "Gem mining at The Gem Jungle",
      "Barrel tractor ride",
      "Seed bomb launch at Bouquet Bunker",
      "Market-day activity pack",
    ],
    featured: false,
  },
  {
    name: "Farm After Dark",
    priceLabel: "$15",
    amountCents: 1500,
    features: [
      "Evening admission",
      "Live music access",
      "Line dancing nights",
      "Night-market energy",
    ],
    featured: true,
  },
] as const;

export const knowBefore = [
  {
    title: "Reusable bags",
    detail: "Bring your own — save the planet one tote at a time.",
  },
  {
    title: "Service animals only",
    detail:
      "No pets — keeps our livestock safe and calm (ADA service animals OK).",
  },
  {
    title: "Comfortable shoes",
    detail:
      "This is a real working farm. You'll walk between barns, vendors, and activities.",
  },
  {
    title: "Sunscreen + hat",
    detail: "Florida sun does not negotiate. Cover up in summer.",
  },
  {
    title: "Parking",
    detail:
      "Enter the property and take a left. First-come, first-serve in front of the market.",
  },
  {
    title: "Restrooms",
    detail:
      "Porta-potties + hand sanitizer. Working agricultural farm — keep expectations honest.",
  },
] as const;

export const experiences = [
  {
    id: "weddings",
    title: "Weddings",
    tag: "Say I do",
    desc: "Magnolia Barn and outdoor celebrations on 126 acres.",
    image: "/images/live/offer-5.png",
  },
  {
    id: "field-trips",
    title: "Field Trips",
    tag: "Education",
    desc: "Hands-on farm days for classes — animals, crops, hatchery.",
    image: "/images/live/offer-1.png",
  },
  {
    id: "birthdays",
    title: "Birthdays & Parties",
    tag: "Celebrate",
    desc: "Private farm parties with animal meet-and-greets.",
    image: "/images/live/offer-2.png",
  },
  {
    id: "encounters",
    title: "Animal Encounters",
    tag: "Private",
    desc: "Reserved livestock meet-and-greets Mon–Thu.",
    image: "/images/live/goat.jpg",
  },
  {
    id: "photos",
    title: "Photo Shoots",
    tag: "Capture",
    desc: "Book the acreage as your backdrop.",
    image: "/images/live/offer-6.png",
  },
  {
    id: "after-dark",
    title: "Farm After Dark",
    tag: "Nights",
    desc: "Live music, line dancing, night-market energy.",
    image: "/images/live/hero.png",
  },
] as const;

export function getZone(id: string) {
  return mapZones.find((z) => z.id === id);
}

export function zonesForMode(mode: ZoneMode) {
  return mapZones.filter((z) => z.mode === mode);
}
