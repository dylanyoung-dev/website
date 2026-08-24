"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Field } from "@amplifyup/sdk/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  IArticleGrid,
  IArticleGridPost,
} from "@/interfaces/IArticleGrid";
import { formatPublishedDate } from "@/lib/utils";

type ArticleGridSettings = Pick<
  IArticleGrid,
  "showFeatured" | "showViewAll" | "viewAllHref"
>;

function getPostKey(post: IArticleGridPost, index: number): string {
  return post._id || post.id || post.slug || String(index);
}

function getPostHref(post: IArticleGridPost): string {
  const slug = post.slug?.trim();
  return slug ? `/insights/${slug}` : "/insights/";
}

function getPostImageUrl(post: IArticleGridPost): string | undefined {
  return post.landscapeImage?.url || post.mainImage?.url;
}

function getPostImageAlt(post: IArticleGridPost): string {
  return post.landscapeImage?.alt || post.mainImage?.alt || post.title;
}

function asPostList(posts: unknown): IArticleGridPost[] {
  return Array.isArray(posts) ? (posts as IArticleGridPost[]) : [];
}

function filterPostsByQuery(
  posts: IArticleGridPost[],
  query: string
): IArticleGridPost[] {
  const q = query.trim().toLowerCase();
  if (!q) return posts;
  return posts.filter((post) =>
    [post.title, post.excerpt, post.body, post.slug]
      .filter((value): value is string => Boolean(value))
      .some((value) => value.toLowerCase().includes(q))
  );
}

function FeaturedGridPost({ post }: { post: IArticleGridPost }) {
  const imageUrl = getPostImageUrl(post);
  const postHref = getPostHref(post);
  const publishedLabel = formatPublishedDate(post.publishedAt, "MMMM dd, yyyy");

  return (
    <article className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col md:grid md:grid-cols-2 md:items-stretch">
        <Link
          href={postHref}
          className="group relative block aspect-[16/10] overflow-hidden bg-muted md:order-2 md:min-h-[220px] md:h-full md:aspect-auto"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={getPostImageAlt(post)}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40"
              aria-hidden
            />
          )}
          <div className="absolute bottom-4 left-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/90 drop-shadow-sm max-md:hidden">
            01 / Featured
          </div>
        </Link>

        <div className="flex flex-col justify-between gap-4 p-5 md:order-1 md:p-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" aria-hidden />
                Featured
              </Badge>
            </div>

            <h2 className="text-xl font-bold leading-tight tracking-tight md:text-2xl lg:text-3xl">
              <Link
                href={postHref}
                className="text-foreground no-underline transition-colors hover:text-primary"
              >
                {post.title}
              </Link>
            </h2>

            {post.excerpt ? (
              <div className="space-y-2">
                <p className="line-clamp-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {post.excerpt}
                </p>
                <Link
                  href={postHref}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary no-underline hover:opacity-80"
                >
                  Read more
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {publishedLabel ? (
              <time dateTime={String(post.publishedAt)}>{publishedLabel}</time>
            ) : null}
            {publishedLabel && post.readingTime ? <span aria-hidden>•</span> : null}
            {post.readingTime ? <span>{post.readingTime}</span> : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function GridPostCard({ post }: { post: IArticleGridPost }) {
  const imageUrl = getPostImageUrl(post);
  const postHref = getPostHref(post);
  const publishedLabel = formatPublishedDate(post.publishedAt, "MMM dd, yyyy");

  return (
    <Card className="group h-full overflow-hidden border-border/80 transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-0">
        <Link href={postHref} className="flex h-full flex-col no-underline">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={getPostImageAlt(post)}
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

function ArticleGridBody({
  showFeatured,
  showViewAll,
  viewAllHref,
  searchQuery,
}: ArticleGridSettings & { searchQuery: string }) {
  const isSearching = searchQuery.length > 0;

  return (
    <Field
      name="posts"
      render={(posts) => {
        const list = filterPostsByQuery(asPostList(posts), searchQuery);
        const featured = showFeatured && !isSearching ? list[0] : null;
        const gridPosts = featured ? list.slice(1) : list;

        return (
          <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
            <div className="space-y-10">
              {featured ? <FeaturedGridPost post={featured} /> : null}

              {isSearching ? (
                <p className="text-sm text-muted-foreground">
                  {list.length} {list.length === 1 ? "result" : "results"} for{" "}
                  <span className="font-medium text-foreground">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </p>
              ) : null}

              <section className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold md:text-2xl">
                      <Field name="heading" />
                    </h2>
                    <Field
                      name="description"
                      className="block text-sm text-muted-foreground"
                    />
                  </div>
                  <Field
                    name="sortLabel"
                    className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground sm:inline"
                  />
                  {showViewAll && viewAllHref ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      className="hidden shrink-0 sm:flex"
                    >
                      <Link
                        href={viewAllHref}
                        className="flex items-center gap-1.5 no-underline"
                      >
                        View All
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {gridPosts.map((post, index) => (
                    <GridPostCard key={getPostKey(post, index)} post={post} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        );
      }}
    />
  );
}

function ArticleGridWithSearch(props: ArticleGridSettings) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.trim() || "";
  return <ArticleGridBody {...props} searchQuery={searchQuery} />;
}

/** AmplifyUP placeable ArticleGrid (`component_id: ArticleGrid`). */
export function ArticleGrid(props: ArticleGridSettings) {
  return (
    <Suspense fallback={null}>
      <ArticleGridWithSearch {...props} />
    </Suspense>
  );
}
