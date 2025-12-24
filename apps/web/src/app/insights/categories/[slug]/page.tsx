import groq from "groq";
import { Metadata } from "next";
import { FiChevronRight } from "react-icons/fi";
import { Layout } from "@/components/ui/Layout/Layout";
import { PostCard } from "@/components/blogs/PostCard/PostCard";
import { ICategory, IPost } from "@/interfaces";
import client from "@/utils/client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const paths = await client.fetch(
    groq`*[_type == "articleCategory" && defined(slug.current)][].slug.current`
  );

  return paths.map((slug: string) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category: ICategory = await client.fetch(
    groq`*[_type=="articleCategory" && slug.current == $slug][0]{..., 'slug':slug.current}`,
    { slug }
  );

  return {
    title: `Dylan Young: ${category.title} blog information`,
    description: category.description || "",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const url = process.env.HOST_URL || "";

  const posts: IPost[] = await client.fetch(
    groq`*[_type == "post" && references(*[_type=="articleCategory" && slug.current == $slug]._id)] | order(publishedAt desc){..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`,
    { slug }
  );

  const category: ICategory = await client.fetch(
    groq`*[_type=="articleCategory" && slug.current == $slug][0]{..., 'slug':slug.current}`,
    { slug }
  );

  return (
    <Layout
      metaTitle={`Dylan Young: ${category.title} blog information`}
      metaDescription=""
    >
      <section className="bg-background relative">
        <section className="bg-background">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-2 text-sm">
              <a href="/" className="hover:underline">Home</a>
              <FiChevronRight className="text-gray-500" />
              <span>{category.title}</span>
            </nav>
          </div>
        </section>

        <section className="bg-background">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="space-y-8">
              <div className="flex justify-between">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <h1 className="text-2xl md:text-3xl font-semibold">{category.title}</h1>
                  </div>
                  <p className="text-muted-foreground text-lg md:text-xl">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
                {posts.map((post: IPost) => (
                  <PostCard key={post._id} post={post} showCategory={false} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </Layout>
  );
}


