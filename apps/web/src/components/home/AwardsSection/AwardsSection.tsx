"use client";

import {
  Field,
  Image,
  isComposerPreview,
  type FieldEnvelope,
  type LayoutComponentProps,
  type ListRow,
} from "@amplifyup/sdk/react";
import { Card, CardContent } from "@/components/ui/card";
import type { IAwardsItem, IAwardsSection } from "@/interfaces/IAwardsSection";

function AwardBadge({ item }: { item: ListRow<IAwardsItem> }) {
  const href = item.href?.value?.trim();
  const image = (
    <Image
      field={item.image}
      className="h-auto max-w-[88px] transition-transform group-hover:scale-105 md:max-w-[100px]"
    />
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group rounded-lg transition-opacity hover:opacity-90"
      >
        {image}
      </a>
    );
  }

  return <div className="group">{image}</div>;
}

function AwardGroup({
  labelField,
  items,
}: {
  labelField?: FieldEnvelope<string | undefined>;
  items: ListRow<IAwardsItem>[];
}) {
  if (items.length === 0) return null;

  return (
    <div className="space-y-4">
      <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
        <Field field={labelField} />
      </p>
      <div className="flex flex-wrap items-center gap-4 md:gap-5">
        {items.map((item) => (
          <AwardBadge key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

type AwardsSectionContent = Omit<IAwardsSection, "title">;

/**
 * AmplifyUP placeable AwardsSection (`component_id: AwardsSection`).
 * Heading/labels via Field; logo lists as ListRow arrays (0.1.64+).
 */
export function AwardsSection({
  fields,
}: LayoutComponentProps<AwardsSectionContent>) {
  const inComposer = isComposerPreview();
  const awards = (fields.awards?.value ?? []) as ListRow<IAwardsItem>[];
  const certifications = (fields.certifications?.value ?? []) as ListRow<IAwardsItem>[];

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold md:text-2xl">
          <Field field={fields.heading} />
        </h2>
        <Field
          field={fields.description}
          className="block text-sm text-muted-foreground"
        />
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardContent className="space-y-8 p-6 md:p-8">
          {awards.length > 0 || inComposer ? (
            <AwardGroup labelField={fields.mvpLabel} items={awards} />
          ) : null}

          {certifications.length > 0 || inComposer ? (
            <div className="border-t border-border/60 pt-8">
              <AwardGroup
                labelField={fields.certificationsLabel}
                items={certifications}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
