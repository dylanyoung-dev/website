"use client";

import Image from "next/image";
import Link from "next/link";
import { Field } from "@amplifyup/sdk/react";
import { ArrowRight } from "lucide-react";
import { FeaturedPost } from "@/components/blogs/FeaturedPost";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/ui/Layout/PageShell";
import type { IArticleGrid } from "@/interfaces/IArticleGrid";
import type { IPost } from "@/interfaces";
import { getPostCardImageUrl } from "@/lib/post-images";
import { formatPublishedDate } from "@/lib/utils";

type ArticleGridSettings = Pick<
  IArticleGrid,
  "showFeatured" | "showViewAll" | "viewAllHref"
>;

function GridPostCard({ post }: { post: IPost }) {
  const imageUrl = getPostCardImageUrl(post);
  const postHref = `/insights/${post.slug.current}`;
  const publishedLabel = formatPublishedDate(post.publishedAt, "MMM dd, yyyy");
  const category = post.categories?.[0]?.title;

  return (
    <Card className="group h-full overflow-hidden border-border/80 transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-0">
        <Link href={postHref} className="flex h-full flex-col no-underline">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={
                  post.landscapeImage?.alt ?? post.mainImage?.alt ?? post.title
                }
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary/40"
                aria-hidden
              />
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            {category ? (
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
                {category}
              </span>
            ) : null}
            <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
              {post.title}
            </h3>
          </div>

          <div className="flex items-center justify-between border-t px-5 py-3.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            {publishedLabel ? (
              <time dateTime={String(post.publishedAt)}>{publishedLabel}</time>
            ) : (
              <span>&nbsp;</span>
            )}
            {post.readingTime ? <span>{post.readingTime}</span> : null}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

function ArticleGridPosts({ showFeatured }: { showFeatured?: boolean }) {
  return (
    <Field
      name="posts"
      render={(posts) => {
        const list = Array.isArray(posts) ? (posts as IPost[]) : [];
        if (!list.length) {
          return (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No posts available yet.</p>
              </CardContent>
            </Card>
          );
        }

        const featured = showFeatured ? list[0] : null;
        const gridPosts = featured ? list.slice(1) : list;

        return (
          <div className="space-y-8">
            {featured ? <FeaturedPost post={featured} /> : null}
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <GridPostCard key={post._id} post={post} />
                ))}
              </div>
            ) : null}
          </div>
        );
      }}
    />
  );
}

/**
 * AmplifyUP placeable ArticleGrid (`component_id: ArticleGrid`).
 * List selection / query is AmplifyUP + Edge; this component only renders projected `posts`.
 */
export function ArticleGrid({
  showFeatured,
  showViewAll,
  viewAllHref = "/insights/",
}: ArticleGridSettings) {
  return (
    <section className="border-b bg-background py-10 md:py-14">
      <PageShell className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold md:text-2xl">
              <Field name="heading" fallback="Latest Posts" />
            </h2>
            <Field
              name="description"
              render={(description) =>
                description ? (
                  <p className="text-sm text-muted-foreground">
                    {String(description)}
                  </p>
                ) : null
              }
            />
          </div>
          <Field
            name="sortLabel"
            render={(sortLabel) =>
              sortLabel ? (
                <span className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
                  {String(sortLabel)}
                </span>
              ) : null
            }
          />
          {showViewAll ? (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden shrink-0 sm:flex"
            >
              <Link
                href={viewAllHref?.trim() || "/insights/"}
                className="flex items-center gap-1.5 no-underline"
              >
                View All
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          ) : null}
        </div>

        <ArticleGridPosts showFeatured={showFeatured} />
      </PageShell>
    </section>
  );
}
