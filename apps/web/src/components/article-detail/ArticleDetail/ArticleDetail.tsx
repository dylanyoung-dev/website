"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Field,
  RichText,
  isComposerPreview,
  useComponentProps,
} from "@amplifyup/sdk/react";
import { ArrowLeft, Calendar, Clock, FileText, Sparkles } from "lucide-react";
import { ShareButtons } from "@/components/blogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import type { IAmplifyPost, IAmplifyPostCategory } from "@/interfaces";
import type { IArticleDetail } from "@/interfaces/IArticleDetail";
import { resolveAmplifyPost } from "@/lib/amplify-post";
import { formatPublishedDate } from "@/lib/utils";

const ARTICLE_PROSE_CLASS =
  "prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h2:!mt-20 prose-h2:!mb-8 prose-h2:first:!mt-0 prose-h3:!mt-16 prose-h3:!mb-6 prose-h3:first:!mt-0 prose-h4:!mt-12 prose-h4:!mb-4 prose-h4:first:!mt-0 prose-h5:!mt-10 prose-h5:!mb-3 prose-h5:first:!mt-0 prose-h6:!mt-8 prose-h6:!mb-2 prose-h6:first:!mt-0 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-lg prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:pl-6 prose-img:rounded-lg prose-img:shadow-md prose-hr:border-border prose-hr:my-12 prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-foreground";

function getPostImageUrl(post: IAmplifyPost): string | undefined {
  return post.landscapeImage?.url || post.mainImage?.url;
}

function getPostImageAlt(post: IAmplifyPost): string {
  return post.landscapeImage?.alt || post.mainImage?.alt || post.title;
}

function getCategorySlug(category: IAmplifyPostCategory): string | undefined {
  if (typeof category.slug === "string") return category.slug.trim() || undefined;
  return category.slug?.current?.trim() || undefined;
}

function getCategoryTitle(category: IAmplifyPostCategory): string | undefined {
  return category.title?.trim() || undefined;
}

function getShareUrl(slug: string): string {
  const path = `/insights/${slug}`;
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${path}`;
  }
  return path;
}

function ArticleDetailBody({ post }: { post: IAmplifyPost }) {
  const imageUrl = getPostImageUrl(post);
  const publishedLabel = formatPublishedDate(post.publishedAt);
  const slug = post.slug?.trim();
  const shareUrl = slug ? getShareUrl(slug) : "/insights";
  const backHref = "/insights";
  const categoriesWithTitle = (post.categories || []).filter((c) =>
    getCategoryTitle(c)
  );
  const categoriesWithSlug = (post.categories || []).filter(
    (c) => getCategoryTitle(c) && getCategorySlug(c)
  );

  return (
    <section className="relative bg-background">
      {imageUrl ? (
        <div className="container mx-auto mb-8 max-w-6xl px-4 pt-4">
          <div className="relative h-44 w-full overflow-hidden rounded-lg bg-muted sm:h-52 md:h-56">
            <Image
              src={imageUrl}
              alt={getPostImageAlt(post)}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          </div>
        </div>
      ) : null}

      <div
        className={`container mx-auto max-w-4xl px-4 pb-12 ${imageUrl ? "" : "pt-8"}`}
      >
        <article>
          <header className="mb-8 space-y-6">
            {categoriesWithTitle.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {categoriesWithTitle.map((category, index) => (
                  <Badge
                    key={category.id || category._id || index}
                    variant="secondary"
                    className="text-sm font-medium"
                  >
                    {getCategoryTitle(category)}
                  </Badge>
                ))}
              </div>
            ) : null}

            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 border-t pt-4 md:gap-6">
              {publishedLabel ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt} className="font-medium">
                    {publishedLabel}
                  </time>
                </div>
              ) : null}
              {post.readingTime ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">{post.readingTime}</span>
                </div>
              ) : null}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Article</span>
              </div>
              <div className="w-full pt-2 md:ml-auto md:w-auto md:pt-0">
                <ShareButtons
                  url={shareUrl}
                  title={post.title}
                  description={post.excerpt}
                />
              </div>
            </div>
          </header>

          <div className="mb-8">
            <Card className="border-0 bg-muted/50">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      AI-Assisted Proofreading
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      All articles on this site are written by me. I use AI tools
                      solely for proofreading and editing assistance to ensure
                      clarity and accuracy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {post.body ? (
            isComposerPreview() ? (
              <RichText value={post.body} className={ARTICLE_PROSE_CLASS} />
            ) : (
              <div className={ARTICLE_PROSE_CLASS}>
                <RenderMarkdown>{post.body}</RenderMarkdown>
              </div>
            )
          ) : null}

          <footer className="mt-12 space-y-6 border-t pt-8">
            {categoriesWithSlug.length > 0 ? (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categoriesWithSlug.map((category, index) => {
                    const categorySlug = getCategorySlug(category)!;
                    return (
                      <Button
                        key={category.id || category._id || index}
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link href={`/insights/categories/${categorySlug}`}>
                          {getCategoryTitle(category)}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="pt-4">
              <Button variant="ghost" asChild>
                <Link href={backHref} className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Insights
                </Link>
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
}

/**
 * AmplifyUP placeable ArticleDetail (`component_id: ArticleDetail`).
 * Post content from Edge via `<Field value={post}>` or flat entity props.
 */
export function ArticleDetail() {
  const componentProps = useComponentProps<
    IArticleDetail & Record<string, unknown>
  >();

  return (
    <Field
      value={componentProps.post}
      render={(fieldPost) => {
        const inComposer = isComposerPreview();
        const post = resolveAmplifyPost(fieldPost, componentProps);

        if (!post && !inComposer) return null;

        const resolved: IAmplifyPost =
          post ??
          ({
            title: "Article title",
            slug: "",
          } as IAmplifyPost);

        return <ArticleDetailBody post={resolved} />;
      }}
    />
  );
}
