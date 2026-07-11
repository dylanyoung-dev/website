import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, Braces, Calendar } from "lucide-react";
import { ShareButtons } from "@/components/blogs";
import { InsightsHero } from "@/components/insights";
import { Layout } from "@/components/ui/Layout/Layout";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSnippetLanguage } from "@/lib/snippet-preview";
import { formatPublishedDate } from "@/lib/utils";
import {
  getAllSnippetSlugs,
  getSnippetBySlug,
} from "@/services/snippet.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSnippetSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const snippet = await getSnippetBySlug(slug);
  const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";

  if (!snippet) {
    return {
      title: "Snippet not found",
    };
  }

  return {
    title: `${snippet.title} | Snippet`,
    description: snippet.excerpt || `Code snippet: ${snippet.title}`,
    openGraph: {
      type: "article",
      title: snippet.title,
      description: snippet.excerpt || `Code snippet: ${snippet.title}`,
      url: `${baseUrl}/snippets/${slug}`,
    },
  };
}

export default async function SnippetPage({ params }: Props) {
  const { slug } = await params;
  const url = process.env.HOST_URL || "";
  const shortPath = `/snippets/${slug}/`;
  const fullPath = `${url}${shortPath}`;

  const snippet = await getSnippetBySlug(slug);

  if (!snippet) {
    notFound();
  }

  const language = getSnippetLanguage(snippet);
  const publishedLabel = formatPublishedDate(snippet.publishedAt);
  const tags = snippet.tagging ?? [];
  const categories = snippet.categories ?? [];

  return (
    <Layout
      metaTitle={snippet.title}
      metaDescription={snippet.excerpt || `Code snippet: ${snippet.title}`}
      ogUrl={fullPath}
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          eyebrow="Snippets"
          title={snippet.title}
          description={
            snippet.excerpt ||
            "A shareable code sample—copy, adapt, and use in your project."
          }
          showSearch={false}
          showCategoryFilters={false}
        />

        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
          <article>
            <div className="mb-8 space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm font-medium">
                  Snippet
                </Badge>
                {language ? (
                  <Badge variant="outline" className="font-mono text-sm font-medium">
                    {language}
                  </Badge>
                ) : null}
                {categories.map((category) => (
                  <Badge key={category._id} variant="outline" className="text-sm font-medium">
                    {category.title}
                  </Badge>
                ))}
                {tags.map((tag) => (
                  <Badge key={tag._id} variant="outline" className="text-sm font-medium">
                    {tag.title}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 border-t pt-4 md:gap-6">
                {publishedLabel ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time
                      dateTime={
                        typeof snippet.publishedAt === "string"
                          ? snippet.publishedAt
                          : undefined
                      }
                      className="font-medium"
                    >
                      {publishedLabel}
                    </time>
                  </div>
                ) : null}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Braces className="h-4 w-4" />
                  <span className="font-medium">Code Sample</span>
                </div>
                <div className="w-full pt-2 md:ml-auto md:w-auto md:pt-0">
                  <ShareButtons
                    url={fullPath}
                    title={snippet.title}
                    description={snippet.excerpt}
                  />
                </div>
              </div>
            </div>

            {snippet.body ? (
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
                    <RenderMarkdown>{snippet.body}</RenderMarkdown>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            <footer className="mt-12 space-y-6 border-t pt-8">
              <Button variant="ghost" asChild>
                <Link href="/snippets/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Snippets
                </Link>
              </Button>
            </footer>
          </article>
        </div>
      </section>
    </Layout>
  );
}
