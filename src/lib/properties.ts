export type Area = "Rocky River" | "Avon Lake" | "Bay Village" | "Strongsville";

/** A gallery item — a photo or a video — with an optional caption. */
export type PropertyMedia = {
  src: string;
  /** Describes the room or detail — e.g. "Renovated kitchen with quartz counters". */
  caption?: string;
  /** Poster frame for a video, shown before it plays. */
  poster?: string;
};

/**
 * A gallery entry. Plain URL strings stay valid, so captions can be added one
 * item at a time by swapping a string for `{ src, caption }`.
 */
export type GalleryItem = string | PropertyMedia;

const VIDEO_EXTENSIONS = /\.(mp4|mov|m4v|webm|ogv)$/i;

/** True when a gallery item should render as a video player rather than an image. */
export function isVideo(src: string): boolean {
  return VIDEO_EXTENSIONS.test(src);
}

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
  furnished?: boolean;
  /** Minimum stay note for furnished units, e.g. "1-Month Minimum". */
  minStay?: string;
  built?: number;
  blurb?: string;
  /** Primary (hero) photo — a publicly hosted CDN URL. */
  photo: string;
  /** Optional caption for the hero photo, shown in the lightbox. */
  photoCaption?: string;
  /** Additional photos for the detail-page gallery: a URL, or `{ src, caption }`. */
  gallery?: GalleryItem[];
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
    statusNote: "October 1st",
    beds: 2,
    baths: 1,
    sqft: 1100,
    furnished: true,
    minStay: "1-Month Minimum",
    blurb:
      "The upper unit of a newly refinished luxury duplex. Stainless steel appliances, granite counters, and hardwood throughout, with a separate dining room and private washer/dryer. Move-in ready and fully furnished.",
    photo: "/properties/19933-westway-dr/01.jpg",
    gallery: [
      "/properties/19933-westway-dr/02.jpg",
      "/properties/19933-westway-dr/03.jpg",
      "/properties/19933-westway-dr/04.jpg",
      "/properties/19933-westway-dr/05.jpg",
      "/properties/19933-westway-dr/06.jpg",
      "/properties/19933-westway-dr/07.jpg",
      "/properties/19933-westway-dr/08.jpg",
      "/properties/19933-westway-dr/09.jpg",
      "/properties/19933-westway-dr/10.jpg",
      "/properties/19933-westway-dr/11.jpg",
      "/properties/19933-westway-dr/12.jpg",
      "/properties/19933-westway-dr/13.jpg",
    ],
  },
  {
    slug: "19931-westway-dr",
    address: "19931 Westway Dr",
    city: "Rocky River, OH 44116",
    area: "Rocky River",
    type: "Luxury Furnished Apartment",
    status: "Available",
    statusNote: "Now",
    beds: 2,
    baths: 1,
    sqft: 1100,
    furnished: true,
    minStay: "1-Month Minimum",
    blurb:
      "Newly refinished luxury apartment with stainless steel appliances, granite counters, and hardwood throughout. Separate dining room, kitchen peninsula, private washer/dryer, huge storage/bonus space, and a sun porch.",
    photo: "/properties/19931-westway-dr/01.jpg",
    photoCaption:
      "The furnished living room, with its fireplace and deep front windows.",
    gallery: [
      {
        src: "/properties/19931-westway-dr/02.jpg",
        caption: "A second seating area off the living room.",
      },
      "/properties/19931-westway-dr/03.jpg",
      "/properties/19931-westway-dr/04.jpg",
      "/properties/19931-westway-dr/05.jpg",
      "/properties/19931-westway-dr/06.jpg",
      "/properties/19931-westway-dr/07.jpg",
      "/properties/19931-westway-dr/08.jpg",
      "/properties/19931-westway-dr/09.jpg",
      "/properties/19931-westway-dr/10.jpg",
      "/properties/19931-westway-dr/11.jpg",
      "/properties/19931-westway-dr/12.jpg",
      "/properties/19931-westway-dr/13.jpg",
      "/properties/19931-westway-dr/14.jpg",
      "/properties/19931-westway-dr/15.jpg",
      "/properties/19931-westway-dr/16.jpg",
      "/properties/19931-westway-dr/17.jpg",
      "/properties/19931-westway-dr/18.jpg",
      "/properties/19931-westway-dr/19.jpg",
      "/properties/19931-westway-dr/20.jpg",
      "/properties/19931-westway-dr/21.jpg",
      "/properties/19931-westway-dr/22.jpg",
      "/properties/19931-westway-dr/23.jpg",
      "/properties/19931-westway-dr/24.jpg",
      "/properties/19931-westway-dr/25.jpg",
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
    photo: "/properties/201-yoder-blvd/01.jpg",
    gallery: [
      "/properties/201-yoder-blvd/02.jpg",
      "/properties/201-yoder-blvd/03.jpg",
      "/properties/201-yoder-blvd/04.jpg",
      "/properties/201-yoder-blvd/05.jpg",
      "/properties/201-yoder-blvd/06.jpg",
      "/properties/201-yoder-blvd/07.jpg",
      "/properties/201-yoder-blvd/08.jpg",
      "/properties/201-yoder-blvd/09.jpg",
      "/properties/201-yoder-blvd/10.jpg",
      "/properties/201-yoder-blvd/11.jpg",
      "/properties/201-yoder-blvd/12.jpg",
      "/properties/201-yoder-blvd/13.jpg",
      "/properties/201-yoder-blvd/14.jpg",
      "/properties/201-yoder-blvd/15.jpg",
      "/properties/201-yoder-blvd/16.jpg",
      "/properties/201-yoder-blvd/17.jpg",
      "/properties/201-yoder-blvd/18.jpg",
      "/properties/201-yoder-blvd/19.jpg",
      "/properties/201-yoder-blvd/20.jpg",
      "/properties/201-yoder-blvd/21.jpg",
      "/properties/201-yoder-blvd/22.jpg",
      "/properties/201-yoder-blvd/23.jpg",
      "/properties/201-yoder-blvd/24.jpg",
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
    blurb:
      "A tidy bungalow on a quiet, sidewalk-lined street in Avon Lake. The kitchen has been renovated — white cabinets with brass hardware, stone counters, a glossy tile backsplash, a sage-green island, and stainless appliances — and a wide picture window fills the living room with light. Three bedrooms across 1,580 square feet, two on the first floor and one upstairs, plus two full baths. There's a three-seasons room off the back, a finished basement with a cedar accent wall, and a two-car garage behind the yard. Best of all, residents have access to Vineyard Beach — a members-only private beach with a park above it and stairs leading down to the Lake Erie shoreline.",
    photo: "/properties/187-sunset-rd/01.jpg",
    photoCaption: "The front of the home.",
    gallery: [
      { src: "/properties/187-sunset-rd/02.jpg", caption: "The kitchen." },
      "/properties/187-sunset-rd/03.jpg",
      "/properties/187-sunset-rd/04.jpg",
      {
        src: "/properties/187-sunset-rd/05.jpg",
        caption: "The living room, looking into the kitchen.",
      },
      {
        src: "/properties/187-sunset-rd/06.jpg",
        caption: "The first-floor full bath.",
      },
      {
        src: "/properties/187-sunset-rd/07.jpg",
        caption: "The first of two first-floor bedrooms.",
      },
      {
        src: "/properties/187-sunset-rd/08.jpg",
        caption: "The second first-floor bedroom.",
      },
      {
        src: "/properties/187-sunset-rd/09.jpg",
        caption: "The upstairs bedroom, on the north side.",
      },
      {
        src: "/properties/187-sunset-rd/10.jpg",
        caption: "The second-floor bathroom.",
      },
      {
        src: "/properties/187-sunset-rd/11.jpg",
        caption: "The second-floor vanity.",
      },
      {
        src: "/properties/187-sunset-rd/12.jpg",
        caption: "The three-seasons room.",
      },
      {
        src: "/properties/187-sunset-rd/13.jpg",
        caption: "The finished basement.",
      },
      {
        src: "/properties/187-sunset-rd/14.png",
        caption: "The finished basement, with its cedar accent wall.",
      },
      {
        src: "/properties/187-sunset-rd/15.jpg",
        caption: "The backyard and two-car garage.",
      },
      {
        src: "/properties/187-sunset-rd/16.png",
        caption:
          "The park above the private beach, looking out over Lake Erie.",
      },
      {
        src: "/properties/187-sunset-rd/17.png",
        caption: "The shoreline at Vineyard Beach.",
      },
      {
        src: "/properties/187-sunset-rd/18.mp4",
        caption: "A walk down to the private beach at Vineyard Beach.",
        // Poster keeps the 37 MB clip from loading until play is pressed.
        poster: "/properties/187-sunset-rd/17.png",
      },
    ],
    communityFeatures: ["Private Beach Access", "Lakefront Park"],
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
    blurb:
      "An easy-living ranch tucked onto a quiet Strongsville street. Everything is on one floor — three bedrooms and two full baths across 1,800 square feet — with an attached two-car garage, a wide driveway with room to turn around, and tall shade trees over a generous lawn. The home sits in the Meadowood Association, so residents get the community amenities on Gate Post Road: an Olympic-size pool and a wading pool with a spray fountain, a clubhouse, a playground, courts lined for tennis and pickleball, and a basketball court. Close to Strongsville's parks, schools, and the shops along Pearl Road.",
    photo:
      "https://photos.zillowstatic.com/fp/92ad25a7e0140677cef4cd7b58ab5ae3-cc_ft_960.jpg",
    communityFeatures: [
      "Pool",
      "Wading Pool",
      "Clubhouse",
      "Playground",
      "Tennis & Pickleball",
      "Basketball Court",
    ],
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
    blurb:
      "A sage-green Cape Cod with a red front door and dormer windows, set back behind a deep front lawn in Bay Village. The kitchen is fully renovated — shaker cabinets with brass hardware, granite counters, a picket-tile backsplash, and new stainless appliances — and a slider opens onto the back deck and fenced yard. Three bedrooms, two full baths, wide-plank flooring throughout, and a detached garage. Cahoon Memorial Park and Huntington Beach are both minutes away.",
    photo: "/properties/514-cahoon-rd/01.jpg",
    gallery: [
      "/properties/514-cahoon-rd/02.jpg",
      "/properties/514-cahoon-rd/03.jpg",
      "/properties/514-cahoon-rd/04.jpg",
      "/properties/514-cahoon-rd/05.jpg",
      "/properties/514-cahoon-rd/06.jpg",
      "/properties/514-cahoon-rd/07.jpg",
      "/properties/514-cahoon-rd/08.jpg",
      "/properties/514-cahoon-rd/09.jpg",
      "/properties/514-cahoon-rd/10.jpg",
      "/properties/514-cahoon-rd/11.jpg",
      "/properties/514-cahoon-rd/12.jpg",
      "/properties/514-cahoon-rd/13.jpg",
      "/properties/514-cahoon-rd/14.jpg",
      "/properties/514-cahoon-rd/15.jpg",
    ],
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
    blurb:
      "A classic red-brick Cape Cod on one of Bay Village's shaded, tree-lined streets, with a covered front porch built for morning coffee. The kitchen has been fully renovated — sage-green cabinetry with brass hardware, quartz counters, a vertical tile backsplash, stainless appliances, a peninsula with seating, and a marble checkerboard floor. Refinished hardwood runs through the living and dining rooms, joined by an arched doorway, and both full baths have been redone: one in sage with a marble vanity and basketweave tile, the other tucked under the eaves with a fluted vanity and herringbone floor. Three bedrooms, a finished room upstairs under the eaves, and a finished lower level with laundry. Blue shutters, a fenced backyard, a detached garage, and a broad lawn under mature maples — with Bay Village schools, Huntington Beach, and the Metroparks close by.",
    photo: "/properties/526-huntmere-dr/01.jpg",
    photoCaption:
      "The front of the home, with its covered porch and drive to the garage.",
    gallery: [
      {
        src: "/properties/526-huntmere-dr/02.jpg",
        caption: "The renovated kitchen, from the living room.",
      },
      {
        src: "/properties/526-huntmere-dr/03.jpg",
        caption: "Sage cabinetry, quartz counters, and stainless appliances.",
      },
      {
        src: "/properties/526-huntmere-dr/04.jpg",
        caption: "The peninsula seating and marble checkerboard floor.",
      },
      {
        src: "/properties/526-huntmere-dr/05.jpg",
        caption:
          "The sink runs under a window, with full-height pantry cabinets opposite.",
      },
      {
        src: "/properties/526-huntmere-dr/06.jpg",
        caption: "The living room, with refinished hardwood throughout.",
      },
      {
        src: "/properties/526-huntmere-dr/07.jpg",
        caption:
          "The living room, digitally furnished to show one way the space can be laid out.",
      },
      {
        src: "/properties/526-huntmere-dr/08.jpg",
        caption: "The dining room, through the arched doorway.",
      },
      {
        src: "/properties/526-huntmere-dr/09.jpg",
        caption: "Built-in shelving and a peg rail at the stair landing.",
      },
      {
        src: "/properties/526-huntmere-dr/10.jpg",
        caption: "The hallway, with closets and stairs to the upper floor.",
      },
      {
        src: "/properties/526-huntmere-dr/11.jpg",
        caption: "A bedroom with refinished hardwood.",
      },
      {
        src: "/properties/526-huntmere-dr/12.jpg",
        caption: "A second bedroom, facing the back of the lot.",
      },
      {
        src: "/properties/526-huntmere-dr/13.jpg",
        caption: "A third bedroom.",
      },
      {
        src: "/properties/526-huntmere-dr/14.jpg",
        caption: "The finished room upstairs, under the eaves.",
      },
      {
        src: "/properties/526-huntmere-dr/15.jpg",
        caption: "The upstairs landing.",
      },
      {
        src: "/properties/526-huntmere-dr/16.jpg",
        caption:
          "The full bath, with a marble vanity and basketweave tile floor.",
      },
      {
        src: "/properties/526-huntmere-dr/17.jpg",
        caption: "The same bath, looking out to the hallway.",
      },
      {
        src: "/properties/526-huntmere-dr/18.jpg",
        caption: "The second bath, tucked under the eaves.",
      },
      {
        src: "/properties/526-huntmere-dr/19.jpg",
        caption: "Its fluted vanity and herringbone tile floor.",
      },
      {
        src: "/properties/526-huntmere-dr/20.jpg",
        caption: "A finished room in the lower level.",
      },
      {
        src: "/properties/526-huntmere-dr/21.jpg",
        caption: "Another lower-level room, with a closet.",
      },
      {
        src: "/properties/526-huntmere-dr/22.jpg",
        caption: "A third finished space downstairs.",
      },
      {
        src: "/properties/526-huntmere-dr/23.jpg",
        caption: "The laundry room, with washer and dryer and a utility sink.",
      },
    ],
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
  {
    slug: "16461-red-rock-dr",
    address: "16461 S Red Rock Dr",
    city: "Strongsville, OH 44136",
    area: "Strongsville",
    type: "Single Family Contemporary",
    status: "Leased",
    beds: 4,
    baths: 3,
    sqft: 2757,
    built: 1977,
    blurb:
      "A spacious contemporary on the water in Strongsville's Deerfield Lake neighborhood. Four bedrooms upstairs including a 17x14 primary, a first-floor office, separate living and family rooms, a wood-burning fireplace, and first-floor laundry. Brick archway entry, an attached three-car garage, and a third of an acre backing onto the lake. Photos here are from the previous listing, before our updates.",
    photo: "/properties/16461-red-rock-dr/01.jpg",
    gallery: [
      "/properties/16461-red-rock-dr/02.jpg",
      "/properties/16461-red-rock-dr/03.jpg",
      "/properties/16461-red-rock-dr/04.jpg",
      "/properties/16461-red-rock-dr/05.jpg",
      "/properties/16461-red-rock-dr/06.jpg",
      "/properties/16461-red-rock-dr/07.jpg",
      "/properties/16461-red-rock-dr/08.jpg",
      "/properties/16461-red-rock-dr/09.jpg",
      "/properties/16461-red-rock-dr/10.jpg",
      "/properties/16461-red-rock-dr/11.jpg",
      "/properties/16461-red-rock-dr/12.jpg",
      "/properties/16461-red-rock-dr/13.jpg",
      "/properties/16461-red-rock-dr/14.jpg",
      "/properties/16461-red-rock-dr/15.jpg",
      "/properties/16461-red-rock-dr/16.jpg",
      "/properties/16461-red-rock-dr/17.jpg",
      "/properties/16461-red-rock-dr/18.jpg",
      "/properties/16461-red-rock-dr/19.jpg",
      "/properties/16461-red-rock-dr/20.jpg",
      "/properties/16461-red-rock-dr/21.jpg",
      "/properties/16461-red-rock-dr/22.jpg",
      "/properties/16461-red-rock-dr/23.jpg",
      "/properties/16461-red-rock-dr/24.jpg",
    ],
    communityFeatures: [
      "Lakefront",
      "Fishing",
      "Pool",
      "Tennis Courts",
      "Clubhouse",
      "Playground",
    ],
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

/** Hero photo first, followed by any additional gallery photos and videos. */
export function propertyMedia(p: Property): PropertyMedia[] {
  return [
    { src: p.photo, caption: p.photoCaption },
    ...(p.gallery ?? []).map((item) =>
      typeof item === "string" ? { src: item } : item,
    ),
  ];
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
