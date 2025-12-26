import groq from "groq";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, ArrowLeft, Tag, FileText } from "lucide-react";
import { Layout } from "@/components/ui/Layout/Layout";
import { PostCard } from "@/components/blogs/PostCard/PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    groq`*[_type == "post" && references(*[_type=="articleCategory" && slug.current == $slug]._id)] | order(publishedAt desc){..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}}`,
    { slug }
  );

  const category: ICategory = await client.fetch(
    groq`*[_type=="articleCategory" && slug.current == $slug][0]{..., 'slug':slug.current}`,
    { slug }
  );

  return (
    <Layout
      metaTitle={`Dylan Young: ${category.title} blog information`}
      metaDescription={category.description || ""}
    >
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
            <span className="text-foreground font-medium">{category.title}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/5 flex-shrink-0 mt-1">
                <Tag className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground">
                      {category.title}
                    </h1>
                    <Badge variant="secondary" className="text-xs font-normal">
                      <FileText className="h-3 w-3 mr-1" />
                      {posts.length} {posts.length === 1 ? 'Post' : 'Posts'}
                    </Badge>
                  </div>
                  {category.description && (
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                      {category.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="container mx-auto px-4 pb-12 max-w-6xl border-t">
          <div className="space-y-6 pt-8">
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post: IPost) => (
                    <PostCard key={post._id} post={post} showCategory={false} />
                  ))}
                </div>
                <div className="pt-4">
                  <Button variant="ghost" asChild>
                    <Link href="/insights" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Back to Insights
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-3 rounded-lg bg-muted">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">No posts in this category yet</h3>
                    <p className="text-muted-foreground text-sm">
                      Check back later for new content in this category.
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" asChild>
                      <Link href="/insights" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Insights
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}


