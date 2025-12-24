import groq from "groq";
import { MdOutlineWavingHand } from "react-icons/md";
import { PostCard } from "@/components/blogs/PostCard/PostCard";
import Categories from "@/components/blogs/CategoryList/CategoryList";
import { Layout } from "@/components/ui/Layout/Layout";
import { IPost } from "@/interfaces";
import { getPosts } from "@/services/post.service";
import client from "@/utils/client";

export const metadata = {
  title: "Dylan Young: Sitecore Developer - AI/ML, .Net, Python, React, Typescript",
  description: "The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer",
};

export default async function Home() {
  const mostRecentPosts = await getPosts(6);
  const allCategories = await client.fetch(
    groq`*[_type == "articleCategory" && defined(slug.current)]{...}`
  );

  return (
    <Layout
      metaTitle="Dylan Young: Sitecore Developer - AI/ML, .Net, Python, React, Typescript"
      metaDescription="The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer"
    >
      <section className="bg-background relative">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-8 md:space-y-10">
            <div className="space-y-4 md:space-y-5 text-center">
              <h1 className="text-2xl md:text-3xl font-semibold">
                <MdOutlineWavingHand className="inline" /> Hello
              </h1>
              <p className="text-muted-foreground text-center text-xl">
                My name is Dylan Young, and I'm a software engineer and technical influencer. I blog about my passions or my curiousity in
                technology. Here you'll find my thoughts related to Sitecore, AI/ML, .Net, Python, React, and Typescript.
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-8 md:space-y-10">
            <div className="space-y-4 md:space-y-5">
              <h2 className="text-2xl md:text-3xl font-semibold">Latest posts</h2>
              <p className="text-muted-foreground text-lg md:text-xl">
                Check out my latest content across different topics, or use the buttons below to view by category.
              </p>
              {allCategories && <Categories AllCategories={allCategories} />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
              {mostRecentPosts.map((post: IPost) => (
                <PostCard key={post._id} post={post} showCategory={true} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


