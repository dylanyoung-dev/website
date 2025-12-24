import { FiChevronRight } from "react-icons/fi";
import { Layout } from "@/components/ui/Layout/Layout";
import { SeriesList } from "@/components/blogs/SeriesList/SeriesList";
import { ISeries } from "@/interfaces/ISeries";
import { getSeries } from "@/services/series.service";

export const metadata = {
  title: "Dylan Young: My Speaking Engagements",
  description: "",
};

export default async function SeriesListingPage() {
  const seriesList = await getSeries();

  return (
    <Layout metaTitle={`Dylan Young: My Speaking Engagements`} metaDescription="">
      <section className="bg-background relative">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <FiChevronRight className="text-gray-500" />
            <span>Content Series</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-8">
            <div className="flex justify-between">
              <div className="space-y-5">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-semibold">Content Series</h1>
                </div>
                <p className="text-muted-foreground text-lg md:text-xl">
                  This section includes series of articles that are all related to each other by a general purpose or goal. They are not
                  categories, but deeply connected blog posts.
                </p>
              </div>
            </div>
            <SeriesList series={seriesList} />
          </div>
        </div>
      </section>
    </Layout>
  );
}


