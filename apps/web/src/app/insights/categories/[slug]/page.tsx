import { Metadata } from "next";
import { LatestPosts } from "@/components/blogs";
import { InsightsHero } from "@/components/insights";
import { Layout } from "@/components/ui/Layout/Layout";
import { ICategory } from "@/interfaces";
import {
  getCategoryBySlug,
  getPostCategories,
  getPostsByCategorySlug,
} from "@/services/post.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getPostCategories();
  return categories.map((category) => ({
    slug: category.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  return {
    title: `Dylan Young: ${category.title} blog information`,
    description: category.description || "",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const [posts, category] = await Promise.all([
    getPostsByCategorySlug(slug),
    getCategoryBySlug(slug),
  ]);

  const description =
    category.description ||
    `Articles and tutorials on ${category.title}.`;

  return (
    <Layout
      metaTitle={`Dylan Young: ${category.title} blog information`}
      metaDescription={category.description || ""}
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          eyebrow="Insights"
          title={category.title}
          description={description}
          showSearch={false}
          showCategoryFilters={false}
        />

        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <LatestPosts
            posts={posts}
            title={`${category.title} Posts`}
            description=""
            showViewAll={false}
            sortLabel="Sorted by newest"
            highlightCategorySlug={slug}
          />
        </div>
      </section>
    </Layout>
  );
}
