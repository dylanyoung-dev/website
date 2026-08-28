"use client";

import { Field, isComposerPreview } from "@amplifyup/sdk/react";
import { MvpLogo } from "@/components/ui/MvpLogo";
import { Card, CardContent } from "@/components/ui/card";
import type { IAwardsItem } from "@/interfaces/IAwardsSection";

function getItemImageUrl(item: IAwardsItem): string | undefined {
  if (typeof item.image === "string" && item.image.trim()) {
    return item.image.trim();
  }
  if (item.image && typeof item.image === "object" && item.image.url?.trim()) {
    return item.image.url.trim();
  }
  if (typeof item.src === "string" && item.src.trim()) {
    return item.src.trim();
  }
  return undefined;
}

function getItemAlt(item: IAwardsItem): string {
  if (item.alt?.trim()) return item.alt.trim();
  if (item.image && typeof item.image === "object" && item.image.alt?.trim()) {
    return item.image.alt.trim();
  }
  return "Award";
}

function asItemList(value: unknown): IAwardsItem[] {
  return Array.isArray(value) ? (value as IAwardsItem[]) : [];
}

function AwardBadge({ item }: { item: IAwardsItem }) {
  const src = getItemImageUrl(item);
  if (!src) return null;

  const logo = (
    <MvpLogo
      src={src}
      alt={getItemAlt(item)}
      width={100}
      height={100}
      className="h-auto max-w-[88px] transition-transform group-hover:scale-105 md:max-w-[100px]"
    />
  );

  if (item.href?.trim()) {
    return (
      <a
        href={item.href.trim()}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-lg transition-opacity hover:opacity-90"
      >
        {logo}
      </a>
    );
  }

  return <div className="group">{logo}</div>;
}

function AwardGroup({
  labelName,
  items,
  showInComposerWhenEmpty,
}: {
  labelName: string;
  items: IAwardsItem[];
  showInComposerWhenEmpty?: boolean;
}) {
  if (items.length === 0 && !showInComposerWhenEmpty) return null;

  return (
    <div className="space-y-4">
      <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
        <Field name={labelName} />
      </p>
      {items.length > 0 ? (
        <div className="flex flex-wrap items-center gap-4 md:gap-5">
          {items.map((item, index) => (
            <AwardBadge
              key={item._key || getItemImageUrl(item) || index}
              item={item}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * AmplifyUP placeable AwardsSection (`component_id: AwardsSection`).
 * Heading, labels, and logo lists via `<Field>`.
 */
export function AwardsSection() {
  const inComposer = isComposerPreview();

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold md:text-2xl">
          <Field name="heading" />
        </h2>
        <Field
          name="description"
          className="block text-sm text-muted-foreground"
        />
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardContent className="space-y-8 p-6 md:p-8">
          <Field
            name="awards"
            render={(awardsRaw) => {
              const awards = asItemList(awardsRaw).filter((item) =>
                getItemImageUrl(item)
              );
              if (awards.length === 0 && !inComposer) return null;
              return (
                <AwardGroup
                  labelName="mvpLabel"
                  items={awards}
                  showInComposerWhenEmpty={inComposer}
                />
              );
            }}
          />

          <Field
            name="certifications"
            render={(certsRaw) => {
              const certs = asItemList(certsRaw).filter((item) =>
                getItemImageUrl(item)
              );
              if (certs.length === 0 && !inComposer) return null;
              return (
                <div className="border-t border-border/60 pt-8">
                  <AwardGroup
                    labelName="certificationsLabel"
                    items={certs}
                    showInComposerWhenEmpty={inComposer}
                  />
                </div>
              );
            }}
          />
        </CardContent>
      </Card>
    </section>
  );
}
