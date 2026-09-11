import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "For Residents",
  description:
    "Current Ever Company residents: submit maintenance requests through your resident portal, and find answers on your lease, renewal, and move-out.",
};

const residentTopics = [
  {
    title: "Something needs fixing",
    body: "Submit a request through your maintenance portal and add a photo if you can. Todd handles repairs and usually responds the same day.",
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
              Once you sign your lease and move in, you&apos;ll be given access
              to our maintenance portal, where you can submit requests any time.
              Todd handles repairs and usually responds the same day.
            </p>
            <p className="text-cream/60 mt-6 max-w-xl leading-relaxed">
              Haven&apos;t gotten your portal link yet? Let Todd know and
              he&apos;ll send it right away. It&apos;s also worth checking your
              spam folder — sometimes it lands there.
            </p>
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
                Mark it as urgent in your maintenance request and we&apos;ll
                treat it that way.
              </p>
              <p className="text-charcoal-soft mt-3 leading-relaxed">
                For a fire, gas leak, or medical emergency, call 911 first —
                then let us know.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
