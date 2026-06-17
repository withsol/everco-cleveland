export type Property = {
  slug: string;
  name: string;
  neighborhood: string;
  status: "Available" | "Coming Soon" | "Leased";
  beds: number;
  baths: number;
  sqft: number;
  rent: number;
  blurb: string;
  // A warm placeholder tone used in lieu of real photography.
  tone: string;
};

export const properties: Property[] = [
  {
    slug: "the-clifton-foursquare",
    name: "The Clifton Foursquare",
    neighborhood: "Lakewood",
    status: "Available",
    beds: 4,
    baths: 2,
    sqft: 2150,
    rent: 2650,
    blurb:
      "A 1914 American Foursquare two blocks from the lake, restored down to the quarter-sawn oak floors. Chef's kitchen, screened porch, and a garden that the last tenants never wanted to leave.",
    tone: "#3a5142",
  },
  {
    slug: "rocky-river-bungalow",
    name: "Rocky River Bungalow",
    neighborhood: "Rocky River",
    status: "Available",
    beds: 3,
    baths: 2,
    sqft: 1680,
    rent: 2300,
    blurb:
      "A sun-filled craftsman with original built-ins, a renovated bath, and a deep backyard. Walkable to Old River shops and the Metroparks reservation.",
    tone: "#7a5a34",
  },
  {
    slug: "the-detroit-shoreway-double",
    name: "The Detroit-Shoreway Double",
    neighborhood: "Detroit-Shoreway",
    status: "Coming Soon",
    beds: 2,
    baths: 1,
    sqft: 1100,
    rent: 1750,
    blurb:
      "Upper unit of a fully reimagined 1920s double. Exposed brick, a new galley kitchen, and a private balcony overlooking the Gordon Square arts district.",
    tone: "#5a6b4d",
  },
  {
    slug: "kamms-corners-colonial",
    name: "Kamm's Corners Colonial",
    neighborhood: "West Park",
    status: "Available",
    beds: 4,
    baths: 3,
    sqft: 2400,
    rent: 2895,
    blurb:
      "A stately brick colonial with a finished third floor, two-car garage, and a primary suite added in our 2024 renovation. Built for a growing family.",
    tone: "#8a6a3a",
  },
  {
    slug: "the-bay-village-ranch",
    name: "The Bay Village Ranch",
    neighborhood: "Bay Village",
    status: "Leased",
    beds: 3,
    baths: 2,
    sqft: 1560,
    rent: 2400,
    blurb:
      "A mid-century ranch on a quiet cul-de-sac, blocks from the lakefront and one of the best school districts on the west side. Open-plan living and a brand-new kitchen.",
    tone: "#46584b",
  },
  {
    slug: "the-edgewater-flat",
    name: "The Edgewater Flat",
    neighborhood: "Edgewater",
    status: "Coming Soon",
    beds: 1,
    baths: 1,
    sqft: 820,
    rent: 1450,
    blurb:
      "A bright corner flat with skyline-and-lake views, restored hardwood, and a building rooftop. A short walk to Edgewater Park and the beach.",
    tone: "#6f553a",
  },
];

export const statusStyles: Record<Property["status"], string> = {
  Available: "bg-forest text-paper",
  "Coming Soon": "bg-copper text-paper",
  Leased: "bg-charcoal-soft/20 text-charcoal-soft",
};
