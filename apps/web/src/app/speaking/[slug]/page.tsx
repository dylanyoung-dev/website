import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  EmailIcon,
  EmailShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "next-share";
import { Layout } from "@/components/ui/Layout/Layout";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import { PostCard } from "@/components/blogs/PostCard/PostCard";
import { IPost } from "@/interfaces";
import { IEngagement } from "@/interfaces/IEngagement";
import { getEngagementBySlug } from "@/services/engagements.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { getAllEngagementSlugs } = await import("@/services/engagements.service");
  const slugs = await getAllEngagementSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const engagement = await getEngagementBySlug(slug);

  return {
    title: engagement.title,
    description: engagement.short_description || "",
    openGraph: {
      title: engagement.title,
      description: engagement.short_description || "",
      images: engagement.thumbnailUrl ? [engagement.thumbnailUrl] : [],
      url: `${process.env.HOST_URL}/speaking/${slug}`,
    },
  };
}

export default async function EngagementPage({ params }: Props) {
  const { slug } = await params;
  const url = process.env.HOST_URL || "";
  const shortPath = `/speaking/${slug}/`;
  const fullPath = `${url}${shortPath}`;

  const engagement = await getEngagementBySlug(slug);

  return (
    <Layout
      metaTitle={engagement.title}
      metaDescription={engagement.short_description}
      ogPhoto={engagement.thumbnailUrl}
      ogUrl={fullPath}
    >
      <section className="bg-background w-full sm:w-md md:w-md lg:w-5xl mb-4">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight mt-2">{engagement.title}</h1>
            {engagement.slides_link && (
              <Link
                href={engagement.slides_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Slides
              </Link>
            )}
            <div className="flex">
              <div className="flex gap-2">
                <TelegramShareButton url={fullPath}>
                  <TelegramIcon size={32} />
                </TelegramShareButton>
                <TwitterShareButton url={fullPath}>
                  <TwitterIcon size={32} />
                </TwitterShareButton>
                <LinkedinShareButton url={fullPath}>
                  <LinkedinIcon size={32} />
                </LinkedinShareButton>
                <EmailShareButton url={fullPath} subject={"Check out this Speaking Engagement"}>
                  <EmailIcon size={32} />
                </EmailShareButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {engagement.thumbnail && (
        <Image
          src={engagement.thumbnailUrl}
          alt={engagement.thumbnail?.alt ?? ""}
          width={1280}
          height={720}
          className="w-full h-auto"
        />
      )}
      <section className="bg-background w-full sm:w-md md:w-md lg:w-5xl mt-4">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {engagement.details && (
              <div className="max-w-3xl">
                <RenderMarkdown>{engagement.details}</RenderMarkdown>
              </div>
            )}
          </div>
          {engagement.posts && engagement.posts.length > 0 && (
            <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
              <div className="space-y-8">
                <div className="flex justify-between">
                  <div className="space-y-5">
                    <div className="space-y-3">
                      <h2 className="text-2xl md:text-3xl font-semibold">Related Content</h2>
                    </div>
                    <p className="text-muted-foreground text-lg md:text-xl">
                      Below is specific curated content related to this speaking engagement.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-12">
                  {engagement.posts.map((post: IPost) => (
                    <PostCard key={post._id} post={post} showCategory={true} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}


