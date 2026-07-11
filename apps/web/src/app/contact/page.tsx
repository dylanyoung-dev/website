import { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms";
import { InsightsHero } from "@/components/insights";
import { Layout } from "@/components/ui/Layout/Layout";
import { getContactRequestTypeFromParam } from "@/lib/contact-form";

export const metadata: Metadata = {
  title: "Dylan Young: Contact",
  description:
    "Get in touch about speaking engagements, sponsorships, project help, or just to say hello.",
};

type Props = {
  searchParams: Promise<{ request?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultRequestType = getContactRequestTypeFromParam(params.request);

  return (
    <Layout
      metaTitle="Dylan Young: Contact"
      metaDescription="Get in touch about speaking engagements, sponsorships, project help, or just to say hello."
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          eyebrow="Contact"
          title="Get in touch"
          description="Interested in speaking, sponsorship, help with a Sitecore or AI project, or just want to connect? Send a message and I'll get back to you."
          showSearch={false}
          showCategoryFilters={false}
        />

        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="mx-auto max-w-2xl">
            <Suspense fallback={null}>
              <ContactForm defaultRequestType={defaultRequestType} />
            </Suspense>
          </div>
        </div>
      </section>
    </Layout>
  );
}
