import groq from "groq";
import Image from "next/image";
import { Metadata } from "next";
import { format } from "date-fns";
import { Clock, Calendar } from "lucide-react";
import { Layout } from "@/components/ui/Layout/Layout";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import { Badge } from "@/components/ui/badge";
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
    groq`*[_type == "post" && slug.current == $slug][0]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`,
    { slug }
  );

  return (
    <Layout
      metaTitle={post.title}
      metaDescription={post.excerpt}
      ogPhoto={post.landscapeImageUrl}
      ogUrl={fullPath}
    >
      {/* Hero Image Section - Wider than content */}
      {post.landscapeImage && (
        <div className="w-full max-w-6xl mx-auto mb-8 px-4">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
            <Image
              src={post.landscapeImageUrl}
              alt={post.landscapeImage?.alt ?? post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <article className="max-w-4xl mx-auto">

        {/* Header Section */}
        <header className="mb-4">
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category, index) => (
                <Badge key={index} variant="secondary">
                  {category.title}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
              </time>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime}</span>
              </div>
            )}
          </div>
        </header>

        {/* Content Section */}
        {post.body && (
          <div className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:text-foreground
            prose-h2:!mt-20 prose-h2:!mb-8 prose-h2:first:!mt-0
            prose-h3:!mt-16 prose-h3:!mb-6 prose-h3:first:!mt-0
            prose-h4:!mt-12 prose-h4:!mb-4 prose-h4:first:!mt-0
            prose-h5:!mt-10 prose-h5:!mb-3 prose-h5:first:!mt-0
            prose-h6:!mt-8 prose-h6:!mb-2 prose-h6:first:!mt-0
            prose-p:text-foreground prose-p:leading-relaxed
            prose-a:text-muted-foreground prose-a:no-underline hover:prose-a:text-foreground hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-muted prose-pre:border
            prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
            prose-img:rounded-lg prose-img:shadow-md
            prose-hr:border-border">
            <RenderMarkdown>{post.body}</RenderMarkdown>
          </div>
        )}
      </article>
    </Layout>
  );
}


