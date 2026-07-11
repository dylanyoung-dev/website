import { Metadata } from "next";
import { SeriesPosts } from "@/components/blogs/SeriesPosts/SeriesPosts";
import { InsightsHero } from "@/components/insights";
import { Layout } from "@/components/ui/Layout/Layout";
import { getSeriesBySlug } from "@/services/series.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { getAllSeriesSlugs } = await import("@/services/series.service");
  const slugs = await getAllSeriesSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  return {
    title: `${series.title} | Content Series`,
    description: series.description || "",
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  const description =
    series.description ||
    "Articles in this multi-part series.";

  return (
    <Layout
      metaTitle={series.title}
      metaDescription={series.description || ""}
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          eyebrow="Series"
          title={series.title}
          description={description}
          showSearch={false}
          showCategoryFilters={false}
        />

        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          <SeriesPosts series={series} />
        </div>
      </section>
    </Layout>
  );
}
