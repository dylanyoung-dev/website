import Link from "next/link";
import { Metadata } from "next";
import { Mic } from "lucide-react";
import { EngagementGrid } from "@/components/engagement";
import { InsightsHero } from "@/components/insights";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/ui/Layout/Layout";
import { getContactRequestHref } from "@/lib/contact-form";
import { getEngagements } from "@/services/engagements.service";

export const metadata: Metadata = {
  title: "Dylan Young: Speaking Engagements",
  description:
    "Conference talks and sessions with slides, recordings, and curated resources on AI, Sitecore, and software development.",
};

export default async function SpeakingPage() {
  const engagements = await getEngagements();

  return (
    <Layout
      metaTitle="Dylan Young: Speaking Engagements"
      metaDescription="Conference talks and sessions with slides, recordings, and curated resources."
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          eyebrow="Speaking"
          title="Talks & sessions"
          description="Event pages with slides, videos, and hand-picked articles."
          showSearch={false}
          showCategoryFilters={false}
          action={
            <Button asChild size="lg" className="shadow-md shadow-primary/20">
              <Link
                href={getContactRequestHref("speaking")}
                className="inline-flex items-center gap-2 no-underline"
              >
                <Mic className="h-4 w-4" aria-hidden />
                Request a speaking engagement
              </Link>
            </Button>
          }
        />

        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          <EngagementGrid engagements={engagements} />
        </div>
      </section>
    </Layout>
  );
}
