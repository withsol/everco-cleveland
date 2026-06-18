export type Area = "Rocky River" | "Avon Lake" | "Bay Village" | "Strongsville";

export type Property = {
  slug: string;
  /** Street line, used as the card title — e.g. "165 Belmar Blvd". */
  address: string;
  /** City, state, ZIP — e.g. "Avon Lake, OH 44012". */
  city: string;
  area: Area;
  /** Property type — e.g. "Single Family Colonial". */
  type: string;
  status: "Available" | "Coming Soon" | "Leased";
  /** Optional qualifier shown beside a status, e.g. "Renovation in Progress". */
  statusNote?: string;
  beds: number;
  baths: number;
  sqft?: number;
  /** Monthly rent in dollars — only set for homes actively on the market. */
  rent?: number;
  furnished?: boolean;
  /** Minimum stay note for furnished units, e.g. "1-Month Minimum". */
  minStay?: string;
  built?: number;
  blurb?: string;
  /** Publicly hosted CDN photo URL. */
  photo: string;
  communityFeatures?: string[];
};

export const areas: Area[] = [
  "Rocky River",
  "Avon Lake",
  "Bay Village",
  "Strongsville",
];

export const properties: Property[] = [
  {
    slug: "19933-westway-dr",
    address: "19933 Westway Dr",
    city: "Rocky River, OH 44116",
    area: "Rocky River",
    type: "Luxury Furnished Apartment",
    status: "Available",
    beds: 2,
    baths: 1,
    sqft: 1200,
    rent: 2950,
    furnished: true,
    minStay: "1-Month Minimum",
    blurb:
      "The upper unit of a newly refinished luxury duplex. Stainless steel appliances, granite counters, and hardwood throughout, with a separate dining room and private washer/dryer. Move-in ready and fully furnished.",
    photo:
      "https://photos.zillowstatic.com/fp/953b1ab114a71836d94136f0c1413f88-cc_ft_960.jpg",
  },
  {
    slug: "19931-westway-dr",
    address: "19931 Westway Dr",
    city: "Rocky River, OH 44116",
    area: "Rocky River",
    type: "Luxury Furnished Apartment",
    status: "Leased",
    beds: 2,
    baths: 1,
    sqft: 1100,
    rent: 2950,
    furnished: true,
    minStay: "1-Month Minimum",
    blurb:
      "Newly refinished luxury apartment with stainless steel appliances, granite counters, and hardwood throughout. Separate dining room, kitchen peninsula, private washer/dryer, huge storage/bonus space, and a sun porch.",
    photo:
      "https://photos.zillowstatic.com/fp/405c14a65208d29cc1e7a8bb617a11ac-cc_ft_960.jpg",
  },
  {
    slug: "201-yoder-blvd",
    address: "201 Yoder Blvd",
    city: "Avon Lake, OH 44012",
    area: "Avon Lake",
    type: "Single Family Ranch",
    status: "Leased",
    beds: 3,
    baths: 2,
    sqft: 1562,
    built: 1960,
    blurb:
      "A gorgeous ranch with an open-concept layout — a spacious kitchen flowing into a bright living room with fireplace. Primary suite with en-suite bath, large backyard, and an attached two-car garage.",
    photo:
      "https://photos.zillowstatic.com/fp/b40950f671ad5ee6ac2b0852da66bc0e-cc_ft_960.jpg",
  },
  {
    slug: "187-sunset-rd",
    address: "187 Sunset Rd",
    city: "Avon Lake, OH 44012",
    area: "Avon Lake",
    type: "Single Family Home",
    status: "Leased",
    beds: 3,
    baths: 2,
    sqft: 1580,
    photo:
      "https://photos.zillowstatic.com/fp/558c384c0d97d0e8ae58de4ab8bd336b-cc_ft_960.jpg",
  },
  {
    slug: "9690-brookstone-way",
    address: "9690 Brookstone Way",
    city: "Strongsville, OH 44136",
    area: "Strongsville",
    type: "Single Family Home",
    status: "Leased",
    beds: 3,
    baths: 2,
    sqft: 1800,
    photo:
      "https://photos.zillowstatic.com/fp/92ad25a7e0140677cef4cd7b58ab5ae3-cc_ft_960.jpg",
  },
  {
    slug: "17016-lanier-ave",
    address: "17016 Lanier Ave",
    city: "Strongsville, OH 44136",
    area: "Strongsville",
    type: "Single Family Split Level",
    status: "Leased",
    beds: 4,
    baths: 2,
    sqft: 2420,
    built: 1974,
    blurb:
      "A four-bedroom split level with basement, updated and freshly painted. Eat-in kitchen, formal dining with slider to a covered deck, and a spacious family room with fireplace. Attached two-car garage and fenced yard.",
    photo:
      "https://photos.zillowstatic.com/fp/f8c34eb53ad79586663cded95e72c362-cc_ft_960.jpg",
  },
  {
    slug: "183-parsons-dr",
    address: "183 Parsons Dr",
    city: "Avon Lake, OH 44012",
    area: "Avon Lake",
    type: "Single Family Cape Cod",
    status: "Leased",
    beds: 3,
    baths: 2,
    sqft: 1717,
    built: 1975,
    blurb:
      "Recently renovated with new vinyl plank flooring, stylish light fixtures, and stainless steel appliances. Eat-in kitchen with center island, spacious family room, and a super-sized laundry room. Fenced backyard, walkable to parks and Lake Erie.",
    photo:
      "https://photos.zillowstatic.com/fp/bc6cd3de4d094931400e25990022efb7-cc_ft_960.jpg",
  },
  {
    slug: "514-cahoon-rd",
    address: "514 Cahoon Rd",
    city: "Bay Village, OH 44140",
    area: "Bay Village",
    type: "Single Family Home",
    status: "Leased",
    beds: 3,
    baths: 2,
    sqft: 1766,
    photo:
      "https://photos.zillowstatic.com/fp/1891a989db72c28a3c250e612c2fe1ff-cc_ft_960.jpg",
  },
  {
    slug: "526-huntmere-dr",
    address: "526 Huntmere Dr",
    city: "Bay Village, OH 44140",
    area: "Bay Village",
    type: "Single Family Home",
    status: "Leased",
    beds: 3,
    baths: 2,
    photo:
      "https://photos.zillowstatic.com/fp/03f51fe48530d8d3f43f36c09bcb37c5-cc_ft_960.jpg",
  },
  {
    slug: "165-belmar-blvd",
    address: "165 Belmar Blvd",
    city: "Avon Lake, OH 44012",
    area: "Avon Lake",
    type: "Single Family Colonial",
    status: "Leased",
    beds: 3,
    baths: 3,
    sqft: 1855,
    built: 1952,
    blurb:
      "An incredible property in northern Avon Lake — quartz countertops, white cabinets, and newer appliances. Refinished wood floors, freshly painted, with a wood-burning fireplace and three bedrooms with gorgeous wood flooring upstairs. Nearly half-acre lot and a detached two-car garage.",
    photo:
      "https://photos.zillowstatic.com/fp/6046e4ebcdeeb2b064fb45d2fd16b964-cc_ft_960.jpg",
  },
  {
    slug: "27840-lincoln-rd",
    address: "27840 Lincoln Rd",
    city: "Bay Village, OH 44140",
    area: "Bay Village",
    type: "Single Family Cape Cod",
    status: "Coming Soon",
    statusNote: "Renovation in Progress",
    beds: 3,
    baths: 2,
    sqft: 2116,
    built: 1953,
    blurb:
      "A charming Cape Cod on a peaceful, quiet street in Bay Village. Cozy wood-burning fireplace, a completely remodeled kitchen with quartz countertops and stainless steel appliances, and a finished basement with full bathroom. Beautiful back deck with fenced backyard and a detached one-car garage.",
    photo:
      "https://photos.zillowstatic.com/fp/4f940775d3ebaf851d8710191a247408-cc_ft_960.jpg",
  },
  {
    slug: "17073-drake-rd",
    address: "17073 Drake Rd",
    city: "Strongsville, OH 44136",
    area: "Strongsville",
    type: "Single Family Colonial",
    status: "Leased",
    beds: 3,
    baths: 3,
    sqft: 2016,
    built: 1977,
    blurb:
      "A well-maintained colonial with freshly painted interior, brand-new carpet upstairs, and new kitchen appliances. Family room with fireplace, French doors to a walk-out patio, and a fenced backyard with shed. Community pool, fitness center, and playground access.",
    photo:
      "https://photos.zillowstatic.com/fp/1c9277d83fc95a84eecdb2beeb261050-cc_ft_960.jpg",
    communityFeatures: ["Pool", "Fitness Center", "Playground", "Park"],
  },
];

export const statusStyles: Record<Property["status"], string> = {
  Available: "bg-forest text-paper",
  "Coming Soon": "bg-copper text-paper",
  Leased: "bg-charcoal-soft/15 text-charcoal-soft",
};

/** Sort order so on-market homes lead and leased homes trail. */
const statusRank: Record<Property["status"], number> = {
  Available: 0,
  "Coming Soon": 1,
  Leased: 2,
};

export function sortByAvailability(list: Property[]): Property[] {
  return [...list].sort((a, b) => statusRank[a.status] - statusRank[b.status]);
}
