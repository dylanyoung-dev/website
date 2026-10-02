import { Metadata } from "next";
import { AppGrid } from "@/components/apps";
import { InsightsHero } from "@/components/insights";
import { Layout } from "@/components/ui/Layout/Layout";

export const metadata: Metadata = {
  title: "Dylan Young: Projects & Apps",
  description:
    "Proof of concepts and products built by Dylan Young—AI tools, automation platforms, and developer experiments.",
};

export default function AppsPage() {
  return (
    <Layout
      metaTitle="Dylan Young: Projects & Apps"
      metaDescription="Proof of concepts and products—AI tools, automation platforms, and developer experiments."
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          eyebrow="Projects"
          title="Apps & experiments"
          description={`Side projects, proofs of concept, and products in motion—including ContextCache, memory and automation for AI agents.`}
          showSearch={false}
          showCategoryFilters={false}
        />

        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          <AppGrid />
        </div>
      </section>
    </Layout>
  );
}
