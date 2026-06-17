import type { Metadata } from "next";
import { Container, Eyebrow, Section, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Three generations of one Cleveland family restoring west-side homes — our story, our values, and how we renovate.",
};

const values = [
  {
    title: "Restore, don't replace",
    body: "We keep the plaster arches, the leaded glass, the built-ins. Then we quietly modernize everything behind the walls so the house works for how people live now.",
  },
  {
    title: "Treat tenants like neighbors",
    body: "Because most of them are. We live on the west side too. A leak at 9pm gets answered, and a lease renewal is a conversation, not a form letter.",
  },
  {
    title: "Invest in the block",
    body: "A renovated house lifts the whole street. We buy the homes others gave up on and bring them back, one porch and one garden at a time.",
  },
];

const timeline = [
  { year: "1986", text: "Grandpa Ev buys and rehabs his first duplex in Lakewood." },
  { year: "2004", text: "The second generation joins; the portfolio reaches a dozen homes." },
  { year: "2018", text: "We formalize as The Ever Company and bring renovations fully in-house." },
  { year: "2024", text: "Sixty homes restored across six west-side neighborhoods." },
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
                Three generations,
                <br />
                one neighborhood.
              </h1>
              <p className="text-charcoal-soft mt-7 max-w-xl text-lg leading-relaxed">
                The Ever Company started in 1986 when Everett &ldquo;Ev&rdquo; Kowalski
                bought a tired duplex on a Lakewood side street, fixed it up after
                his shifts, and rented it to a young couple who stayed eleven
                years. Nearly four decades later, we&apos;re still doing the same
                thing — just with a bigger family and a few more houses.
              </p>
            </div>
            <div
              className="aspect-[4/5] rounded-2xl"
              style={{
                background:
                  "linear-gradient(150deg, #3a5142 0%, #2f4636 45%, #20322a 100%)",
              }}
              aria-hidden
            />
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

      {/* Renovations */}
      <section className="bg-forest text-cream">
        <Container className="py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div
              className="aspect-[5/4] rounded-2xl"
              style={{
                background:
                  "linear-gradient(150deg, #c79a5e 0%, #b08542 50%, #7a5a34 100%)",
              }}
              aria-hidden
            />
            <div>
              <Eyebrow className="text-copper-light">How we renovate</Eyebrow>
              <h2 className="text-cream mt-5 text-4xl">
                Old bones, new everything.
              </h2>
              <p className="text-cream/75 mt-5 text-lg leading-relaxed">
                Our in-house crew takes most homes down to the studs. New
                electrical, plumbing, insulation, and high-efficiency mechanicals
                go in — then we rebuild the character: refinished hardwood,
                period-correct trim, and kitchens that respect the age of the
                house.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-4 text-sm">
                {[
                  "Full studs-out rehabs",
                  "Energy-efficient systems",
                  "Restored original details",
                  "Permitted & inspected",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="bg-copper-light h-1.5 w-1.5 rounded-full" />
                    <span className="text-cream/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <Section className="bg-cream">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>A short history</Eyebrow>
            <h2 className="text-forest mt-5 text-4xl sm:text-5xl">
              Built slowly, on purpose.
            </h2>
          </div>
          <ol className="mt-14 space-y-0">
            {timeline.map((item) => (
              <li
                key={item.year}
                className="border-cream-deep grid gap-4 border-t py-8 sm:grid-cols-[160px_1fr] sm:gap-12"
              >
                <span className="text-copper font-serif text-3xl">
                  {item.year}
                </span>
                <p className="text-charcoal text-lg leading-relaxed">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* CTA */}
      <Section className="bg-paper">
        <Container className="text-center">
          <h2 className="text-forest text-4xl sm:text-5xl">
            We&apos;d love to show you around.
          </h2>
          <p className="text-charcoal-soft mx-auto mt-5 max-w-xl text-lg">
            Come see what a thoughtfully restored home actually feels like.
          </p>
          <div className="mt-9 flex justify-center gap-4">
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
