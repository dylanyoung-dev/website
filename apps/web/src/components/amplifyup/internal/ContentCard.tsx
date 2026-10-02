"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  Field,
  Image,
  useInComposer,
  type FieldEnvelope,
  type ImageValue,
} from "@amplifyup/sdk/react";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { hasImage } from "./fields";

type ContentCardProps = {
  href: string;
  title?: FieldEnvelope<string | null | undefined>;
  description?: FieldEnvelope<string | null | undefined>;
  image?: FieldEnvelope<ImageValue | null | undefined>;
  /** Shown when there is no image (live only). */
  fallbackIcon: ReactNode;
  /** Small label above the title (plain, not a field). */
  eyebrow?: ReactNode;
  ctaLabel: string;
  external?: boolean;
};

/** Shared grid card for list-row placeables (speaking, videos, snippets, series). */
export function ContentCard({
  href,
  title,
  description,
  image,
  fallbackIcon,
  eyebrow,
  ctaLabel,
  external,
}: ContentCardProps) {
  const inComposer = useInComposer();
  const showImage = hasImage(image) || (inComposer && image);

  return (
    <Card className="group h-full overflow-hidden border-border/80 transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-0">
        <Link
          href={href}
          className="flex h-full flex-col no-underline"
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {showImage ? (
              <Image
                field={image!}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/70 to-primary/40 text-white/80"
                aria-hidden
              >
                {fallbackIcon}
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            {eyebrow ? (
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
                {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                <Field field={title} />
              </h3>
            ) : null}
            {description && (description.value || inComposer) ? (
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                <Field field={description} />
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t px-5 py-3.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>{ctaLabel}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

/** Section header + responsive grid + empty state shared by the grid placeables. */
export function CardGridSection({
  heading,
  description,
  isEmpty,
  emptyMessage,
  emptyIcon,
  footer,
  children,
}: {
  heading: string;
  description?: string;
  isEmpty: boolean;
  emptyMessage: string;
  emptyIcon: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="container mx-auto max-w-6xl space-y-6 px-4 py-8 md:py-12">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold md:text-2xl">{heading}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {isEmpty ? (
        <Card className="border-border/80">
          <CardContent className="py-12 text-center">
            <div className="mx-auto mb-3 flex justify-center text-muted-foreground/60">
              {emptyIcon}
            </div>
            <p className="text-muted-foreground">{emptyMessage}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      )}
      {footer}
    </section>
  );
}
