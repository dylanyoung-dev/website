import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import {
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  Mic,
  Presentation,
} from "lucide-react";
import { LatestPosts, ShareButtons } from "@/components/blogs";
import { Layout } from "@/components/ui/Layout/Layout";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";

  return {
    title: engagement.title,
    description: engagement.short_description || "",
    openGraph: {
      type: "article",
      title: engagement.title,
      description: engagement.short_description || "",
      images: engagement.thumbnailUrl ? [engagement.thumbnailUrl] : [],
      url: `${baseUrl}/speaking/${slug}`,
    },
  };
}

export default async function EngagementPage({ params }: Props) {
  const { slug } = await params;
  const url = process.env.HOST_URL || "";
  const shortPath = `/speaking/${slug}/`;
  const fullPath = `${url}${shortPath}`;

  const engagement = await getEngagementBySlug(slug);
  const relatedPosts = engagement.posts ?? [];

  return (
    <Layout
      metaTitle={engagement.title}
      metaDescription={engagement.short_description}
      ogPhoto={engagement.thumbnailUrl}
      ogUrl={fullPath}
    >
      <section className="bg-background relative">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:underline">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href="/speaking" className="text-muted-foreground hover:underline">
              Speaking
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="line-clamp-1 font-medium text-foreground">
              {engagement.title}
            </span>
          </nav>
        </div>

        {engagement.thumbnailUrl && (
          <div className="mb-8 w-full px-4 md:px-8 lg:px-12">
            <Card className="mx-auto w-full overflow-hidden border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="relative aspect-video w-full bg-muted">
                  <Image
                    src={engagement.thumbnailUrl}
                    alt={engagement.thumbnail?.alt ?? engagement.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="container mx-auto max-w-4xl px-4 pb-12">
          <article>
            <header className="mb-8 space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm font-medium">
                  Speaking
                </Badge>
                {engagement.location ? (
                  <Badge variant="outline" className="text-sm font-medium">
                    {engagement.location}
                  </Badge>
                ) : null}
              </div>

              <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
                {engagement.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 border-t pt-4 md:gap-6">
                {engagement.location ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{engagement.location}</span>
                  </div>
                ) : null}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mic className="h-4 w-4" />
                  <span className="font-medium">Session</span>
                </div>
                {engagement.slides_link ? (
                  <Link
                    href={engagement.slides_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary no-underline hover:text-primary/80"
                  >
                    <Presentation className="h-4 w-4" />
                    View slides
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
                {engagement.video_link ? (
                  <Link
                    href={engagement.video_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary no-underline hover:text-primary/80"
                  >
                    Watch recording
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
                <div className="w-full pt-2 md:ml-auto md:w-auto md:pt-0">
                  <ShareButtons
                    url={fullPath}
                    title={engagement.title}
                    description={engagement.short_description}
                  />
                </div>
              </div>
            </header>

            {engagement.short_description ? (
              <div className="mb-8">
                <Card className="border-0 bg-muted/50">
                  <CardContent className="p-4 md:p-6">
                    <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                      {engagement.short_description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : null}

            {engagement.details ? (
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
                    <RenderMarkdown>{engagement.details}</RenderMarkdown>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            <footer className="mt-12 space-y-6 border-t pt-8">
              <div className="pt-4">
                <Button variant="ghost" asChild>
                  <Link href="/speaking" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Speaking
                  </Link>
                </Button>
              </div>
            </footer>
          </article>
        </div>

        {relatedPosts.length > 0 ? (
          <div className="container mx-auto max-w-6xl border-t px-4 py-12">
            <LatestPosts
              posts={relatedPosts}
              title="Related Content"
              description="Curated articles and resources for this session"
              showViewAll={false}
            />
          </div>
        ) : null}
      </section>
    </Layout>
  );
}
