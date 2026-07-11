import { Metadata } from "next";
import { SnippetGrid } from "@/components/snippets";
import { InsightsHero } from "@/components/insights";
import { Layout } from "@/components/ui/Layout/Layout";
import { getSnippets } from "@/services/snippet.service";

export const metadata: Metadata = {
  title: "Dylan Young: Code Snippets",
  description:
    "Quick recipes, scripts, and copy-paste solutions—like gists, hosted on dylanyoung.dev.",
};

export default async function SnippetsPage() {
  const snippets = await getSnippets();

  return (
    <Layout
      metaTitle="Dylan Young: Code Snippets"
      metaDescription="Quick recipes, scripts, and copy-paste solutions—like gists, hosted here."
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          eyebrow="Insights"
          title="Code snippets"
          description="Small, shareable bits of code and config—think GitHub Gist, but on my site. Copy, adapt, and go."
          showSearch={false}
          showCategoryFilters={false}
        />

        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          <SnippetGrid snippets={snippets} />
        </div>
      </section>
    </Layout>
  );
}
