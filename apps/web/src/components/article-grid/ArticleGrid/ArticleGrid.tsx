"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Field } from "@amplifyup/sdk/react";
import { ArrowRight } from "lucide-react";
import { FeaturedPost } from "@/components/blogs/FeaturedPost";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageShell } from "@/components/ui/Layout/PageShell";
import type { ArticleGridMode } from "@/interfaces/IArticleGrid";
import type { IPost } from "@/interfaces";
import { getPostCardImageUrl } from "@/lib/post-images";
import { formatPublishedDate } from "@/lib/utils";
import {
  fetchCuratedPosts,
  fetchQueryPosts,
  type ArticleGridFetchResult,
} from "./fetchPosts";

interface ArticleGridConfig {
  mode: ArticleGridMode;
  pageSize: number;
  categorySlug?: string;
  postSlugs: string[];
  showFeatured: boolean;
  showPagination: boolean;
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

function ArticleGridResults({ config }: { config: ArticleGridConfig }) {
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams?.get("page") ?? "1");
  const page =
    config.showPagination && Number.isFinite(pageParam) && pageParam > 0
      ? pageParam
      : 1;
  const postSlugsKey = useMemo(
    () => config.postSlugs.join("\0"),
    [config.postSlugs]
  );

  const [result, setResult] = useState<ArticleGridFetchResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        const data =
          config.mode === "curated"
            ? await fetchCuratedPosts(config.postSlugs)
            : await fetchQueryPosts({
                pageSize: config.pageSize,
                page,
                categorySlug: config.categorySlug,
              });
        if (!cancelled) {
          setResult(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load posts");
          setResult({ posts: [], total: 0 });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
    // postSlugsKey stabilizes array identity from Field re-renders
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally keyed
  }, [
    config.mode,
    config.pageSize,
    config.categorySlug,
    postSlugsKey,
    page,
  ]);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Loading posts…</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const posts = result?.posts ?? [];
  if (!posts.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No posts available yet.</p>
        </CardContent>
      </Card>
    );
  }

  const featured =
    config.mode === "query" && config.showFeatured ? posts[0] : null;
  const gridPosts = featured ? posts.slice(1) : posts;
  const totalPages =
    config.mode === "query" && config.showPagination
      ? Math.max(1, Math.ceil((result?.total ?? 0) / config.pageSize))
      : 1;

  return (
    <div className="space-y-8">
      {featured ? <FeaturedPost post={featured} /> : null}

      {gridPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => (
            <GridPostCard
              key={post._id}
              post={post}
              highlightCategorySlug={config.categorySlug}
            />
          ))}
        </div>
      ) : null}

      {config.showPagination && totalPages > 1 ? (
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
}

function ArticleGridBody() {
  return (
    <Field
      name="mode"
      render={(mode) => (
        <Field
          name="pageSize"
          render={(pageSize) => (
            <Field
              name="categorySlug"
              render={(categorySlug) => (
                <Field
                  name="postSlugs"
                  render={(postSlugs) => (
                    <Field
                      name="showFeatured"
                      render={(showFeatured) => (
                        <Field
                          name="showPagination"
                          render={(showPagination) => {
                            const config: ArticleGridConfig = {
                              mode:
                                mode === "curated" ? "curated" : "query",
                              pageSize:
                                typeof pageSize === "number" && pageSize > 0
                                  ? pageSize
                                  : 12,
                              categorySlug:
                                typeof categorySlug === "string" &&
                                categorySlug.trim()
                                  ? categorySlug.trim()
                                  : undefined,
                              postSlugs: Array.isArray(postSlugs)
                                ? postSlugs.filter(
                                    (s): s is string => typeof s === "string"
                                  )
                                : [],
                              showFeatured: Boolean(showFeatured),
                              showPagination: Boolean(showPagination),
                            };
                            return (
                              <Suspense
                                fallback={
                                  <Card>
                                    <CardContent className="py-12 text-center">
                                      <p className="text-muted-foreground">
                                        Loading posts…
                                      </p>
                                    </CardContent>
                                  </Card>
                                }
                              >
                                <ArticleGridResults config={config} />
                              </Suspense>
                            );
                          }}
                        />
                      )}
                    />
                  )}
                />
              )}
            />
          )}
        />
      )}
    />
  );
}

/**
 * AmplifyUP placeable ArticleGrid (`component_id: ArticleGrid`).
 * Composer injects pull/curation props; this component reads them via SDK `<Field>`
 * and fetches post bodies from Sanity.
 */
export function ArticleGrid() {
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
          <Field
            name="showViewAll"
            render={(showViewAll) =>
              showViewAll ? (
                <Field
                  name="viewAllHref"
                  render={(viewAllHref) => (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="hidden shrink-0 sm:flex"
                    >
                      <Link
                        href={
                          typeof viewAllHref === "string" && viewAllHref.trim()
                            ? viewAllHref
                            : "/insights/"
                        }
                        className="flex items-center gap-1.5 no-underline"
                      >
                        View All
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                />
              ) : null
            }
          />
        </div>

        <ArticleGridBody />
      </PageShell>
    </section>
  );
}
