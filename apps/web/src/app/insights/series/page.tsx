import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";
import { Layout } from "@/components/ui/Layout/Layout";
import { SeriesList } from "@/components/blogs/SeriesList/SeriesList";
import { ISeries } from "@/interfaces/ISeries";
import { getSeries } from "@/services/series.service";

export const metadata = {
  title: "Dylan Young: Content Series",
  description: "Explore curated series of related articles and blog posts",
};

export default async function SeriesListingPage() {
  const seriesList = await getSeries();

  return (
    <Layout metaTitle={`Dylan Young: Content Series`} metaDescription="Explore curated series of related articles and blog posts">
      <section className="bg-background relative">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="hover:underline text-muted-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/insights" className="hover:underline text-muted-foreground">
              Insights
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Content Series</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0 mt-1">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                    Content Series
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
                    Explore curated series of articles that are all related to each other by a general purpose or goal. 
                    These are not categories, but deeply connected blog posts that tell a complete story.
                  </p>
                </div>
              </div>
            </div>
            <SeriesList series={seriesList} />
          </div>
        </div>
      </section>
    </Layout>
  );
}


