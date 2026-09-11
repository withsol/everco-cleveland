import type { Metadata } from "next";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "For Residents",
  description:
    "Current Ever Company residents: how to reach us, request maintenance, and ask about your lease or renewal. Email hello@theevercocleveland.com and you'll hear from Kelsey or Todd.",
};

const residentTopics = [
  {
    title: "Something needs fixing",
    body: "Email us with a photo and a good time to come by. Todd handles most repairs himself and we get to them quickly — Ohio law gives us 30 days, but that's not how we work.",
  },
  {
    title: "Rent & lease questions",
    body: "Payment, renewals, a copy of your lease, adding a pet, a roommate change — just ask. We'd rather have the conversation than send you a form.",
  },
  {
    title: "Moving on, or moving up",
    body: "Notice periods, walk-throughs, deposit returns — and if you need a different house, tell us. We may have one coming that hasn't been listed yet.",
  },
];

export default function TenantPage() {
  return (
    <>
      <section className="bg-forest text-cream">
        <Container className="py-24 sm:py-32">
          <div className="max-w-2xl">
            <Eyebrow className="text-copper-light">For residents</Eyebrow>
            <h1 className="text-cream mt-6 text-5xl leading-tight sm:text-6xl">
              Welcome home,
              <br />
              residents.
            </h1>
            <p className="text-cream/75 mt-7 max-w-xl text-lg leading-relaxed">
              We keep this simple: email us. There&apos;s no ticket queue and no
              call center — your message goes straight to Kelsey and Todd, and
              one of us will get back to you, usually the same day.
            </p>
            <div className="mt-10">
              <ButtonLink
                href="mailto:hello@theevercocleveland.com"
                className="bg-copper hover:bg-copper-light"
              >
                hello@theevercocleveland.com
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {residentTopics.map((topic) => (
              <div
                key={topic.title}
                className="border-cream-deep bg-paper rounded-2xl border p-8"
              >
                <h2 className="text-forest text-xl">{topic.title}</h2>
                <p className="text-charcoal-soft mt-3 leading-relaxed">
                  {topic.body}
                </p>
              </div>
            ))}
          </div>

          <div className="border-cream-deep mt-16 flex flex-col items-start gap-6 border-t pt-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h2 className="text-forest text-2xl">Urgent repair?</h2>
              <p className="text-charcoal-soft mt-2 leading-relaxed">
                Put &ldquo;urgent&rdquo; in the subject line and we&apos;ll
                treat it that way. For a fire, gas leak, or medical emergency,
                call 911 first — then let us know.
              </p>
            </div>
            <a
              href="mailto:hello@theevercocleveland.com?subject=Urgent"
              className="text-forest hover:text-copper shrink-0 font-serif text-2xl transition-colors"
            >
              Email us →
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
