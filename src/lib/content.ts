export const site = {
  name: "Hobe Sound Farms",
  tagline: "Open the gate. Walk the acreage.",
  blurb:
    "A 126-acre working farm in Hobe Sound — weekend market, livestock, tractor rides, Gem Jungle, live music, and celebrations under the South Florida sky.",
  address: "1425 SE Bridge Road, Hobe Sound, FL 33455",
  phone: "(844) 462-3763",
  phoneHref: "tel:+18444623763",
  email: "info@hobesoundfarms.com",
  marketHours: "Sat & Sun 9am – 2pm",
  standHours: "Mon – Fri 9am – 4pm",
  mapsUrl: "https://maps.google.com/?q=1425+SE+Bridge+Road,+Hobe+Sound,+FL+33455",
  logo: "/images/live/logo.png",
  hero: "/images/live/hero.png",
  map: "/images/live/map.jpg",
  mapMobile: "/images/live/map-mobile.png",
};

export const trailChapters = [
  { id: "landing", label: "Gate", href: "#landing" },
  { id: "acreage", label: "Acreage", href: "#acreage" },
  { id: "residents", label: "Residents", href: "#residents" },
  { id: "weekend", label: "Weekend", href: "#weekend" },
  { id: "nights", label: "Nights", href: "#nights" },
  { id: "arrive", label: "Arrive", href: "#arrive" },
] as const;

export const mapZones = [
  {
    id: "gem-jungle",
    label: "The Gem Jungle",
    desc: "Hands-on gem panning — dig, rinse, and keep what you find.",
    x: 62,
    y: 48,
    image: "/images/live/offer-3.png",
  },
  {
    id: "bouquet-bunker",
    label: "Bouquet Bunker",
    desc: "Launch seed bombs across the field. Pure farm chaos, family-approved.",
    x: 48,
    y: 55,
    image: "/images/live/offer-2.png",
  },
  {
    id: "house-of-giants",
    label: "House of the Giants",
    desc: "Home of the Indio Gigante chickens — nearly three feet tall.",
    x: 28,
    y: 42,
    image: "/images/live/rooster.jpg",
  },
  {
    id: "animal-alley",
    label: "Animal Alley",
    desc: "Walk the main animal corridor — goats, guardians, and greetings.",
    x: 40,
    y: 58,
    image: "/images/live/goat.jpg",
  },
  {
    id: "petting-zoo",
    label: "Petting Zoo",
    desc: "Up-close animal encounters that steal the whole afternoon.",
    x: 35,
    y: 68,
    image: "/images/live/goat-2.jpg",
  },
  {
    id: "cattle-feed",
    label: "Cattle Feed Station",
    desc: "Feed the Brangus herd — pasture-raised Florida cattle.",
    x: 55,
    y: 72,
    image: "/images/live/offer-4.png",
  },
  {
    id: "main-stage",
    label: "Main Stage",
    desc: "Live music for market weekends and after-dark nights.",
    x: 72,
    y: 38,
    image: "/images/live/event-market.png",
  },
  {
    id: "duck-pond",
    label: "Duck Pond",
    desc: "Khaki Campbell ducks and shade on Florida heat days.",
    x: 22,
    y: 62,
    image: "/images/live/tortoise.jpg",
  },
  {
    id: "sunflower-barn",
    label: "Sunflower Barn",
    desc: "Gathering space for celebrations, showers, and photo moments.",
    x: 78,
    y: 52,
    image: "/images/live/offer-1.png",
  },
  {
    id: "magnolia-barn",
    label: "Magnolia Barn",
    desc: "Weddings, birthdays, corporate — say yes on 126 acres.",
    x: 85,
    y: 40,
    image: "/images/live/offer-5.png",
  },
] as const;

export const residents = [
  {
    slug: "nigerian-dwarf-goats",
    species: "Nigerian Dwarf Goats",
    role: "Breeding herd · pasture management",
    blurb:
      "Raised for breeding and sale. Their rotational grazing keeps vegetation in check across the acreage.",
    image: "/images/live/goat.jpg",
    alt: "Goat in the Hobe Sound Farms petting zoo",
  },
  {
    slug: "brangus-cattle",
    species: "Brangus Cattle",
    role: "Pasture-raised · sold at market",
    blurb:
      "Angus quality meets Brahman heat tolerance — built for Florida. Locally born, grain finished, USDA processed.",
    image: "/images/live/offer-4.png",
    alt: "Cattle on the farm",
  },
  {
    slug: "guardian-donkeys",
    species: "Donkeys",
    role: "Livestock guardians",
    blurb:
      "Working guardians protecting cattle and goat herds — an accepted commercial agricultural practice.",
    image: "/images/live/goat-2.jpg",
    alt: "Farm animals near the paddock",
  },
  {
    slug: "hens-chicks",
    species: "Hens & Chicks",
    role: "Eggs · hatchery · brooder kits",
    blurb:
      "Commercial egg production plus the Hatchery — fertilized eggs, chicks, and complete brooder kits for families.",
    image: "/images/live/chicks.jpg",
    alt: "Chicks at the Hobe Sound Hatchery",
  },
  {
    slug: "indio-gigante",
    species: "Indio Gigante Chickens",
    role: "Heritage breeding stock",
    blurb:
      "A heritage meat breed raised as breeding stock. Meet them at House of the Giants.",
    image: "/images/live/rooster.jpg",
    alt: "Rooster at Hobe Sound Farms",
  },
  {
    slug: "honey-bees",
    species: "Honey Bees",
    role: "Apiary · farmstand honey",
    blurb:
      "From hive to jar — raw local honey harvested and sold at the farmstand and weekend market.",
    image: "/images/live/quail.jpg",
    alt: "Farm livestock and pollinators",
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
    desc: "Bands on the Main Stage every market weekend — plus After Hours nights.",
    image: "/images/live/event-market.png",
  },
] as const;

export const events = [
  {
    id: "merica",
    title: "'Merica… Farm Yeah!",
    when: "Seasonal summer sendoff",
    desc: "Live music, food trucks, full bar, mechanical bull, vendors, VIP seating.",
    image: "/images/live/merica.png",
    cta: "Get tickets",
    href: "#arrive",
  },
  {
    id: "market",
    title: "Weekend Farmers Market",
    when: "Every Sat & Sun · 9am – 2pm",
    desc: "60+ vendors, farm activities, food trucks, live music — year-round.",
    image: "/images/live/event-market.png",
    cta: "Plan your visit",
    href: "#weekend",
  },
  {
    id: "line-dancing",
    title: "Line Dancing",
    when: "Select evenings",
    desc: "Good music, great company, all skill levels on the farm floor.",
    image: "/images/live/event-line.png",
    cta: "Join the night",
    href: "#arrive",
  },
  {
    id: "farm-stand",
    title: "Fresh at the Farm Stand",
    when: "Mon – Fri · 9am – 4pm",
    desc: "Local produce, eggs, honey, and beef — weekday pickup at the stand.",
    image: "/images/live/event-stand.png",
    cta: "Shop the stand",
    href: "#arrive",
  },
] as const;

export const reviews = [
  {
    quote:
      "Love Hobe Sound farmers market! So many fun activities, food trucks and vendors to keep you and the kids busy for hours.",
    author: "Emilie C",
  },
  {
    quote:
      "One of the best farmers markets I have ever been to — clean, friendly vendors, even a petting zoo.",
    author: "Kendall S",
  },
  {
    quote: "Took my family to tour the farm and meet the animals. One of my favorite places for fresh produce.",
    author: "Judy T",
  },
] as const;

export const tickets = [
  {
    name: "Farm Explorer Day",
    priceLabel: "$25",
    amountCents: 2500,
    features: ["Animal encounters", "Farm activities", "Kids adventure day", "Ages 2–10 focus"],
    featured: false,
  },
  {
    name: "Farm After Dark",
    priceLabel: "$15",
    amountCents: 1500,
    features: ["Evening admission", "Live music access", "Night-market energy", "Demo Square checkout"],
    featured: true,
  },
] as const;

export const knowBefore = [
  "Bring reusable bags",
  "Service animals only — no pets",
  "Wear comfortable walking shoes",
  "Sunscreen + hat in summer",
  "Parking: enter and take a left",
] as const;
