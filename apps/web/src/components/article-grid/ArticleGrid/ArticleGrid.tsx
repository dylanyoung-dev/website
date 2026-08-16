"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Field } from "@amplifyup/sdk/react";
import { ArrowRight } from "lucide-react";
import { FeaturedPost } from "@/components/blogs/FeaturedPost";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/ui/Layout/PageShell";
import type {
  ArticleGridSort,
  IArticleGrid,
} from "@/interfaces/IArticleGrid";
import type { IPost } from "@/interfaces";
import { getPostCardImageUrl } from "@/lib/post-images";
import { formatPublishedDate } from "@/lib/utils";

type ArticleGridSettings = Pick<
  IArticleGrid,
  | "mode"
  | "sort"
  | "pageSize"
  | "categorySlug"
  | "postSlugs"
  | "showFeatured"
  | "showPagination"
  | "showViewAll"
  | "viewAllHref"
>;

function sortPosts(posts: IPost[], sort: ArticleGridSort = "publishedAt_desc") {
  const list = [...posts];
  switch (sort) {
    case "publishedAt_asc":
      return list.sort(
        (a, b) =>
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    case "title_asc":
      return list.sort((a, b) =>
        String(a.title || "").localeCompare(String(b.title || ""))
      );
    case "publishedAt_desc":
    default:
      return list.sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
  }
}

function GridPostCard({
  post,
  highlightCategorySlug,
}: {
  post: IPost;
  highlightCategorySlug?: string;
}) {
  const imageUrl = getPostCardImageUrl(post);
  const postHref = `/insights/${post.slug.current}`;
  const publishedLabel = formatPublishedDate(post.publishedAt, "MMM dd, yyyy");
  const category =
    (highlightCategorySlug &&
      post.categories?.find((c) => c.slug?.current === highlightCategorySlug)
        ?.title) ||
    post.categories?.[0]?.title;

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

function ArticleGridPosts({
  sort = "publishedAt_desc",
  pageSize = 12,
  categorySlug,
  showFeatured,
  showPagination,
}: Pick<
  ArticleGridSettings,
  "sort" | "pageSize" | "categorySlug" | "showFeatured" | "showPagination"
>) {
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams?.get("page") ?? "1");
  const page =
    showPagination && Number.isFinite(pageParam) && pageParam > 0
      ? pageParam
      : 1;
  const size = pageSize > 0 ? pageSize : 12;

  return (
    <Field
      name="posts"
      render={(posts) => {
        const raw = Array.isArray(posts) ? (posts as IPost[]) : [];
        if (!raw.length) {
          return (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No posts available yet.</p>
              </CardContent>
            </Card>
          );
        }

        const sorted = sortPosts(raw, sort);
        const total = sorted.length;
        const totalPages = showPagination
          ? Math.max(1, Math.ceil(total / size))
          : 1;
        const start = showPagination ? (page - 1) * size : 0;
        const pagePosts = showPagination
          ? sorted.slice(start, start + size)
          : sorted.slice(0, size);

        const featured = showFeatured ? pagePosts[0] : null;
        const gridPosts = featured ? pagePosts.slice(1) : pagePosts;

        return (
          <div className="space-y-8">
            {featured ? <FeaturedPost post={featured} /> : null}
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {gridPosts.map((post) => (
                  <GridPostCard
                    key={post._id}
                    post={post}
                    highlightCategorySlug={categorySlug}
                  />
                ))}
              </div>
            ) : null}

            {showPagination && totalPages > 1 ? (
              <div className="flex items-center justify-center gap-3">
                {page > 1 ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`?page=${page - 1}`}
                      className="no-underline"
                      scroll={false}
                    >
                      Previous
                    </Link>
                  </Button>
                ) : null}
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`?page=${page + 1}`}
                      className="no-underline"
                      scroll={false}
                    >
                      Next
                    </Link>
                  </Button>
                ) : null}
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
 *
 * Content via `<Field>`: heading, description, sortLabel, posts (Edge/CMS).
 * Pull/presentation settings as plain props (Composer settings for Edge + UI):
 * mode, sort, pageSize, categorySlug, postSlugs, showFeatured, showPagination,
 * showViewAll, viewAllHref.
 */
export function ArticleGrid({
  mode: _mode = "query",
  sort = "publishedAt_desc",
  pageSize = 12,
  categorySlug,
  postSlugs: _postSlugs,
  showFeatured,
  showPagination,
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

        <Suspense
          fallback={
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Loading posts…</p>
              </CardContent>
            </Card>
          }
        >
          <ArticleGridPosts
            sort={sort}
            pageSize={pageSize}
            categorySlug={categorySlug}
            showFeatured={showFeatured}
            showPagination={showPagination}
          />
        </Suspense>
      </PageShell>
    </section>
  );
}
