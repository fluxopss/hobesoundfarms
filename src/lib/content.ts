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
  facebookMarket: "https://www.facebook.com/hobesoundfarmersmarket",
  instagram: "https://www.instagram.com/hobesoundfarmersmarket/",
  logo: "/images/live/logo.png",
  hero: "/images/live/hero.png",
  map: "/images/live/map.jpg",
  mapMobile: "/images/live/map-mobile.png",
};

export const trailChapters = [
  { id: "landing", label: "Gate", href: "#landing" },
  { id: "market", label: "Market", href: "#market" },
  { id: "acreage", label: "Acreage", href: "#acreage" },
  { id: "residents", label: "Residents", href: "#residents" },
  { id: "weekend", label: "Walk", href: "#weekend" },
  { id: "nights", label: "Nights", href: "#nights" },
  { id: "arrive", label: "Arrive", href: "#arrive" },
] as const;

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
    desc: "Seasonal veggies, herbs, plant starters grown on-site and across the state.",
  },
  {
    category: "food",
    tag: "Hot Food",
    title: "Food trucks & plates",
    desc: "Fresh-made eats for the whole family — grab a cocktail while you're at it.",
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

export const marketWalk = [
  {
    id: "vendor-barns",
    label: "Vendor Barns",
    desc: "60+ rotating makers — produce, food, crafts, plants. Roster changes weekly.",
    x: 35,
    y: 35,
    image: "/images/live/event-market.png",
  },
  {
    id: "main-stage",
    label: "Main Stage",
    desc: "Live band every market weekend. Music under the Florida sky.",
    x: 72,
    y: 38,
    image: "/images/live/offer-6.png",
  },
  {
    id: "gem-jungle",
    label: "Gem Jungle",
    desc: "Mine for gems — dig, rinse, keep what you find.",
    x: 62,
    y: 48,
    image: "/images/live/offer-3.png",
  },
  {
    id: "bouquet-bunker",
    label: "Bouquet Bunker",
    desc: "Launch seed bombs across the field. Pure weekend chaos.",
    x: 48,
    y: 55,
    image: "/images/live/offer-2.png",
  },
  {
    id: "cattle-feed",
    label: "Cattle Feed",
    desc: "Feed hungry Brangus at the cattle feeding station.",
    x: 55,
    y: 72,
    image: "/images/live/offer-4.png",
  },
  {
    id: "animal-alley",
    label: "Animal Alley",
    desc: "Petting zoo and animal encounters — kids' favorite stop.",
    x: 40,
    y: 58,
    image: "/images/live/goat.jpg",
  },
  {
    id: "the-bar",
    label: "The Bar",
    desc: "Yes, there's a bar. Drink responsibly on a working farm.",
    x: 68,
    y: 45,
    image: "/images/live/hero.png",
  },
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
    image: "/images/live/turtles.jpg",
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
    alt: "Cattle feeding station at Hobe Sound Farms",
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
    slug: "turkeys-quail",
    species: "Turkeys & Quail",
    role: "Heritage flocks · eggs & stock",
    blurb:
      "White Holland turkeys and Coturnix quail — raised on site as part of the working farm.",
    image: "/images/live/turkey.jpg",
    alt: "Turkeys at Hobe Sound Farms",
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
    href: "/#arrive",
  },
  {
    id: "market",
    title: "Weekend Farmers Market",
    when: "Every Sat & Sun · 9am – 2pm",
    desc: "60+ vendors, farm activities, food trucks, live music — year-round.",
    image: "/images/live/event-market.png",
    cta: "Enter Market Mode",
    href: "/market",
  },
  {
    id: "line-dancing",
    title: "Line Dancing",
    when: "Select evenings",
    desc: "Good music, great company, all skill levels on the farm floor.",
    image: "/images/live/event-line.png",
    cta: "Join the night",
    href: "/#arrive",
  },
  {
    id: "farm-stand",
    title: "Fresh at the Farm Stand",
    when: "Mon – Fri · 9am – 4pm",
    desc: "Local produce, eggs, honey, and beef — weekday pickup at the stand.",
    image: "/images/live/event-stand.png",
    cta: "Shop the stand",
    href: "/#arrive",
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
    features: ["Gem mining", "Tractor ride", "Seed bomb launch", "Market-day fun pack"],
    featured: false,
  },
  {
    name: "Farm After Dark",
    priceLabel: "$15",
    amountCents: 1500,
    features: ["Evening admission", "Live music access", "Night-market energy", "Square checkout"],
    featured: true,
  },
] as const;

export const knowBefore = [
  { title: "Reusable bags", detail: "Bring your own — save the planet one tote at a time." },
  { title: "Service animals only", detail: "No pets — keeps our livestock safe and calm (ADA service animals OK)." },
  { title: "Comfortable shoes", detail: "This is a real working farm. You'll walk between barns, vendors, and activities." },
  { title: "Sunscreen + hat", detail: "Florida sun does not negotiate. Cover up in summer." },
  { title: "Parking", detail: "Enter the property and take a left. First-come, first-serve in front of the market." },
  { title: "Restrooms", detail: "Porta-potties + hand sanitizer. Working agricultural farm — keep expectations honest." },
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
