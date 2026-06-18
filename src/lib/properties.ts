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
  /** Primary (hero) photo — a publicly hosted CDN URL. */
  photo: string;
  /** Additional CDN photo URLs shown in the detail-page gallery. */
  gallery?: string[];
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
    sqft: 1100,
    rent: 2950,
    furnished: true,
    minStay: "1-Month Minimum",
    blurb:
      "The upper unit of a newly refinished luxury duplex. Stainless steel appliances, granite counters, and hardwood throughout, with a separate dining room and private washer/dryer. Move-in ready and fully furnished.",
    photo:
      "https://photos.zillowstatic.com/fp/953b1ab114a71836d94136f0c1413f88-cc_ft_960.jpg",
    gallery: [
      "https://photos.zillowstatic.com/fp/312c99d0bb5dfe9e24ae130267d3695f-cc_ft_960.jpg",
      "https://photos.zillowstatic.com/fp/ad13a036e219217f49e646f30ee5d870-cc_ft_960.jpg",
      "https://photos.zillowstatic.com/fp/dffbdfd4ef91f4cd1824acada6f4e9f4-cc_ft_960.jpg",
      "https://photos.zillowstatic.com/fp/7f8a9468e0eceb8b92f03ec53aa4c8be-cc_ft_960.jpg",
      "https://photos.zillowstatic.com/fp/e2f2f641cbffeeea51fbb8a044c82e97-cc_ft_960.jpg",
    ],
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
    gallery: [
      "https://photos.zillowstatic.com/fp/fcd30f8fda851975e6aa923b8a23b349-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/04c6056e591bfdd3156cc46805df9c7c-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/922f0c34aa979ba9535e880ad667ab8f-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/039f59f33d252e6b752cf20600479397-cc_ft_576.jpg",
    ],
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
    gallery: [
      "https://photos.zillowstatic.com/fp/5769c7ec0aa6c0ccba51dd322719b8b7-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/023c7d8f78c07a37f1fbc906633b86ab-cc_ft_576.jpg",
    ],
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
    photo: "/properties/17016-lanier-ave/01.jpg",
    gallery: [
      "/properties/17016-lanier-ave/02.jpg",
      "/properties/17016-lanier-ave/03.jpg",
      "/properties/17016-lanier-ave/04.jpg",
      "/properties/17016-lanier-ave/05.jpg",
      "/properties/17016-lanier-ave/06.jpg",
      "/properties/17016-lanier-ave/07.jpg",
      "/properties/17016-lanier-ave/08.jpg",
      "/properties/17016-lanier-ave/09.jpg",
      "/properties/17016-lanier-ave/10.jpg",
      "/properties/17016-lanier-ave/11.jpg",
      "/properties/17016-lanier-ave/12.jpg",
      "/properties/17016-lanier-ave/13.jpg",
      "/properties/17016-lanier-ave/14.jpg",
      "/properties/17016-lanier-ave/15.jpg",
      "/properties/17016-lanier-ave/16.jpg",
      "/properties/17016-lanier-ave/17.jpg",
      "/properties/17016-lanier-ave/18.jpg",
      "/properties/17016-lanier-ave/19.jpg",
      "/properties/17016-lanier-ave/20.jpg",
      "/properties/17016-lanier-ave/21.jpg",
      "/properties/17016-lanier-ave/22.jpg",
      "/properties/17016-lanier-ave/23.jpg",
      "/properties/17016-lanier-ave/24.jpg",
      "/properties/17016-lanier-ave/25.jpg",
    ],
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
    gallery: [
      "https://photos.zillowstatic.com/fp/7fbd244f3324accb1a1aebfb734060b6-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/6d8918318723126775e5dba30d3f268a-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/5a3906994ed7e3814711999f6c902e7a-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/bcbaea4a2a73c6b9a34e53cb0a4793b3-cc_ft_576.jpg",
    ],
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
    beds: 4,
    baths: 3,
    sqft: 1855,
    built: 1952,
    blurb:
      "An incredible property in northern Avon Lake — quartz countertops, white cabinets, and newer appliances. Refinished wood floors, freshly painted, with a wood-burning fireplace and three bedrooms with gorgeous wood flooring upstairs. Nearly half-acre lot and a detached two-car garage.",
    photo: "/properties/165-belmar-blvd/01.jpg",
    gallery: [
      "/properties/165-belmar-blvd/02.jpg",
      "/properties/165-belmar-blvd/03.jpg",
      "/properties/165-belmar-blvd/04.jpg",
      "/properties/165-belmar-blvd/05.jpg",
      "/properties/165-belmar-blvd/06.jpg",
      "/properties/165-belmar-blvd/07.jpg",
      "/properties/165-belmar-blvd/08.jpg",
      "/properties/165-belmar-blvd/09.jpg",
      "/properties/165-belmar-blvd/10.jpg",
      "/properties/165-belmar-blvd/11.jpg",
      "/properties/165-belmar-blvd/12.jpg",
      "/properties/165-belmar-blvd/13.jpg",
      "/properties/165-belmar-blvd/14.jpg",
      "/properties/165-belmar-blvd/15.jpg",
      "/properties/165-belmar-blvd/16.jpg",
      "/properties/165-belmar-blvd/17.jpg",
      "/properties/165-belmar-blvd/18.jpg",
      "/properties/165-belmar-blvd/19.jpg",
    ],
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
    gallery: [
      "https://photos.zillowstatic.com/fp/81916ca86cd240244d32e6214cfb7e72-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/6dc11a7bdd4b282791f0a0e59e804714-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/9c78ead837c17ae24f01eb46c9445ed2-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/9891c25e2779e06165410d13eacdf154-cc_ft_576.jpg",
    ],
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
    gallery: [
      "https://photos.zillowstatic.com/fp/27d6871eaed1d96ad4cceb824b651bbe-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/e022f4e235e7f6e7c7ba460400e09b7e-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/8fe24f90220e4baf7c9036cb04d8da19-cc_ft_576.jpg",
      "https://photos.zillowstatic.com/fp/a60ad3c66f669c5123ed4a4f5263a989-cc_ft_576.jpg",
    ],
    communityFeatures: ["Pool", "Fitness Center", "Playground", "Park"],
  },
];

export const statusStyles: Record<Property["status"], string> = {
  Available: "bg-forest text-paper",
  "Coming Soon": "bg-copper text-paper",
  // Solid earthy green so the label stays legible over any photo.
  Leased: "bg-[#4A6741] text-white",
};

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

/** Hero photo first, followed by any additional gallery photos. */
export function propertyImages(p: Property): string[] {
  return [p.photo, ...(p.gallery ?? [])];
}

/** Sort order so on-market homes lead and leased homes trail. */
const statusRank: Record<Property["status"], number> = {
  Available: 0,
  "Coming Soon": 1,
  Leased: 2,
};

export function sortByAvailability(list: Property[]): Property[] {
  return [...list].sort((a, b) => statusRank[a.status] - statusRank[b.status]);
}
