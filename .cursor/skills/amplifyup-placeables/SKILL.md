---
name: amplifyup-placeables
description: >-
  Build and edit AmplifyUP placeable components without overengineering or
  fighting the SDK. Use when creating or changing placeables, Field/RichText/Image
  bindings, useComponentProps, ArticleDetail/Hero/ArticleGrid, Composer preview,
  renderAmplifyComponent, or anything involving @amplifyup/sdk.
---

# AmplifyUP placeables — trust the SDK

AmplifyUP already owns layout resolve, Composer preview, field overlays, props
context, personalization, and projection. This site only builds React placeables
and thin page wiring.

Before writing Amplify code: read current SDK types in
`node_modules/@amplifyup/sdk/dist/react.d.ts` (and server types if needed). Do
not invent helpers the SDK already provides.

Also see the always-on rule `.cursor/rules/amplifyup-sdk.mdc`.

## Hard rules

1. **Props are the source of truth.** Call `useComponentProps()`, then bind
   `value={live.fieldName}`. That is the whole data path.
2. **One editable field → one SDK binding.** Each `<Field>`, `<RichText>`, or
   `<Image>` binds exactly one prop name. Never `a || b || c` across CMS image
   (or text) fields — Composer can only map to the value you pass. If live
   display should differ from what is editable, keep the single binding and
   branch UI with `isComposerPreview()` (e.g. show the editable field in
   Composer; use a different presentation on the live site). Do not invent
   multi-field fallbacks so “something shows up.”
3. **Do not reconstruct entities.** No `resolvePost` / `normalizePost` /
   `live.* || post.*` merges for rendering. If Composer/Edge projects a shape,
   use that shape. Fix Composer field bindings — do not paper over them in the site.
4. **Do not dual-path.** One prop name, one binding. Prefer flat fields the
   component is registered with (`title`, `body`, `landscapeImage`), not a
   hand-rolled nested `post` object plus fallbacks.
5. **Use SDK primitives only:**
   - Text → `<Field value={live.x} />`
   - Markdown → `<RichText value={live.body} />` (Composer); site markdown
     renderer only when live site styling requires it and `isComposerPreview()`
     is false
   - Images → `<Image value={live.landscapeImage} />` (not Next/Image for
     editable CMS images) — always that one prop, never landscape||main||…
6. **Never pass `name` with `value`.** Prefer `value={…}`; `name` is deprecated.
7. **Composer empty fields must still render.** Do not `return null` for missing
   content when `isComposerPreview()` is true. Null-check only on the live site.
8. **Do not fix Composer/product bugs in this app** (e.g. wrapping the site in
   `TooltipProvider` because Composer crashed). Fix or uptick Composer/SDK.
9. **Do not reimplement the SDK** — no local catalogs, registries,
   ComponentRenderer frameworks, Edge clients, or parallel preview context.
10. **`renderAmplifyComponent` stays thin:** map `component_id` → component,
    wrap `ComponentContextProvider`, return. One new map entry per placeable.

## Placeable checklist

When adding or editing a placeable:

- [ ] Props interface matches Composer field names (no shadow “resolved” type)
- [ ] `const live = useComponentProps<YourProps>()`
- [ ] Every editable field is `<Field|RichText|Image value={live.…} />` — **one prop each**, no `||` across fields
- [ ] No site-side fetch/normalize of Amplify content for that component
- [ ] Empty-state null checks gated with `!isComposerPreview()`
- [ ] `component_id` registered in Composer; one entry in `renderAmplifyComponent`

## Correct pattern

```tsx
"use client";
import { Field, Image, RichText, isComposerPreview, useComponentProps } from "@amplifyup/sdk/react";
import type { IArticleDetail } from "@/interfaces/IArticleDetail";

export function ArticleDetail() {
  const live = useComponentProps<IArticleDetail>();
  const inComposer = isComposerPreview();

  return (
    <article>
      <Image value={live.landscapeImage} className="…" />
      <h1><Field value={live.title} /></h1>
      {inComposer ? (
        <RichText value={live.body} className="prose" />
      ) : live.body ? (
        <YourSiteMarkdown>{live.body}</YourSiteMarkdown>
      ) : null}
    </article>
  );
}
```

## Forbidden patterns

```tsx
// ❌ Reconstructing / merging shapes the SDK already projected
const post = resolveAmplifyPost(fieldPost, componentProps);
const image = live.landscapeImage || post.landscapeImage || post.mainImage;

// ❌ Multi-field fallbacks — Composer cannot know which field to map
<Image value={live.landscapeImage || live.mainImage || live.socialImage} />

// ❌ Nulling out fields Composer needs to edit
if (!live.title) return null;

// ❌ Deprecated name API / fighting value inference
<Field name="title" value={live.title} />
<Image name="landscapeImage" />

// ❌ Site-owned Amplify infrastructure
fetch("/v1/resolve")
const LocalComposerContext = createContext(…)
const catalog = { Hero, ArticleDetail }
```

## Composer vs live display

Editable binding stays one prop. Branch presentation only:

```tsx
const live = useComponentProps<IArticleDetail>();
const inComposer = isComposerPreview();

// Always bind landscapeImage — Composer maps to this field only
{(hasLandscapeImage(live.landscapeImage) || inComposer) && (
  <Image value={live.landscapeImage} className="…" />
)}
```

Do not bind `mainImage` as a silent fallback for the same slot. If the live
site needs a different visual when empty, gate that with `!inComposer` — still
do not point `<Image>` at multiple fields.

## Page wiring (allowed)

- `AmplifyPageContent` + thin `renderAmplifyComponent`
- `fetchPageConfigServer` / `generateAmplifyStaticParams` from `@amplifyup/sdk/server`
- Provider `pageContext` for From-page routes (pass at provider init, not after paint)
- `queryContent` for visitor-driven lists/search — do not embed CMS queries in the site

## When something “doesn't load”

1. Check Composer field binding / Deploy / Edge projection for that prop name.
2. Confirm the placeable uses `value={live.exactPropName}`.
3. Uptick `@amplifyup/sdk` if the API moved.
4. Do **not** add a second resolver, fallback object, or prop-shape guesser.
