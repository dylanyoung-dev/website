"use client";

import type { Fields, ListRow } from "@amplifyup/sdk/react";
import { Braces, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DetailLayout, MetaItem } from "@/components/amplifyup/internal/DetailLayout";
import { plainSlug } from "@/components/amplifyup/internal/fields";
import { getSnippetLanguage } from "@/lib/snippet-preview";
import { formatPublishedDate } from "@/lib/utils";

type Term = { title: string };

/** Sanity `snippet` document, projected From page. */
type Snippet = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  /** Markdown. */
  body: string;
  categories: Term[];
  tagging: Term[];
};

/**
 * AmplifyUP placeable `SnippetDetail` (/snippets/[slug]). Fields come From
 * page (Sanity `snippet`).
 */
export function SnippetDetail({ fields }: { fields: Fields<Snippet> }) {
  const slug = plainSlug(fields.slug);
  const publishedAt = fields.publishedAt?.value;
  const publishedLabel = formatPublishedDate(publishedAt);
  const language = getSnippetLanguage({ body: fields.body?.value ?? undefined });
  const terms = [
    ...((fields.categories?.value ?? []) as ListRow<Term>[]),
    ...((fields.tagging?.value ?? []) as ListRow<Term>[]),
  ].filter((term) => term.title?.value);

  return (
    <DetailLayout
      section={{ label: "Snippets", href: "/snippets/" }}
      path={`/snippets/${slug}/`}
      title={fields.title}
      summary={fields.excerpt}
      body={fields.body}
      badges={
        <>
          <Badge variant="secondary" className="text-sm font-medium">
            Snippet
          </Badge>
          {language ? (
            <Badge variant="outline" className="font-mono text-sm font-medium">
              {language}
            </Badge>
          ) : null}
          {terms.map((term) => (
            <Badge key={term.id} variant="outline" className="text-sm font-medium">
              {term.title.value}
            </Badge>
          ))}
        </>
      }
      meta={
        <>
          {publishedLabel && publishedAt ? (
            <MetaItem icon={<Calendar className="h-4 w-4" />}>
              <time dateTime={publishedAt}>{publishedLabel}</time>
            </MetaItem>
          ) : null}
          <MetaItem icon={<Braces className="h-4 w-4" />}>Code snippet</MetaItem>
        </>
      }
    />
  );
}
