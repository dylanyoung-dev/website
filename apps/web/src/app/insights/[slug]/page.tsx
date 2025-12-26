import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { format } from "date-fns";
import { Clock, Calendar, ArrowLeft, ChevronRight, FileText, BookOpen } from "lucide-react";
import { Layout } from "@/components/ui/Layout/Layout";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PostCard } from "@/components/blogs";
import { IPost } from "@/interfaces";
import client from "@/utils/client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return paths.map((slug: string) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: IPost = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`,
    { slug }
  );

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.landscapeImageUrl ? [post.landscapeImageUrl] : [],
      url: `${process.env.HOST_URL}/insights/${slug}`,
    },
    ...(post.canonicalUrl && {
      alternates: {
        canonical: post.canonicalUrl,
      },
    }),
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const url = process.env.HOST_URL || "";
  const shortPath = `/insights/${slug}/`;
  const fullPath = `${url}${shortPath}`;

  const post: IPost = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}}`,
    { slug }
  );

  // Fetch related posts based on shared categories
  const categoryIds = post.categories?.map((cat) => cat._id).filter(Boolean) || [];
  const relatedPosts: IPost[] = categoryIds.length > 0
    ? await client.fetch(
        groq`*[_type == "post" && slug.current != $slug && defined(slug.current) && count(categories[_ref in $categoryIds]) > 0] | order(publishedAt desc)[0...3]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}}`,
        { slug, categoryIds }
      )
    : [];

  return (
    <Layout
      metaTitle={post.title}
      metaDescription={post.excerpt}
      ogPhoto={post.landscapeImageUrl}
      ogUrl={fullPath}
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
            {post.categories && 
             post.categories.length > 0 && 
             post.categories[0]?.slug?.current && (
              <>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Link
                  href={`/insights/categories/${post.categories[0].slug.current}`}
                  className="hover:underline text-muted-foreground"
                >
                  {post.categories[0].title}
                </Link>
              </>
            )}
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium line-clamp-1">{post.title}</span>
          </nav>
        </div>

        {/* Hero Image Section - Full Width */}
        {post.landscapeImage && (
          <div className="w-full mb-8 px-4">
            <Card className="overflow-hidden border-0 shadow-lg max-w-7xl mx-auto">
              <CardContent className="p-0">
                <div className="relative w-full aspect-video bg-muted">
                  <Image
                    src={post.landscapeImageUrl}
                    alt={post.landscapeImage?.alt ?? post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12 max-w-4xl">
          <article>
            {/* Header Section */}
            <header className="mb-8 space-y-6">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-sm font-medium">
                      {category.title}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                {post.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt} className="font-medium">
                    {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
                  </time>
                </div>
                {post.readingTime && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">{post.readingTime}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span className="font-medium">Article</span>
                </div>
              </div>
            </header>

            {/* Content Section */}
            {post.body && (
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-h2:!mt-20 prose-h2:!mb-8 prose-h2:first:!mt-0
                    prose-h3:!mt-16 prose-h3:!mb-6 prose-h3:first:!mt-0
                    prose-h4:!mt-12 prose-h4:!mb-4 prose-h4:first:!mt-0
                    prose-h5:!mt-10 prose-h5:!mb-3 prose-h5:first:!mt-0
                    prose-h6:!mt-8 prose-h6:!mb-2 prose-h6:first:!mt-0
                    prose-p:text-foreground prose-p:leading-relaxed prose-p:text-lg
                    prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 hover:prose-a:underline
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                    prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:pl-6
                    prose-img:rounded-lg prose-img:shadow-md
                    prose-hr:border-border prose-hr:my-12
                    prose-ul:space-y-2 prose-ol:space-y-2
                    prose-li:text-foreground">
                    <RenderMarkdown>{post.body}</RenderMarkdown>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Footer Section */}
            <footer className="mt-12 pt-8 border-t space-y-6">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.categories
                      .filter((category) => category?.slug?.current)
                      .map((category, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={`/insights/categories/${category.slug.current}`}>
                            {category.title}
                          </Link>
                        </Button>
                      ))}
                  </div>
                </div>
              )}

              {/* Back Navigation */}
              <div className="pt-4">
                <Button variant="ghost" asChild>
                  <Link href="/insights" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Insights
                  </Link>
                </Button>
              </div>
            </footer>
          </article>
        </div>

        {/* Related Content Section */}
        {relatedPosts.length > 0 && (
          <div className="container mx-auto px-4 py-12 max-w-6xl border-t">
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-semibold">Related Content</h2>
                </div>
                <p className="text-muted-foreground text-lg">
                  Discover more articles on similar topics
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost._id} post={relatedPost} showCategory={true} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}


