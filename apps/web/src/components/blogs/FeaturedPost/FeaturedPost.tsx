import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IPost } from "@/interfaces";
import { getPostCardImageUrl } from "@/lib/post-images";
import { formatPublishedDate } from "@/lib/utils";

interface FeaturedPostProps {
  post: IPost;
  featureBadge?: string;
}

export function FeaturedPost({ post, featureBadge = "Featured" }: FeaturedPostProps) {
  const imageUrl = getPostCardImageUrl(post);
  const postHref = `/insights/${post.slug.current}`;
  const publishedLabel = formatPublishedDate(post.publishedAt, "MMMM dd, yyyy");
  const category = post.categories?.[0]?.title;

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
              alt={post.landscapeImage?.alt ?? post.mainImage?.alt ?? post.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40" aria-hidden />
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
                {featureBadge}
              </Badge>
              {category ? (
                <Badge
                  variant="outline"
                  className="rounded-full border-primary/30 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-primary"
                >
                  {category}
                </Badge>
              ) : null}
            </div>

            <h2 className="text-xl font-bold leading-tight tracking-tight md:text-2xl lg:text-3xl">
              <Link
                href={postHref}
                className="text-foreground transition-colors hover:text-primary no-underline"
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
            {publishedLabel ? <time dateTime={String(post.publishedAt)}>{publishedLabel}</time> : null}
            {publishedLabel && post.readingTime ? <span aria-hidden>•</span> : null}
            {post.readingTime ? <span>{post.readingTime}</span> : null}
          </div>
        </div>
      </div>
    </article>
  );
}
