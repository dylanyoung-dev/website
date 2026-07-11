import { Metadata } from "next";
import { SeriesList } from "@/components/blogs/SeriesList/SeriesList";
import { InsightsHero } from "@/components/insights";
import { Layout } from "@/components/ui/Layout/Layout";
import { getSeries } from "@/services/series.service";

export const metadata: Metadata = {
  title: "Dylan Young: Content Series",
  description: "Explore curated series of related articles and blog posts",
};

export default async function SeriesListingPage() {
  const seriesList = await getSeries();

  return (
    <Layout
      metaTitle="Dylan Young: Content Series"
      metaDescription="Explore curated series of related articles and blog posts"
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          eyebrow="Insights"
          title="Content Series"
          description="Multi-part stories and deep dives grouped by theme."
          showSearch={false}
          showCategoryFilters={false}
        />

        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          <SeriesList series={seriesList} />
        </div>
      </section>
    </Layout>
  );
}
