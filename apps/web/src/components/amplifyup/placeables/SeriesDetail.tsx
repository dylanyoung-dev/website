"use client";

import Link from "next/link";
import {
  Field,
  useInComposer,
  type Fields,
  type ListRow,
} from "@amplifyup/sdk/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { plainSlug } from "@/components/amplifyup/internal/fields";
import { formatPublishedDate } from "@/lib/utils";

type Part = {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  readingTime?: string;
};

/** Sanity `series` document, projected From page. */
type Series = {
  title: string;
  description: string;
  slug: string;
  posts: Part[];
};

/**
 * AmplifyUP placeable `SeriesDetail` (/insights/series/[slug]). Fields come
 * From page (Sanity `series`); parts render in series order and link to the
 * article pages.
 */
export function SeriesDetail({ fields }: { fields: Fields<Series> }) {
  const inComposer = useInComposer();
  const parts = (fields.posts?.value ?? []) as ListRow<Part>[];

  return (
    <section className="relative bg-background">
      <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 md:py-12">
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/insights/series/" className="text-muted-foreground hover:underline">
            Series
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="line-clamp-1 font-medium text-foreground">
            {fields.title?.value}
          </span>
        </nav>

        <header className="space-y-4">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            <Field field={fields.title} />
          </h1>
          {fields.description?.value || inComposer ? (
            <p className="text-lg text-muted-foreground">
              <Field field={fields.description} />
            </p>
          ) : null}
        </header>

        <ol className="space-y-4">
          {parts.map((part, index) => {
            const date = formatPublishedDate(part.publishedAt?.value, "MMM d, yyyy");
            return (
              <li key={part.id}>
                <Card className="group border-border/80 transition-shadow hover:shadow-md">
                  <CardContent className="p-0">
                    <Link
                      href={`/insights/${plainSlug(part.slug)}/`}
                      className="flex gap-4 p-5 no-underline"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {index + 1}
                      </span>
                      <div className="flex-1 space-y-2">
                        <h2 className="text-lg font-semibold text-foreground group-hover:text-primary">
                          <Field field={part.title} />
                        </h2>
                        {part.excerpt?.value || (inComposer && part.excerpt) ? (
                          <p className="line-clamp-2 text-sm text-muted-foreground">
                            <Field field={part.excerpt!} />
                          </p>
                        ) : null}
                        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {date ? <span>{date}</span> : null}
                          {date && part.readingTime?.value ? <span aria-hidden>•</span> : null}
                          {part.readingTime?.value ? <span>{part.readingTime.value}</span> : null}
                        </div>
                      </div>
                      <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
