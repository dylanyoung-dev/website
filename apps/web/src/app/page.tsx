import { FeaturedPost, LatestPosts } from "@/components/blogs";
import { AwardsSection } from "@/components/home";
import { SubscribeBanner } from "@/components/subscribe";
import { HomeHero, Layout } from "@/components/ui/Layout";
import { getPostCategoriesByPostCount, getPosts } from "@/services/post.service";

const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";

export const metadata = {
  title: "Dylan Young: Sitecore Developer - AI/ML, .Net, Python, React, Typescript",
  description: "The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer. Blog posts about Sitecore, AI/ML, .Net, Python, React, and TypeScript.",
  openGraph: {
    title: "Dylan Young: Sitecore Developer - AI/ML, .Net, Python, React, Typescript",
    description: "The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer",
    url: baseUrl,
    siteName: "Dylan Young",
    images: [
      {
        url: `${baseUrl}/images/dylan.jpg`,
        width: 1200,
        height: 630,
        alt: "Dylan Young",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dylan Young: Sitecore Developer",
    description: "The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer",
    images: [`${baseUrl}/images/dylan.jpg`],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default async function Home() {
  const [mostRecentPosts, allCategories] = await Promise.all([
    getPosts(7),
    getPostCategoriesByPostCount(),
  ]);
  const featuredPost = mostRecentPosts[0];
  const topCategories = allCategories
    .filter((category) => category.postCount > 0)
    .slice(0, 3);

  return (
    <Layout
      metaTitle="Dylan Young: Sitecore Developer - AI/ML, .Net, Python, React, Typescript"
      metaDescription="The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer"
      flushTop
    >
      <section className="bg-background relative">
        <HomeHero categories={topCategories} />

        {/* Posts Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl border-t">
          <div className="space-y-10">
            {featuredPost ? <FeaturedPost post={featuredPost} /> : null}
            <LatestPosts
              posts={mostRecentPosts}
              excludeIds={featuredPost ? [featuredPost._id] : []}
            />
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl border-t">
          <SubscribeBanner />
        </div>

        {/* Awards / Certifications Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl border-t">
          <AwardsSection />
        </div>
      </section>
    </Layout>
  );
}


