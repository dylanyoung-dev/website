"use client";

import Link from "next/link";
import {
  Field,
  Image,
  useInComposer,
  type Fields,
  type ImageValue,
  type ListRow,
} from "@amplifyup/sdk/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { plainSlug } from "@/components/amplifyup/internal/fields";
import { formatPublishedDate } from "@/lib/utils";

/** Sanity `post` fields used on the featured card. */
type Post = {
  title: string;
  slug: string;
  landscapeImage?: ImageValue;
  excerpt?: string;
  publishedAt?: string;
  readingTime?: string;
};

type FeaturedPostProps = {
  /**
   * Bind to the Post Resource — a hand-picked post, or a query connection
   * (e.g. newest first, limit 1). Only the first row is shown.
   */
  fields: Fields<{ post: Post[] }>;
};

/** AmplifyUP placeable `FeaturedPost`: one highlighted article card. */
export function FeaturedPost({ fields }: FeaturedPostProps) {
  const inComposer = useInComposer();
  const post = ((fields.post?.value ?? []) as ListRow<Post>[])[0];

  if (!post) {
    return inComposer ? (
      <div className="container mx-auto max-w-6xl px-4 pt-8 md:pt-12">
        <p className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
          Featured post: bind a Post to show it here.
        </p>
      </div>
    ) : null;
  }

  const slug = plainSlug(post.slug);
  const href = slug ? `/insights/${slug}/` : "/insights/";
  const publishedAt = post.publishedAt?.value;
  const date = formatPublishedDate(publishedAt);
  const imageUrl = post.landscapeImage?.value?.url?.trim();
  const showExcerpt = Boolean(post.excerpt && (post.excerpt.value || inComposer));
  const showReadingTime = Boolean(
    post.readingTime && (post.readingTime.value || inComposer)
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 pt-8 md:pt-12">
      <article className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md">
        <div className="flex flex-col md:grid md:grid-cols-2 md:items-stretch">
          <Link
            href={href}
            className="group relative block aspect-[16/10] overflow-hidden bg-muted md:order-2 md:aspect-auto md:h-full md:min-h-[220px]"
          >
            {post.landscapeImage && (imageUrl || inComposer) ? (
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
                    field={post.excerpt!}
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
              {date && publishedAt ? <time dateTime={publishedAt}>{date}</time> : null}
              {date && post.readingTime?.value ? <span aria-hidden>•</span> : null}
              {showReadingTime ? <Field field={post.readingTime!} /> : null}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
