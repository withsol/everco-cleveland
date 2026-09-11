import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, Section, ButtonLink } from "@/components/ui";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The Ever Company is a family-owned business founded in 2023 by a fifth-generation Cleveland family. Meet the family and team behind our rental homes in Rocky River, Bay Village, Avon Lake, and Strongsville.",
};

type Photo = { src: string; alt: string; position?: string };

/** Family photos used across the story sections. */
const kelseyAndTodd: Photo = {
  src: "/about/kelsey-and-todd.jpg",
  alt: "Kelsey and Todd, the couple behind The Ever Company",
  // Tall phone portrait — bias the crop upward so both faces stay in frame.
  position: "50% 30%",
};

const threeGenerations: Photo = {
  src: "/about/family-three-generations.jpg",
  alt: "Three generations of the family behind The Ever Company together",
};

const familyOnTheWater: Photo = {
  src: "/about/family-on-the-water.jpg",
  alt: "Kelsey and Todd with their two boys on the water",
  position: "50% 35%",
};

/** Photo slot that falls back to a gradient block if the file is missing. */
function PhotoSlot({
  photo,
  className,
  gradient,
  sizes = "(min-width: 1024px) 45vw, 100vw",
}: {
  photo?: Photo;
  className: string;
  gradient: string;
  sizes?: string;
}) {
  if (!photo) {
    return (
      <div
        className={`rounded-2xl ${className}`}
        style={{ background: gradient }}
        aria-hidden
      />
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
    </div>
  );
}

const values = [
  {
    title: "A home, not a unit",
    body: "We specialize in creating beautiful rental homes that feel like forever homes — even when the season of life is temporary. Renovated kitchens, cared-for yards, and the small details that make a house feel settled.",
  },
  {
    title: "You'll be speaking with us",
    body: "We live here, and we run this business locally. You'll hear from Kelsey or Todd directly, and from the team who works alongside us — never a call center in another state.",
  },
  {
    title: "Invested in Cleveland",
    body: "Both of our families go back five generations in the Cleveland area. We love the Great Lakes, and we wanted to invest in the city we call home — every house we buy is one we're proud to have on the street.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="bg-cream">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <Eyebrow>Our story</Eyebrow>
              <h1 className="text-forest mt-6 text-5xl leading-tight sm:text-6xl">
                A Cleveland family,
                <br />
                five generations in.
              </h1>
              <p className="text-charcoal-soft mt-7 max-w-xl text-lg leading-relaxed">
                We&apos;re Kelsey and Todd. The Ever Company is our family
                business — founded in 2023, owned and run locally here in the
                Cleveland area, and named for the kind of home we want every
                resident to have: your forever home, for now.
              </p>
            </div>
            <PhotoSlot
              photo={kelseyAndTodd}
              className="aspect-[3/4]"
              gradient="linear-gradient(150deg, #3a5142 0%, #2f4636 45%, #20322a 100%)"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </div>
        </Container>
      </section>

      {/* The family */}
      <Section className="bg-paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <PhotoSlot
              photo={threeGenerations}
              className="aspect-square"
              gradient="linear-gradient(150deg, #c79a5e 0%, #b08542 50%, #7a5a34 100%)"
            />
            <div className="text-charcoal-soft space-y-5 text-lg leading-relaxed">
              <p>
                Both sides of our families go back five generations in the
                Cleveland area. We love the Great Lakes, and we wanted to invest
                in the city we love and call home.
              </p>
              <p>
                The Ever Company is a genuine family business, with our parents
                alongside us helping keep the whole thing running. We started
                The Ever Company in 2023 and brought our mutual experience
                together, building a business that could support our family and
                the community for generations. Building this together gave us
                the freedom and flexibility we were looking for as our family
                grew and we needed to manage special needs children and health
                concerns.
              </p>
              <p>
                So when you rent from us, you&apos;re renting from a family that
                lives here, loves these neighborhoods, and takes care of these
                houses the way we take care of our own.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Kelsey & Todd */}
      <section className="bg-forest text-cream">
        <Container className="py-20 sm:py-28">
          <div className="max-w-2xl">
            <Eyebrow className="text-copper-light">Who you&apos;ll be working with</Eyebrow>
            <h2 className="text-cream mt-5 text-4xl">
              Two very different skill sets.
            </h2>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="text-cream font-serif text-3xl">Todd</h3>
              <p className="text-cream/75 mt-4 text-lg leading-relaxed">
                Todd spent his career as a Director of Supply Chain — operations,
                sourcing, and keeping the moving parts of complex projects on
                track. He leads renovations, vendor relationships, and
                maintenance, and he handles repairs personally.
              </p>
            </div>
            <div>
              <h3 className="text-cream font-serif text-3xl">Kelsey</h3>
              <p className="text-cream/75 mt-4 text-lg leading-relaxed">
                Kelsey has been an entrepreneur for 15 years. She holds an MFA in
                graphic design, previously owned a design agency, and works as a
                business coach and educator. She leads design, leasing, and the
                resident experience — every home gets a designer&apos;s eye for
                how it actually feels to live in.
              </p>
            </div>
          </div>
          <div className="border-cream/15 mt-14 grid gap-10 border-t pt-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <h3 className="text-cream font-serif text-3xl">
              And the team behind us
            </h3>
            <div className="text-cream/75 space-y-5 text-lg leading-relaxed">
              <p>
                The Ever Company is owned by our family, with our parents
                alongside us as owners and involved in running it day to day. We
                combined what each of us is good at and built the company around
                it: homes that are well run and beautifully done.
              </p>
              <p>
                We also work with a small team that keeps everything moving —
                trusted contractors and trades we&apos;ve worked with for years,
                and an executive assistant who handles applications, processing,
                and scheduling. So you might also work with other members of our
                team along the way, and they&apos;ll take just as good care of
                you.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <Section className="bg-paper">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>What we believe</Eyebrow>
            <h2 className="text-forest mt-5 text-4xl sm:text-5xl">
              The values behind every lease.
            </h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {values.map((value, i) => (
              <div key={value.title}>
                <span className="text-copper font-serif text-5xl">
                  0{i + 1}
                </span>
                <h3 className="text-forest mt-4 text-2xl">{value.title}</h3>
                <p className="text-charcoal-soft mt-3 leading-relaxed">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Family feature photo */}
      <section className="bg-cream">
        <Container className="py-16 sm:py-20">
          <div className="grid items-center gap-10 sm:grid-cols-[1fr_1.1fr] sm:gap-14">
            <PhotoSlot
              photo={familyOnTheWater}
              className="aspect-[3/4]"
              gradient="linear-gradient(150deg, #3a5142 0%, #20322a 100%)"
              sizes="(min-width: 640px) 42vw, 100vw"
            />
            <figcaption className="text-charcoal-soft text-lg leading-relaxed">
              <span className="text-forest font-serif text-3xl leading-tight">
                Family first — that was the whole point.
              </span>
              <p className="mt-5">
                We built this company so our family could be together more, and
                that shapes how we run it. We think it also makes us better at
                this: we know what it takes for a house to work for a real
                family, because we&apos;re raising ours a few streets over.
              </p>
            </figcaption>
          </div>
        </Container>
      </section>

      {/* Where we are */}
      <Section className="bg-cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow>Where we are</Eyebrow>
              <h2 className="text-forest mt-5 text-4xl sm:text-5xl">
                Thirteen homes, and counting.
              </h2>
            </div>
            <div className="text-charcoal-soft space-y-5 text-lg leading-relaxed">
              <p>
                We own thirteen homes across Rocky River, Bay Village, Avon
                Lake, and Strongsville — mostly single-family houses, plus a
                duplex in Rocky River whose two units we keep fully furnished.
                Our newest is in Strongsville and in renovation right now, and
                we&apos;re actively looking to expand into Westlake.
              </p>
              <p>
                We&apos;re always purchasing and renovating, so if you&apos;d
                like to rent from us in the future and nothing is open today,
                reach out anyway. We&apos;ll tell you what&apos;s coming before
                it gets listed.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Reviews */}
      <Section id="reviews" className="bg-paper">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow className="justify-center">Resident reviews</Eyebrow>
            <h2 className="text-forest mt-5 text-4xl sm:text-5xl">
              In our residents&apos; words.
            </h2>
            <p className="text-charcoal-soft mt-5 text-lg">
              From move-out surveys and our public reviews on Furnished Finder
              and Airbnb. Shared with permission.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.quote}
                className="border-cream-deep bg-cream flex flex-col rounded-2xl border p-7"
              >
                <blockquote className="text-charcoal leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-charcoal-soft mt-5 text-sm">
                  <span className="text-forest font-medium">{t.name}</span> ·{" "}
                  {t.detail}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-cream">
        <Container className="text-center">
          <h2 className="text-forest text-4xl sm:text-5xl">
            We&apos;d love to show you around.
          </h2>
          <p className="text-charcoal-soft mx-auto mt-5 max-w-xl text-lg">
            Come see what one of our homes actually feels like — or just say
            hello.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/properties">View available homes</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Get in touch
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
