import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IPost } from "@/interfaces";
import { getPostCardImageUrl } from "@/lib/post-images";
import { formatPublishedDate } from "@/lib/utils";

interface LatestPostsProps {
  posts: IPost[];
  /** Post `_id` values to omit — e.g. the featured post. */
  excludeIds?: string[];
  title?: string;
  description?: string;
  showViewAll?: boolean;
  sortLabel?: string;
  /** When set (e.g. on a category page), show this category on cards instead of the first tag. */
  highlightCategorySlug?: string;
}

function getDisplayCategory(post: IPost, highlightCategorySlug?: string) {
  if (highlightCategorySlug && post.categories?.length) {
    const match = post.categories.find(
      (category) => category.slug?.current === highlightCategorySlug
    );
    if (match) {
      return match.title;
    }
  }

  return post.categories?.[0]?.title;
}

function LatestPostCard({
  post,
  highlightCategorySlug,
}: {
  post: IPost;
  highlightCategorySlug?: string;
}) {
  const imageUrl = getPostCardImageUrl(post);
  const postHref = `/insights/${post.slug.current}`;
  const publishedLabel = formatPublishedDate(post.publishedAt, "MMM dd, yyyy");
  const category = getDisplayCategory(post, highlightCategorySlug);

  return (
    <Card className="group h-full overflow-hidden border-border/80 transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-0">
        <Link href={postHref} className="flex h-full flex-col no-underline">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.landscapeImage?.alt ?? post.mainImage?.alt ?? post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary/40" aria-hidden />
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

export function LatestPosts({
  posts,
  excludeIds = [],
  title = "Latest Posts",
  description = "Recent content across different topics",
  showViewAll = true,
  sortLabel,
  highlightCategorySlug,
}: LatestPostsProps) {
  const excludeSet = new Set(excludeIds);
  const visiblePosts = posts.filter((post) => !excludeSet.has(post._id));

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {sortLabel ? (
          <span className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
            {sortLabel}
          </span>
        ) : null}
        {showViewAll ? (
          <Button variant="ghost" size="sm" asChild className="hidden shrink-0 sm:flex">
            <Link href="/insights" className="flex items-center gap-1.5 no-underline">
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        ) : null}
      </div>

      {visiblePosts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <LatestPostCard
                key={post._id}
                post={post}
                highlightCategorySlug={highlightCategorySlug}
              />
            ))}
          </div>
          <div className="flex justify-center pt-2 sm:hidden">
            {showViewAll ? (
              <Button variant="ghost" size="sm" asChild className="w-full">
                <Link
                  href="/insights"
                  className="flex items-center justify-center gap-1.5 no-underline"
                >
                  View All Posts
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            ) : null}
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No posts available yet.</p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
