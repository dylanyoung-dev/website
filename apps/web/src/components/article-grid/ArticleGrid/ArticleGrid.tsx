"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Field,
  isComposerPreview,
  queryContent,
  searchSpec,
  type LayoutComponentProps,
  type QueryPagination,
} from "@amplifyup/sdk/react";
import type { IAmplifyPost } from "@/interfaces";
import { formatPublishedDate } from "@/lib/utils";

const TRACKING_ID = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID?.trim() || "";
const ROUTE = "/insights";

type Content = {
  heading?: string;
  description?: string;
  posts?: IAmplifyPost[];
} & Record<string, unknown>;

type ArticleGridProps = LayoutComponentProps<Content> & {
  /** Pagination meta from a paginated Composer query connection on `posts`. */
  postsPagination?: QueryPagination;
  showFeatured?: boolean;
};

function PostCard({ post }: { post: IAmplifyPost }) {
  const href = post.slug ? `/insights/${post.slug}` : "/insights/";
  const image = post.landscapeImage;
  const date = formatPublishedDate(post.publishedAt, "MMM dd, yyyy");

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card no-underline transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] bg-muted">
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-base font-semibold leading-snug text-foreground group-hover:text-primary">
          {post.title}
        </h3>
      </div>
      <div className="flex justify-between border-t px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
        {date ? <time dateTime={post.publishedAt}>{date}</time> : <span />}
        {post.readingTime ? <span>{post.readingTime}</span> : null}
      </div>
    </Link>
  );
}

function PostGrid({
  posts,
  showFeatured,
}: {
  posts: IAmplifyPost[];
  showFeatured?: boolean;
}) {
  const featured = showFeatured ? posts[0] : null;
  const rest = featured ? posts.slice(1) : posts;

  return (
    <>
      {featured ? <PostCard post={featured} /> : null}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((post, i) => (
          <PostCard key={post._id || post.id || post.slug || i} post={post} />
        ))}
      </div>
    </>
  );
}

function ArticleGridInner({
  fields,
  postsPagination,
  showFeatured,
}: ArticleGridProps) {
  const q = useSearchParams().get("q")?.trim() || "";
  const inComposer = isComposerPreview();
  const [hits, setHits] = useState<IAmplifyPost[] | null>(null);

  useEffect(() => {
    if (!q || !TRACKING_ID || !postsPagination) {
      setHits(null);
      return;
    }

    let cancelled = false;
    queryContent<IAmplifyPost>({
      trackingId: TRACKING_ID,
      route: ROUTE,
      spec: searchSpec(postsPagination, "title", q),
    })
      .then((result) => {
        if (!cancelled) setHits(result.results);
      })
      .catch(() => {
        if (!cancelled) setHits([]);
      });

    return () => {
      cancelled = true;
    };
  }, [q, postsPagination]);

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
          {hits
            ? `${hits.length} ${hits.length === 1 ? "result" : "results"} for “${q}”`
            : `Searching for “${q}”…`}
        </p>
      ) : null}

      {inComposer && !fields.posts?.value?.length ? (
        <p className="text-sm text-muted-foreground">No posts yet.</p>
      ) : null}

      {/*
        Bind the list envelope for Composer. Search overrides display via
        queryContent — list rows are plain objects, not field envelopes.
      */}
      <Field
        field={fields.posts}
        render={(posts) => {
          if (hits) {
            return <PostGrid posts={hits} showFeatured={false} />;
          }
          const list = Array.isArray(posts) ? posts : [];
          return <PostGrid posts={list} showFeatured={showFeatured && !q} />;
        }}
      />
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
