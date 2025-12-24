import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { format } from "date-fns";
import { Layout } from "@/components/ui/Layout/Layout";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
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
      <section className="bg-background max-w-4xl mb-4">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight mt-2">{post.title}</h1>
            {post.readingTime && (
              <div className="flex items-center justify-end">
                <span className="text-sm font-semibold text-accent-foreground uppercase">
                  {post.readingTime}
                </span>
              </div>
            )}
            <p>
              <strong>Published</strong>: {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
      </section>

      {post.landscapeImage && (
        <Image
          src={post.landscapeImageUrl}
          alt={post.landscapeImage?.alt ?? ""}
          width={1280}
          height={720}
          className="w-full h-auto"
        />
      )}
      <section className="bg-background max-w-sm md:max-w-lg lg:max-w-4xl mt-4">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {post.body && (
              <div className="max-w-3xl">
                <RenderMarkdown>{post.body}</RenderMarkdown>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}


