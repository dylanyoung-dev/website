"use client";

import Link from "next/link";
import {
  Field,
  Image,
  RichText,
  isComposerPreview,
  type FieldEnvelope,
  type ImageValue,
  type LayoutComponentProps,
  type ListRow,
} from "@amplifyup/sdk/react";
import { ArrowLeft, Calendar, Clock, FileText, Sparkles } from "lucide-react";
import { ShareButtons } from "@/components/blogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import type { IAmplifyPostCategory } from "@/interfaces";
import type { IArticleDetail } from "@/interfaces/IArticleDetail";
import { formatPublishedDate } from "@/lib/utils";

const ARTICLE_PROSE_CLASS =
  "prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-h2:!mt-20 prose-h2:!mb-8 prose-h2:first:!mt-0 prose-h3:!mt-16 prose-h3:!mb-6 prose-h3:first:!mt-0 prose-h4:!mt-12 prose-h4:!mb-4 prose-h4:first:!mt-0 prose-h5:!mt-10 prose-h5:!mb-3 prose-h5:first:!mt-0 prose-h6:!mt-8 prose-h6:!mb-2 prose-h6:first:!mt-0 prose-p:text-foreground prose-p:leading-relaxed prose-p:text-lg prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:pl-6 prose-img:rounded-lg prose-img:shadow-md prose-hr:border-border prose-hr:my-12 prose-ul:space-y-2 prose-ol:space-y-2 prose-li:text-foreground";

type CategoryRow = ListRow<IAmplifyPostCategory>;

function hasLandscapeImage(image: ImageValue | string | null | undefined): boolean {
  if (typeof image === "string") return image.trim().length > 0;
  return Boolean(image?.url?.trim());
}

function landscapeImageAlt(
  image: ImageValue | string | null | undefined,
  fallback: string
): string {
  if (image && typeof image === "object" && image.alt?.trim()) {
    return image.alt.trim();
  }
  return fallback;
}

function getCategorySlug(category: CategoryRow): string | undefined {
  const slug = category.slug;
  if (typeof slug === "string") return slug.trim() || undefined;
  if (slug && typeof slug === "object" && "current" in slug) {
    return (slug as { current?: string }).current?.trim() || undefined;
  }
  return undefined;
}

function getCategoryTitle(category: CategoryRow): string | undefined {
  return category.title?.value?.trim() || undefined;
}

function plainSlug(fields: LayoutComponentProps<IArticleDetail>["fields"]): string {
  const slug = fields.slug as unknown;
  if (typeof slug === "string") return slug.trim();
  if (slug && typeof slug === "object" && "value" in slug) {
    return String((slug as FieldEnvelope<string | null>).value ?? "").trim();
  }
  return "";
}

function getShareUrl(slug: string): string {
  const path = `/insights/${slug}`;
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${path}`;
  }
  return path;
}

/**
 * AmplifyUP placeable ArticleDetail (`component_id: ArticleDetail`).
 * Content via `fields` envelopes — one prop per SDK binding.
 */
export function ArticleDetail({
  fields,
}: LayoutComponentProps<IArticleDetail>) {
  const inComposer = isComposerPreview();
  const title = fields.title?.value ?? "";
  const slug = plainSlug(fields);
  const excerpt = fields.excerpt?.value;
  const body = fields.body?.value;
  const publishedAt = fields.publishedAt?.value;
  const readingTime = fields.readingTime?.value;
  const landscapeImage = fields.landscapeImage?.value;
  const categories = (fields.categories?.value ?? []) as CategoryRow[];

  const hasImage = hasLandscapeImage(landscapeImage);
  const publishedLabel = formatPublishedDate(publishedAt);
  const shareUrl = slug ? getShareUrl(slug) : "/insights";
  const categoriesWithTitle = categories.filter((c) => getCategoryTitle(c));
  const categoriesWithSlug = categories.filter(
    (c) => getCategoryTitle(c) && getCategorySlug(c)
  );

  return (
    <section className="relative bg-background">
      {hasImage || inComposer ? (
        <div className="container mx-auto mb-8 max-w-6xl px-4 pt-4">
          <div className="relative h-44 w-full overflow-hidden rounded-lg bg-muted sm:h-52 md:h-56">
            <Image
              field={fields.landscapeImage}
              alt={landscapeImageAlt(landscapeImage, title)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      ) : null}

      <div
        className={`container mx-auto max-w-4xl px-4 pb-12 ${hasImage ? "" : "pt-8"}`}
      >
        <article>
          <header className="mb-8 space-y-6">
            {categoriesWithTitle.length > 0 || inComposer ? (
              <div className="flex flex-wrap gap-2">
                {categoriesWithTitle.length > 0 ? (
                  categoriesWithTitle.map((category) => (
                    <Badge
                      key={category.id}
                      variant="secondary"
                      className="text-sm font-medium"
                    >
                      <Field field={category.title} />
                    </Badge>
                  ))
                ) : (
                  <Badge
                    variant="secondary"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Categories
                  </Badge>
                )}
              </div>
            ) : null}

            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              <Field field={fields.title} />
            </h1>

            <div className="flex flex-wrap items-center gap-4 border-t pt-4 md:gap-6">
              {publishedLabel || inComposer ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={publishedAt} className="font-medium">
                    <Field field={fields.publishedAt} />
                  </time>
                </div>
              ) : null}
              {readingTime || inComposer ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">
                    <Field field={fields.readingTime} />
                  </span>
                </div>
              ) : null}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Article</span>
              </div>
              <div className="w-full pt-2 md:ml-auto md:w-auto md:pt-0">
                <ShareButtons
                  url={shareUrl}
                  title={title}
                  description={excerpt}
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

          {body || inComposer ? (
            inComposer ? (
              <RichText
                field={fields.body as FieldEnvelope<string | null>}
                className={ARTICLE_PROSE_CLASS}
              />
            ) : (
              <div className={ARTICLE_PROSE_CLASS}>
                <RenderMarkdown>{body}</RenderMarkdown>
              </div>
            )
          ) : null}

          <footer className="mt-12 space-y-6 border-t pt-8">
            {categoriesWithSlug.length > 0 || inComposer ? (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categoriesWithSlug.length > 0 ? (
                    categoriesWithSlug.map((category) => {
                      const categorySlug = getCategorySlug(category)!;
                      return (
                        <Button
                          key={category.id}
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <Link href={`/insights/categories/${categorySlug}`}>
                            <Field field={category.title} />
                          </Link>
                        </Button>
                      );
                    })
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No categories
                    </span>
                  )}
                </div>
              </div>
            ) : null}

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
    </section>
  );
}
