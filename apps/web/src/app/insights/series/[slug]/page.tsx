import { Metadata } from "next";
import { Layout } from "@/components/ui/Layout/Layout";
import { SeriesPosts } from "@/components/blogs/SeriesPosts/SeriesPosts";
import { ISeries } from "@/interfaces/ISeries";
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
    title: `Insights Content - ${series.title}`,
    description: series.description || "",
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const url = process.env.HOST_URL || "";
  const series = await getSeriesBySlug(slug);

  return (
    <Layout metaTitle={`Insights Content`} metaDescription="">
      <SeriesPosts series={series} />
    </Layout>
  );
}


