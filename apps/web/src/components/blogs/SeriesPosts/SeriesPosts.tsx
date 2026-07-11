"use client";

import { useState } from "react";
import Link from "next/link";
import { formatPublishedDate } from "@/lib/utils";
import { ArrowLeft, Calendar, ChevronRight, Clock } from "lucide-react";
import { IPost } from "@/interfaces";
import { ISeries } from "@/interfaces/ISeries";
import { Button } from "@/components/ui/button";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import { cn } from "@/lib/utils";

interface SeriesPostsProps {
  series: ISeries;
}

export function SeriesPosts({ series }: SeriesPostsProps) {
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 rounded-xl border border-border/80 bg-card/50 p-5 backdrop-blur-sm">
            <div className="mb-4 space-y-1 border-b border-border/80 pb-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                In this series
              </p>
              <h2 className="text-lg font-semibold tracking-tight">Contents</h2>
              <p className="text-sm text-muted-foreground">
                {series.posts.length}{" "}
                {series.posts.length === 1 ? "article" : "articles"}
              </p>
            </div>

            <nav className="space-y-1" aria-label="Series contents">
              {series.posts.map((post: IPost, index) => {
                const isSelected = selectedPostIndex === index;

                return (
                  <button
                    key={post._id}
                    type="button"
                    onClick={() =>
                      setSelectedPostIndex(isSelected ? null : index)
                    }
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left transition-colors",
                      isSelected
                        ? "border-primary/40 bg-primary/5"
                        : "border-transparent hover:border-border/80 hover:bg-muted/50"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium leading-snug">
                        {post.title}
                      </span>
                      {formatPublishedDate(post.publishedAt, "MMM d, yyyy") ? (
                        <span className="mt-1 block text-xs text-muted-foreground">
                          {formatPublishedDate(post.publishedAt, "MMM d, yyyy")}
                        </span>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="space-y-8 lg:col-span-8 xl:col-span-9">
          {series.posts.map((post: IPost, index) => {
            const isSelected =
              selectedPostIndex === null || selectedPostIndex === index;

            return (
              <article
                key={post._id}
                id={`series-post-${index + 1}`}
                className={cn(
                  "scroll-mt-28 rounded-xl border border-border/80 bg-card transition-shadow",
                  selectedPostIndex === index && "shadow-md ring-1 ring-primary/20",
                  !isSelected && selectedPostIndex !== null && "opacity-60"
                )}
              >
                <header className="space-y-4 border-b border-border/80 p-5 md:p-6">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <div className="min-w-0 space-y-2">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
                        Part {index + 1}
                      </p>
                      <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
                        {post.title}
                      </h2>
                      {post.excerpt ? (
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {post.excerpt}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                    {formatPublishedDate(post.publishedAt) ? (
                      <span className="inline-flex items-center gap-1.5 normal-case">
                        <Calendar className="h-3.5 w-3.5" aria-hidden />
                        <time
                          dateTime={
                            typeof post.publishedAt === "string"
                              ? post.publishedAt
                              : undefined
                          }
                        >
                          {formatPublishedDate(post.publishedAt)}
                        </time>
                      </span>
                    ) : null}
                    {formatPublishedDate(post.publishedAt) && post.readingTime ? (
                      <span aria-hidden>•</span>
                    ) : null}
                    {post.readingTime ? (
                      <span className="inline-flex items-center gap-1.5 normal-case">
                        <Clock className="h-3.5 w-3.5" aria-hidden />
                        {post.readingTime}
                      </span>
                    ) : null}
                    {post.categories?.length ? (
                      <>
                        <span aria-hidden>•</span>
                        <span>{post.categories.map((c) => c.title).join(", ")}</span>
                      </>
                    ) : null}
                  </div>
                </header>

                {post.body ? (
                  <div className="p-5 md:p-6">
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
                      <RenderMarkdown>{post.body}</RenderMarkdown>
                    </div>
                  </div>
                ) : null}

                <footer className="border-t border-border/80 px-5 py-4 md:px-6">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/insights/${post.slug.current}/`}
                      className="inline-flex items-center gap-2 no-underline"
                    >
                      Read full article
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                </footer>
              </article>
            );
          })}
        </div>
      </div>

      <div className="border-t pt-8">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href="/insights/series/"
            className="inline-flex items-center gap-2 no-underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to all series
          </Link>
        </Button>
      </div>
    </div>
  );
}
