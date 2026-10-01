"use client";

import {
  Field,
  Image,
  RichText,
  useInComposer,
  type ImageValue,
  type LayoutComponentProps,
} from "@amplifyup/sdk/react";
import { cn } from "@/lib/utils";

type ContentSectionContent = {
  eyebrow: string;
  heading: string;
  description: string;
  /** Markdown. */
  body: string;
  image: ImageValue;
};

type ContentSectionProps = LayoutComponentProps<ContentSectionContent> & {
  /** Setting: where the image sits relative to the copy. */
  imagePosition?: "none" | "left" | "right" | "top-avatar";
};

/**
 * AmplifyUP placeable `ContentSection` (Sanity type `contentSection`).
 * Generic eyebrow / heading / description / markdown body with optional image.
 */
export function ContentSection({
  fields,
  imagePosition = "none",
}: ContentSectionProps) {
  const inComposer = useInComposer();
  const hasImage =
    imagePosition !== "none" && (Boolean(fields.image?.value) || inComposer);
  const isAvatar = imagePosition === "top-avatar";
  const isSide = imagePosition === "left" || imagePosition === "right";

  const image = hasImage ? (
    <div
      className={cn(
        "relative overflow-hidden",
        isAvatar
          ? "mx-auto h-32 w-32 rounded-full border-4 border-primary/20 shadow-lg md:h-40 md:w-40"
          : "rounded-xl"
      )}
    >
      <Image
        field={fields.image}
        className={cn("h-full w-full object-cover", !isAvatar && "rounded-xl")}
      />
    </div>
  ) : null;

  const copy = (
    <div className={cn("space-y-4", isAvatar && "text-center")}>
      {fields.eyebrow?.value || inComposer ? (
        <p className="text-sm font-medium uppercase tracking-wider text-primary">
          <Field field={fields.eyebrow} />
        </p>
      ) : null}
      {fields.heading?.value || inComposer ? (
        <h2 className="text-3xl font-bold md:text-4xl">
          <Field field={fields.heading} />
        </h2>
      ) : null}
      {fields.description?.value || inComposer ? (
        <p
          className={cn(
            "text-lg text-muted-foreground md:text-xl",
            isAvatar && "mx-auto max-w-2xl"
          )}
        >
          <Field field={fields.description} />
        </p>
      ) : null}
      {fields.body?.value || inComposer ? (
        <RichText
          field={fields.body}
          className="prose prose-slate max-w-none text-lg dark:prose-invert"
        />
      ) : null}
    </div>
  );

  return (
    <section className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      {isSide ? (
        <div className="grid items-center gap-8 md:grid-cols-2">
          {imagePosition === "left" ? image : null}
          {copy}
          {imagePosition === "right" ? image : null}
        </div>
      ) : (
        <div className="space-y-6">
          {image}
          {copy}
        </div>
      )}
    </section>
  );
}
