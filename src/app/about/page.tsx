import type { Metadata } from "next";
import Image from "next/image";
import { Container, Eyebrow, Section, ButtonLink } from "@/components/ui";
import { testimonials } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Kelsey and Todd Kerslake are fifth-generation Clevelanders who founded The Ever Company in 2023. Meet the family behind our rental homes in Rocky River, Bay Village, Avon Lake, and Strongsville.",
};

/**
 * Family photos for the story section. Drop the files in `public/about/` and
 * add them here — each entry renders in place of the gradient placeholder.
 */
const familyPhotos: { src: string; alt: string }[] = [];

/** Portrait slot at the top of the page, with a gradient fallback. */
function PhotoSlot({
  photo,
  className,
  gradient,
}: {
  photo?: { src: string; alt: string };
  className: string;
  gradient: string;
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
      <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
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
    body: "We live here. When you email, Kelsey or Todd reads it. When something breaks, Todd usually turns up himself. There's no call center between you and the people who own the house.",
  },
  {
    title: "Invested in Cleveland",
    body: "Both of our families have been in this area for five generations, and we love the Great Lakes. Every home we buy is one we're proud to have on the street we're raising our kids on.",
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
                We&apos;re Kelsey and Todd Kerslake. The Ever Company is our
                family business — founded in 2023, run from our kitchen table in
                the Cleveland area, and named for the kind of home we want every
                resident to have: your forever home, for now.
              </p>
            </div>
            <PhotoSlot
              photo={familyPhotos[0]}
              className="aspect-[4/5]"
              gradient="linear-gradient(150deg, #3a5142 0%, #2f4636 45%, #20322a 100%)"
            />
          </div>
        </Container>
      </section>

      {/* The family */}
      <Section className="bg-paper">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
            <PhotoSlot
              photo={familyPhotos[1]}
              className="aspect-[4/3]"
              gradient="linear-gradient(150deg, #c79a5e 0%, #b08542 50%, #7a5a34 100%)"
            />
            <div>
              <Eyebrow>The family</Eyebrow>
              <h2 className="text-forest mt-5 text-4xl sm:text-5xl">
                Why we started this.
              </h2>
              <div className="text-charcoal-soft mt-6 space-y-5 text-lg leading-relaxed">
                <p>
                  Our great-great-grandparents were from here. Both of our
                  families go back five generations in the Cleveland area, and
                  neither of us has ever really wanted to leave — we love the
                  Great Lakes, and we wanted to invest in the city we call home.
                </p>
                <p>
                  In 2023 we started The Ever Company because we needed our lives
                  to look different. Both of our kids are special needs, and
                  building something of our own gave our family the freedom and
                  flexibility we couldn&apos;t find anywhere else. Kelsey&apos;s
                  parents, Greg and family, help us keep the whole thing running.
                </p>
                <p>
                  So when you rent from us, you&apos;re renting from a family. We
                  live locally, we answer our own email, and we take care of
                  these houses the way we take care of our own.
                </p>
              </div>
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
                Todd spent his career as a Director of Supply Chain, which is a
                formal way of saying he&apos;s very good at operations, sourcing,
                and managing the moving parts of a project. He handles
                renovations, vendors, and maintenance — and he&apos;s usually the
                one who shows up when something needs fixing.
              </p>
            </div>
            <div>
              <h3 className="text-cream font-serif text-3xl">Kelsey</h3>
              <p className="text-cream/75 mt-4 text-lg leading-relaxed">
                Kelsey has been an entrepreneur for 15 years. She holds an MFA in
                graphic design, owns a design agency, and works as a business
                coach and educator. She handles design, leasing, and the
                resident experience — every home gets an eye for how it actually
                feels to live in.
              </p>
            </div>
          </div>
          <p className="text-cream/70 mt-14 max-w-2xl text-lg leading-relaxed">
            We combined what we&apos;re each good at and built The Ever Company
            around it: homes that are well run and beautifully done.
          </p>
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

      {/* Photo pair */}
      {familyPhotos.length > 2 && (
        <section className="bg-cream">
          <Container className="py-16 sm:py-20">
            <div className="grid gap-8 sm:grid-cols-2">
              <PhotoSlot
                photo={familyPhotos[2]}
                className="aspect-[4/3]"
                gradient="linear-gradient(150deg, #3a5142 0%, #20322a 100%)"
              />
              <PhotoSlot
                photo={familyPhotos[3]}
                className="aspect-[4/3]"
                gradient="linear-gradient(150deg, #c79a5e 0%, #7a5a34 100%)"
              />
            </div>
          </Container>
        </section>
      )}

      {/* Where we are */}
      <Section className="bg-cream">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <Eyebrow>Where we are</Eyebrow>
              <h2 className="text-forest mt-5 text-4xl sm:text-5xl">
                Twelve homes on the west side.
              </h2>
            </div>
            <div className="text-charcoal-soft space-y-5 text-lg leading-relaxed">
              <p>
                We own twelve homes across Rocky River, Bay Village, Avon Lake,
                and Strongsville — mostly single-family houses, plus a duplex in
                Rocky River that we keep fully furnished. We&apos;re actively
                looking to expand into Westlake.
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
