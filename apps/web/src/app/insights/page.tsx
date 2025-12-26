import groq from "groq";
import Link from "next/link";
import { Metadata } from "next";
import { ChevronRight, FileText, Rss } from "lucide-react";
import { CategoryCards, PostCard } from "@/components";
import { Layout } from "@/components/ui/Layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { ICategory, IPost } from "@/interfaces";
import { getPaginatedPosts, getTotalPostCount } from "@/services/post.service";
import client from "@/utils/client";

const POSTS_PER_PAGE = 12;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const totalPosts = await getTotalPostCount();
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const baseUrl = process.env.HOST_URL || "";
  const insightsUrl = `${baseUrl}/insights`;

  const prevUrl = page > 1 
    ? (page === 2 ? insightsUrl : `${insightsUrl}?page=${page - 1}`)
    : null;
  const nextUrl = page < totalPages 
    ? `${insightsUrl}?page=${page + 1}`
    : null;

  const metadata: Metadata = {
    title: page === 1
      ? "Dylan Young: Blog Content on AI, Sitecore and Typescript/React"
      : `Dylan Young: Blog Content - Page ${page}`,
    description: "Explore blog posts and articles covering AI/ML, Sitecore, TypeScript, React, and more",
    alternates: {
      canonical: page === 1 ? insightsUrl : `${insightsUrl}?page=${page}`,
      types: {
        'application/rss+xml': [{ url: `${baseUrl}/feed.xml`, title: 'Dylan Young RSS Feed' }],
      },
    },
  };

  return metadata;
}

export default async function InsightsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  
  const [paginatedPosts, totalPosts, allCategories] = await Promise.all([
    getPaginatedPosts(currentPage, POSTS_PER_PAGE),
    getTotalPostCount(),
    client.fetch(groq`*[_type == "articleCategory" && defined(slug.current)]{...}`),
  ]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const baseUrl = "/insights";

  return (
    <Layout
      metaTitle={`Dylan Young: Blog Content on AI, Sitecore and Typescript/React`}
      metaDescription="Explore blog posts and articles covering AI/ML, Sitecore, TypeScript, React, and more"
    >
      <section className="bg-background relative">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="hover:underline text-muted-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">Insights</span>
          </nav>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/5 flex-shrink-0 mt-1">
                <FileText className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground">
                      Insights
                    </h1>
                    <Badge variant="secondary" className="text-xs font-normal">
                      <FileText className="h-3 w-3 mr-1" />
                      {totalPosts} {totalPosts === 1 ? 'Post' : 'Posts'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                      Below is the latest published content. I cover anything and everything that I love, which includes topics that are new and
                      exciting including AI/ML, CI/CD and Infrastructure.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="flex-shrink-0"
                    >
                      <Link href="/feed.xml" className="flex items-center gap-2">
                        <Rss className="h-4 w-4" />
                        RSS Feed
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="container mx-auto px-4 pb-8 md:pb-12 max-w-6xl border-t">
          <div className="space-y-6 pt-8">
            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedPosts.map((post: IPost) => (
                    <PostCard key={post._id} post={post} showCategory={true} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="pt-8 border-t">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      baseUrl={baseUrl}
                    />
                  </div>
                )}
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
                    <h3 className="text-lg font-semibold">No posts available yet</h3>
                    <p className="text-muted-foreground text-sm">
                      Check back later for new content.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Categories Section */}
        {allCategories && allCategories.length > 0 && (
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl border-t">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-semibold">Explore by Category</h2>
                <p className="text-muted-foreground text-sm">
                  Browse content organized by topic
                </p>
              </div>
              <CategoryCards categories={allCategories} />
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}


