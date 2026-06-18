import type { Metadata } from "next";
import { Container, Eyebrow, ButtonLink } from "@/components/ui";
import { PropertiesGrid } from "@/components/properties-grid";
import { properties } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Properties",
  description:
    "Browse furnished and unfurnished rental homes from The Ever Company across Rocky River, Avon Lake, Bay Village, and Strongsville, Ohio.",
};

export default function PropertiesPage() {
  const available = properties.filter((p) => p.status !== "Leased").length;

  return (
    <>
      <section className="bg-cream">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <Eyebrow>The collection</Eyebrow>
            <h1 className="text-forest mt-6 text-5xl sm:text-6xl">
              Find your next home.
            </h1>
            <p className="text-charcoal-soft mt-6 max-w-xl text-lg leading-relaxed">
              Every home in our portfolio has been renovated by our family and
              maintained like it&apos;s our own. Browse the full collection
              across Cleveland&apos;s west side, and ask us about homes coming to
              market soon.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-16 sm:py-20">
        <Container>
          <PropertiesGrid properties={properties} />
        </Container>
      </section>

      <section className="bg-forest text-cream py-20">
        <Container className="text-center">
          <h2 className="text-cream text-3xl sm:text-4xl">
            {available > 0
              ? "Don't see the right fit?"
              : "Every home is currently leased."}
          </h2>
          <p className="text-cream/75 mx-auto mt-4 max-w-xl text-lg">
            We bring new homes to market regularly across Rocky River, Avon
            Lake, Bay Village, and Strongsville. Tell us what you&apos;re looking
            for and we&apos;ll reach out first.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink
              href="/contact"
              className="bg-copper hover:bg-copper-light"
            >
              Join the interest list
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
