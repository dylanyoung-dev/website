import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Clock, Calendar, ArrowLeft, FileText, Sparkles } from "lucide-react";
import { Layout } from "@/components/ui/Layout/Layout";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LatestPosts, ShareButtons } from "@/components/blogs";
import { StructuredData } from "@/components/seo";
import { IPost } from "@/interfaces";
import { formatPublishedDate } from "@/lib/utils";
import { getPostOgImageUrl, postImageUrlProjection } from "@/lib/post-images";
import client from "@/utils/client";

type Props = {
  params: Promise<{ slug: string }>;
};

function toIsoDateString(value: Date | string | undefined): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  return value.toISOString();
}

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
  const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";
  const post: IPost = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{..., ${postImageUrlProjection}}`,
    { slug }
  );

  const postUrl = `${baseUrl}/insights/${slug}`;
  const imageUrl = getPostOgImageUrl(post, `${baseUrl}/images/dylan.jpg`)!;
  const ogImageAlt = post.socialImage?.alt || post.landscapeImage?.alt || post.title;
  const seoTitle = post.metaTitle || post.title;
  const seoDescription = post.metaDescription || post.excerpt;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: post.categories?.map((cat: any) => cat.title).join(", "),
    authors: [{ name: "Dylan Young", url: baseUrl }],
    openGraph: {
      type: "article",
      title: seoTitle,
      description: seoDescription,
      url: postUrl,
      siteName: "Dylan Young",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      publishedTime: toIsoDateString(post.publishedAt),
      modifiedTime: post._updatedAt ?? toIsoDateString(post.publishedAt),
      authors: ["Dylan Young"],
      ...(post.categories && post.categories.length > 0 && {
        section: post.categories[0].title,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
      creator: "@dylanyoung_dev",
    },
    alternates: {
      canonical: post.canonicalUrl || postUrl,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const url = process.env.HOST_URL || "";
  const shortPath = `/insights/${slug}/`;
  const fullPath = `${url}${shortPath}`;

  const post: IPost = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{..., ${postImageUrlProjection}, categories[]->{...}}`,
    { slug }
  );

  const ogImageUrl = getPostOgImageUrl(post);
  const seoTitle = post.metaTitle || post.title;
  const seoDescription = post.metaDescription || post.excerpt;

  const categoryIds = post.categories?.map((cat) => cat._id).filter(Boolean) || [];
  const relatedPosts: IPost[] = categoryIds.length > 0
    ? await client.fetch(
        groq`*[_type == "post" && slug.current != $slug && defined(slug.current) && count(categories[_ref in $categoryIds]) > 0] | order(publishedAt desc)[0...3]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}}`,
        { slug, categoryIds }
      )
    : [];

  const primaryCategorySlug = post.categories?.[0]?.slug?.current;

  return (
    <>
      <StructuredData type="Article" post={post} />
      <Layout
        metaTitle={seoTitle}
        metaDescription={seoDescription}
        ogPhoto={ogImageUrl}
        ogUrl={fullPath}
      >
        <section className="bg-background relative">
          {post.landscapeImage && (
            <div className="container mx-auto px-4 pt-4 mb-8 max-w-6xl">
              <div className="relative w-full h-44 sm:h-52 md:h-56 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={post.landscapeImageUrl}
                  alt={post.landscapeImage?.alt ?? post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1152px) 100vw, 1152px"
                />
              </div>
            </div>
          )}

          <div className={`container mx-auto px-4 pb-12 max-w-4xl ${post.landscapeImage ? "" : "pt-8"}`}>
            <article>
              <header className="mb-8 space-y-6">
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category, index) => (
                      <Badge key={index} variant="secondary" className="text-sm font-medium">
                        {category.title}
                      </Badge>
                    ))}
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 md:gap-6 pt-4 border-t">
                  {formatPublishedDate(post.publishedAt) && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <time
                        dateTime={
                          typeof post.publishedAt === "string"
                            ? post.publishedAt
                            : undefined
                        }
                        className="font-medium"
                      >
                        {formatPublishedDate(post.publishedAt)}
                      </time>
                    </div>
                  )}
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
                  <div className="w-full md:w-auto md:ml-auto pt-2 md:pt-0">
                    <ShareButtons
                      url={fullPath}
                      title={post.title}
                      description={post.excerpt}
                    />
                  </div>
                </div>
              </header>

              <div className="mb-8">
                <Card className="bg-muted/50 border-0">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          AI-Assisted Proofreading
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          All articles on this site are written by me. I use AI tools solely for
                          proofreading and editing assistance to ensure clarity and accuracy.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {post.body && (
                <Card className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <div
                      className="prose prose-lg dark:prose-invert max-w-none
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
                    prose-li:text-foreground"
                    >
                      <RenderMarkdown>{post.body}</RenderMarkdown>
                    </div>
                  </CardContent>
                </Card>
              )}

              <footer className="mt-12 pt-8 border-t space-y-6">
                {post.categories && post.categories.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      Categories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.categories
                        .filter((category) => category?.slug?.current)
                        .map((category, index) => (
                          <Button key={index} variant="outline" size="sm" asChild>
                            <Link href={`/insights/categories/${category.slug.current}`}>
                              {category.title}
                            </Link>
                          </Button>
                        ))}
                    </div>
                  </div>
                )}

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

          {relatedPosts.length > 0 && (
            <div className="container mx-auto px-4 py-12 max-w-6xl border-t">
              <LatestPosts
                posts={relatedPosts}
                title="Related Articles"
                description="More on similar topics"
                showViewAll={false}
                highlightCategorySlug={primaryCategorySlug}
              />
            </div>
          )}
        </section>
      </Layout>
    </>
  );
}
