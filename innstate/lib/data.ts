export type Destination = {
  slug: string;
  name: string;
  region: "Middle East" | "Europe" | "Asia" | "Africa";
  image: string;
};

export const destinations: Destination[] = [
  { slug: "dubai", name: "Dubai", region: "Middle East", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop" },
  { slug: "paris", name: "Paris", region: "Europe", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop" },
  { slug: "london", name: "London", region: "Europe", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop" },
  { slug: "istanbul", name: "Istanbul", region: "Europe", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop" },
  { slug: "rome", name: "Rome", region: "Europe", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop" },
  { slug: "bangkok", name: "Bangkok", region: "Asia", image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop" },
  { slug: "maldives", name: "Maldives", region: "Asia", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop" },
];

export type Deal = {
  slug: string;
  hotel: string;
  location: string;
  image: string;
  description: string;
};

export const deals: Deal[] = [
  {
    slug: "burj-al-arab-dubai",
    hotel: "Burj Al Arab Resort",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1596386461350-326ccb383e9f?q=80&w=1200&auto=format&fit=crop",
    description: "Iconic waterfront stay with skyline views and exclusive seasonal offers.",
  },
  {
    slug: "le-marais-paris",
    hotel: "Le Marais Boutique Hotel",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1200&auto=format&fit=crop",
    description: "Charming boutique stay steps away from Paris's most iconic landmarks.",
  },
  {
    slug: "thames-view-london",
    hotel: "Thames View Hotel",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1200&auto=format&fit=crop",
    description: "Modern riverside rooms with easy access to London's top attractions.",
  },
  {
    slug: "bosphorus-suites-istanbul",
    hotel: "Bosphorus Suites",
    location: "Istanbul, Turkey",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=1200&auto=format&fit=crop",
    description: "Elegant suites overlooking the Bosphorus with rich cultural surroundings.",
  },
  {
    slug: "trastevere-retreat-rome",
    hotel: "Trastevere Retreat",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1200&auto=format&fit=crop",
    description: "A cozy retreat in Rome's most charming neighborhood, full of character.",
  },
  {
    slug: "riverside-bangkok",
    hotel: "Riverside Bangkok Hotel",
    location: "Bangkok, Thailand",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?q=80&w=1200&auto=format&fit=crop",
    description: "Contemporary comfort along the Chao Phraya River with great deals.",
  },
  {
    slug: "overwater-villas-maldives",
    hotel: "Overwater Villas Maldives",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
    description: "Dreamy overwater villas with direct lagoon access and exclusive rates.",
  },
];

export const socialLinks = {
  facebook: "https://www.facebook.com/Innstate/",
  instagram: "https://www.instagram.com/innstate_ge",
};

export const contactEmail = "zhvania01@gmail.com";
