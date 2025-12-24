import groq from "groq";
import { FiChevronRight } from "react-icons/fi";
import { CategoryCards, PostCard } from "@/components";
import { Layout } from "@/components/ui/Layout/Layout";
import { ICategory, IPost } from "@/interfaces";
import { getPosts } from "@/services/post.service";
import client from "@/utils/client";

export const metadata = {
  title: "Dylan Young: Blog Content on AI, Sitecore and Typescript/React",
  description: "",
};

export default async function InsightsPage() {
  const paginatedPosts = await getPosts(100);
  const allCategories = await client.fetch(
    groq`*[_type == "articleCategory" && defined(slug.current)]{...}`
  );

  return (
    <Layout
      metaTitle={`Dylan Young: Blog Content on AI, Sitecore and Typescript/React`}
      metaDescription=""
    >
      <section className="bg-background relative">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <FiChevronRight className="text-gray-500" />
            <span>Insights</span>
          </nav>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-8">
            <div className="flex justify-between">
              <div className="space-y-5">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-semibold">Insights</h1>
                </div>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Below is the latest published content. I cover anything and everything that I love, which includes topics that are new and
                  exciting including AI/ML, CI/CD and Infrastructure.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
              {paginatedPosts.map((post: IPost) => (
                <PostCard key={post._id} post={post} showCategory={true} />
              ))}
            </div>
          </div>
        </div>

        <CategoryCards categories={allCategories} />
      </section>
    </Layout>
  );
}


