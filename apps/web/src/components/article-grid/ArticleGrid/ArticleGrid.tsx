"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Field,
  Image,
  isComposerPreview,
  nextPageSpec,
  queryContent,
  searchSpec,
  type Fields,
  type ImageValue,
  type ListRow,
  type QueryPagination,
} from "@amplifyup/sdk/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPublishedDate } from "@/lib/utils";

const TRACKING_ID = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID?.trim() || "";
const ROUTE = "/insights";

/** Schema shape for list rows — SDK wraps each as `ListRow<Post>`. */
type Post = {
  id: string;
  title: string;
  slug: string;
  landscapeImage?: ImageValue;
  publishedAt?: string;
  readingTime?: string;
  excerpt?: string;
};

type PostRow = ListRow<Post>;

type Content = {
  heading: string;
  description?: string;
  posts?: Post[];
};

type ArticleGridProps = {
  fields: Fields<Content>;
  /** Sibling prop when the `posts` connection is marked paginated in Composer. */
  postsPagination?: QueryPagination;
  showFeatured?: boolean;
};

function PostCard({ post }: { post: PostRow }) {
  const href = post.slug ? `/insights/${post.slug}` : "/insights/";
  const publishedAt = post.publishedAt?.value;
  const date = formatPublishedDate(publishedAt, "MMM dd, yyyy");

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card no-underline transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          field={post.landscapeImage}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary">
          <Field field={post.title} />
        </h3>
      </div>
      <div className="flex justify-between border-t px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
        {date && publishedAt ? (
          <time dateTime={publishedAt}>{date}</time>
        ) : (
          <span />
        )}
        {post.readingTime?.value ? (
          <span>
            <Field field={post.readingTime} />
          </span>
        ) : null}
      </div>
    </Link>
  );
}

function FeaturedPost({ post }: { post: PostRow }) {
  const href = post.slug ? `/insights/${post.slug}` : "/insights/";
  const publishedAt = post.publishedAt?.value;
  const date = formatPublishedDate(publishedAt);
  const inComposer = isComposerPreview();
  const imageUrl = post.landscapeImage?.value?.url?.trim();
  const showExcerpt = Boolean(post.excerpt && (post.excerpt.value || inComposer));
  const showReadingTime = Boolean(
    post.readingTime && (post.readingTime.value || inComposer)
  );

  return (
    <article className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col md:grid md:grid-cols-2 md:items-stretch">
        <Link
          href={href}
          className="group relative block aspect-[16/10] overflow-hidden bg-muted md:order-2 md:aspect-auto md:h-full md:min-h-[220px]"
        >
          {imageUrl || inComposer ? (
            <Image
              field={post.landscapeImage}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : null}
          {imageUrl ? (
            <div className="pointer-events-none absolute bottom-4 left-4 hidden text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/90 drop-shadow-sm md:block">
              01 / Featured
            </div>
          ) : null}
        </Link>

        <div className="flex flex-col justify-between gap-4 p-6 md:order-1">
          <div className="space-y-4">
            <Badge className="gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider">
              <Sparkles className="h-3 w-3" aria-hidden />
              Featured
            </Badge>

            <h2 className="text-xl font-bold leading-tight tracking-tight md:text-2xl lg:text-3xl">
              <Link
                href={href}
                className="text-foreground no-underline transition-colors hover:text-primary"
              >
                <Field field={post.title} />
              </Link>
            </h2>

            {showExcerpt ? (
              <div className="space-y-2">
                <Field
                  field={post.excerpt}
                  className="line-clamp-3 block max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
                />
                {post.excerpt?.value ? (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary no-underline hover:opacity-80"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {date && publishedAt ? (
              <time dateTime={publishedAt}>{date}</time>
            ) : null}
            {date && post.readingTime?.value ? (
              <span aria-hidden>•</span>
            ) : null}
            {showReadingTime ? <Field field={post.readingTime} /> : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function PostGrid({
  posts,
  showFeatured,
}: {
  posts: PostRow[];
  showFeatured?: boolean;
}) {
  const featured = showFeatured ? posts[0] : null;
  const rest = featured ? posts.slice(1) : posts;

  return (
    <div className="space-y-10">
      {featured ? <FeaturedPost post={featured} /> : null}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function mergePagination(
  base: QueryPagination,
  result: { hasMore: boolean; limit: number; offset: number; nextOffset: number }
): QueryPagination {
  return {
    ...base,
    hasMore: result.hasMore,
    limit: result.limit,
    offset: result.offset,
    nextOffset: result.nextOffset,
  };
}

function ArticleGridInner({
  fields,
  postsPagination,
  showFeatured,
}: ArticleGridProps) {
  const q = useSearchParams().get("q")?.trim() || "";
  const inComposer = isComposerPreview();

  /** `null` = show Edge-resolved list (+ any load-more append). */
  const [searchRows, setSearchRows] = useState<PostRow[] | null>(null);
  const [appended, setAppended] = useState<PostRow[]>([]);
  const [pageMeta, setPageMeta] = useState<QueryPagination | undefined>(
    postsPagination
  );
  const [searching, setSearching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setPageMeta(postsPagination);
    setAppended([]);
  }, [postsPagination]);

  useEffect(() => {
    if (!q || !TRACKING_ID || !postsPagination) {
      setSearchRows(null);
      setSearching(false);
      setPageMeta(postsPagination);
      setAppended([]);
      return;
    }

    let cancelled = false;
    setSearching(true);
    setAppended([]);

    queryContent<Post>({
      trackingId: TRACKING_ID,
      route: ROUTE,
      spec: searchSpec(postsPagination, "title", q),
    })
      .then((result) => {
        if (cancelled) return;
        setSearchRows(result.results);
        setPageMeta(mergePagination(postsPagination, result));
      })
      .catch(() => {
        if (!cancelled) {
          setSearchRows([]);
          setPageMeta(
            postsPagination
              ? { ...postsPagination, hasMore: false }
              : undefined
          );
        }
      })
      .finally(() => {
        if (!cancelled) setSearching(false);
      });

    return () => {
      cancelled = true;
    };
  }, [q, postsPagination]);

  const initial = fields.posts.value ?? [];
  const posts = searchRows ?? [...initial, ...appended];

  const loadMore = useCallback(async () => {
    if (!TRACKING_ID || !pageMeta?.hasMore || loadingMore) return;

    setLoadingMore(true);
    try {
      const result = await queryContent<Post>({
        trackingId: TRACKING_ID,
        route: ROUTE,
        spec: nextPageSpec(pageMeta),
      });

      if (searchRows) {
        setSearchRows([...searchRows, ...result.results]);
      } else {
        setAppended((prev) => [...prev, ...result.results]);
      }
      setPageMeta(mergePagination(pageMeta, result));
    } catch {
      // Keep current rows; leave hasMore so the user can retry.
    } finally {
      setLoadingMore(false);
    }
  }, [pageMeta, loadingMore, searchRows]);

  const showLoadMore =
    Boolean(pageMeta?.hasMore) && Boolean(TRACKING_ID) && !inComposer;

  return (
    <div className="container mx-auto max-w-6xl space-y-8 px-4 py-8 md:py-12">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold md:text-2xl">
          <Field field={fields.heading} />
        </h2>
        <Field
          field={fields.description}
          className="block text-sm text-muted-foreground"
        />
      </div>

      {q ? (
        <p className="text-sm text-muted-foreground">
          {searching
            ? `Searching for “${q}”…`
            : `${posts.length} ${posts.length === 1 ? "result" : "results"} for “${q}”`}
        </p>
      ) : null}

      {posts.length === 0 && inComposer ? (
        <p className="text-sm text-muted-foreground">No posts yet.</p>
      ) : null}

      <PostGrid posts={posts} showFeatured={showFeatured && !q} />

      {showLoadMore ? (
        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={loadingMore}
            onClick={() => void loadMore()}
          >
            {loadingMore ? "Loading…" : "Load more"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}

/** AmplifyUP placeable ArticleGrid (`component_id: ArticleGrid`). */
export function ArticleGrid(props: ArticleGridProps) {
  return (
    <Suspense fallback={null}>
      <ArticleGridInner {...props} />
    </Suspense>
  );
}
