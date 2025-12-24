import { FiChevronRight } from "react-icons/fi";
import { Layout } from "@/components/ui/Layout/Layout";
import { EngagementCard } from "@/components/engagement/EngagementCard/EngagementCard";
import { IEngagement } from "@/interfaces/IEngagement";
import { getEngagements } from "@/services/engagements.service";

export const metadata = {
  title: "Dylan Young: My Speaking Engagements",
  description: "",
};

export default async function SpeakingPage() {
  const paginatedSpeakingEngagements = await getEngagements();

  return (
    <Layout metaTitle={`Dylan Young: My Speaking Engagements`} metaDescription="">
      <section className="bg-background relative">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <FiChevronRight className="text-gray-500" />
            <span>My Engagements</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-8">
            <div className="flex justify-between">
              <div className="space-y-5">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-semibold">Speaking Engagements</h1>
                </div>
                <p className="text-muted-foreground text-lg md:text-xl">
                  This includes unique Speaking Engagement pages that has curated content for that specific event. This will likely include
                  the Powerpoint, links to helpful resources and blogs on the topic in the session.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
              {paginatedSpeakingEngagements.map((engagement: IEngagement) => (
                <EngagementCard key={engagement._id} engagement={engagement} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


