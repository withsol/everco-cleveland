export type Testimonial = {
  quote: string;
  /** Attribution line — a first name + last initial, or a location-only label. */
  name: string;
  /** Where they rent (or reviewed) and when — e.g. "Rocky River · 2026". */
  detail: string;
};

/**
 * Real resident feedback. Named quotes are used with permission; the rest are
 * attributed by location and year only. Public-platform reviews keep the name
 * shown on the platform.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "The property felt very homey and we could tell that you care about the condition and state of your rentals.",
    name: "Amanda & Bryant C.",
    detail: "Rocky River · 2026",
  },
  {
    quote:
      "I've had a great experience renting from The Ever Company. They are responsive, fair, and easy to communicate with. Maintenance requests are handled quickly.",
    name: "Cody W.",
    detail: "Avon Lake · 2026",
  },
  {
    quote: "If I could give you a Landlord of the Year award, I would!",
    name: "Bay Village resident",
    detail: "2026",
  },
  {
    quote:
      "Y'all communicate very efficiently and made us feel taken care of if we needed help.",
    name: "Amanda & Bryant C.",
    detail: "Rocky River · 2026",
  },
  {
    quote:
      "When the septic backed up and when the shower door shattered, Todd graciously came over to get things handled in a very efficient manner.",
    name: "Amanda & Bryant C.",
    detail: "Rocky River · 2026",
  },
  {
    quote:
      "Our stay was very comfortable and convenient to our home project in Westlake.",
    name: "Sharon & John M.",
    detail: "Rocky River · 2026",
  },
  {
    quote:
      "Kelsey was amazing and attentive for anything we needed during our stay! The unit was clean and stocked with everything we needed.",
    name: "Ava B.",
    detail: "Furnished Finder review · 2025",
  },
  {
    quote:
      "Loved our stay! The kitchen is spacious and updated. The bedrooms were spacious too. Would definitely stay again!",
    name: "Margaret",
    detail: "Airbnb review · 2025",
  },
  {
    quote:
      "We would love you guys to continue to be our landlords, you've been great!",
    name: "Rocky River resident",
    detail: "2026",
  },
  {
    quote:
      "The yard always looks so nice, thank you for taking care of it! We appreciate it.",
    name: "Strongsville resident",
    detail: "2026",
  },
];

/** The two quotes that lead the homepage. */
export const featuredTestimonials = testimonials.slice(0, 2);

/**
 * Average across tenant exit surveys plus public reviews on Furnished Finder
 * and Airbnb.
 */
export const averageRating = "4.8";
