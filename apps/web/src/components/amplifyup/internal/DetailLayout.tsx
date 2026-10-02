"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  Field,
  Image,
  RichText,
  useInComposer,
  type FieldEnvelope,
  type ImageValue,
} from "@amplifyup/sdk/react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ShareButtons } from "@/components/blogs/ShareButtons/ShareButtons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import { absoluteUrl, hasImage } from "./fields";

const PROSE_CLASS =
  "prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:pl-6 prose-img:rounded-lg prose-img:shadow-md prose-hr:border-border prose-li:text-foreground";

type DetailLayoutProps = {
  /** Listing page this detail belongs to, e.g. { label: "Speaking", href: "/speaking/" }. */
  section: { label: string; href: string };
  /** Public path of this page, for share links. */
  path: string;
  title: FieldEnvelope<string | null | undefined>;
  summary?: FieldEnvelope<string | null | undefined>;
  /** Markdown body. */
  body?: FieldEnvelope<string | null | undefined>;
  image?: FieldEnvelope<ImageValue | null | undefined>;
  /** Badges row above the title. */
  badges?: ReactNode;
  /** Meta row under the title (location, date, external links…). */
  meta?: ReactNode;
  /** Rendered between the header and the body (e.g. a video player). */
  media?: ReactNode;
  /** Rendered after the article (e.g. related posts). */
  after?: ReactNode;
};

/**
 * Shared detail layout for From-page placeables (speaking, videos, snippets).
 * Body: <RichText> in Composer for canvas editing, RenderMarkdown live for
 * prism/code UX — same split as ArticleDetail.
 */
export function DetailLayout({
  section,
  path,
  title,
  summary,
  body,
  image,
  badges,
  meta,
  media,
  after,
}: DetailLayoutProps) {
  const inComposer = useInComposer();
  const titleText = title?.value ?? "";
  const showImage = image && (hasImage(image) || inComposer);
  const showSummary = summary && (summary.value || inComposer);
  const showBody = body && (body.value || inComposer);

  return (
    <section className="relative bg-background">
      <div className="container mx-auto max-w-6xl px-4 py-6">
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-muted-foreground hover:underline">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link href={section.href} className="text-muted-foreground hover:underline">
            {section.label}
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="line-clamp-1 font-medium text-foreground">{titleText}</span>
        </nav>
      </div>

      {showImage ? (
        <div className="mb-8 w-full px-4 md:px-8 lg:px-12">
          <Card className="mx-auto w-full max-w-6xl overflow-hidden border-0 shadow-lg">
            <CardContent className="p-0">
              <div className="relative aspect-video w-full bg-muted">
                <Image
                  field={image}
                  alt={image.value?.alt || titleText}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <div className="container mx-auto max-w-4xl px-4 pb-12">
        <article>
          <header className="mb-8 space-y-6">
            {badges ? <div className="flex flex-wrap gap-2">{badges}</div> : null}

            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              <Field field={title} />
            </h1>

            <div className="flex flex-wrap items-center gap-4 border-t pt-4 md:gap-6">
              {meta}
              <div className="w-full pt-2 md:ml-auto md:w-auto md:pt-0">
                <ShareButtons
                  url={absoluteUrl(path)}
                  title={titleText}
                  description={summary?.value ?? undefined}
                />
              </div>
            </div>
          </header>

          {media ? <div className="mb-8">{media}</div> : null}

          {showSummary ? (
            <div className="mb-8">
              <Card className="border-0 bg-muted/50">
                <CardContent className="p-4 md:p-6">
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    <Field field={summary} />
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : null}

          {showBody ? (
            inComposer ? (
              <RichText field={body} className={PROSE_CLASS} />
            ) : (
              <div className={PROSE_CLASS}>
                <RenderMarkdown>{body.value}</RenderMarkdown>
              </div>
            )
          ) : null}

          <footer className="mt-12 border-t pt-8">
            <Button variant="ghost" asChild>
              <Link href={section.href} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to {section.label}
              </Link>
            </Button>
          </footer>
        </article>
      </div>

      {after}
    </section>
  );
}

/** Small icon + text item for the DetailLayout meta row. */
export function MetaItem({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {icon}
      <span className="font-medium">{children}</span>
    </div>
  );
}

/** External link styled for the DetailLayout meta row. */
export function MetaLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm font-medium text-primary no-underline hover:text-primary/80"
    >
      {icon}
      {children}
    </a>
  );
}
