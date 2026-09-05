---
name: amplifyup-placeables
description: >-
  Build and edit AmplifyUP placeable components without overengineering or
  fighting the SDK. Use when creating or changing placeables, Field/RichText/Image
  bindings, fields envelopes, ArticleDetail/Hero/ArticleGrid, Composer preview,
  renderAmplifyComponent, or anything involving @amplifyup/sdk.
---

# AmplifyUP placeables — trust the SDK

AmplifyUP already owns layout resolve, Composer preview, field overlays,
personalization, and projection. This site only builds React placeables and
thin page wiring.

Before writing Amplify code: read current SDK types in
`node_modules/@amplifyup/sdk/dist/react.d.ts` and
`AmplifyRenderer-*.d.ts`. Do not invent helpers the SDK already provides.

Also see `.cursor/rules/amplifyup-sdk.mdc`.

## Hard rules

1. **`fields` envelopes are the source of truth.** Components receive
   `LayoutComponentProps<T>` → `{ fields: Fields<T>, …settings }`.
   Bind with `<Field field={fields.x} />` (same for `RichText` / `Image`).
   Read display-only values as `fields.x.value`.
2. **Do not use `useComponentProps`.** Removed. Take `fields` from props.
3. **Do not use bare `value={live.x}` for CMS fields.** That API is only for
   **computed** values, and then you must pass `name` + `value` together.
   Prefer `field={fields.x}` always for schema-backed content.
4. **One editable field → one SDK binding.** Never `a || b || c` across CMS
   fields. Composer maps to the envelope you pass. If live display should
   differ, keep the single binding and branch with `isComposerPreview()`.
5. **Do not reconstruct entities** (`resolvePost`, `live || post` merges).
   Fix Composer field bindings instead.
6. **Settings stay plain props** (e.g. `variant`, `showFeatured`, `formSource`)
   — they come from `node.settings`, not `fields`.
7. **Composer empty fields must still render.** Null-check only when
   `!isComposerPreview()`. Empty Field/Image collapses on the live site;
   Composer keeps them clickable.
8. **Do not fix Composer/product bugs in this app.** Fix Composer/SDK or uptick.
9. **Do not reimplement the SDK.** No local catalogs, registries, Edge clients,
   or parallel preview context.
10. **`renderAmplifyComponent` stays thin:** map `component_id` → component,
    wrap `ComponentContextProvider`, return.

## Placeable checklist

- [ ] Content shape `T` matches Composer field names
- [ ] Component props: `LayoutComponentProps<T> & Settings`
- [ ] Editable content: `<Field|RichText|Image field={fields.…} />` — one each
- [ ] Display reads: `fields.x.value` (never render `{fields.x}` as text)
- [ ] Nested objects (e.g. badge) use leaf envelopes: `fields.badge.text`
- [ ] Arrays/lists: `field={fields.posts}` + `render`, or `fields.posts.value`
- [ ] Settings are plain props, not Field-wrapped
- [ ] Empty-state null checks gated with `!isComposerPreview()`
- [ ] One `renderAmplifyComponent` map entry; `component_id` in Composer

## Correct pattern

```tsx
"use client";
import {
  Field,
  Image,
  RichText,
  isComposerPreview,
  type LayoutComponentProps,
  type ImageValue,
} from "@amplifyup/sdk/react";

type ArticleFields = {
  title: string;
  body?: string;
  landscapeImage?: ImageValue;
};

export function ArticleDetail({ fields }: LayoutComponentProps<ArticleFields>) {
  const inComposer = isComposerPreview();
  const body = fields.body?.value;

  return (
    <article>
      <Image field={fields.landscapeImage} className="…" />
      <h1><Field field={fields.title} /></h1>
      {inComposer ? (
        <RichText field={fields.body} className="prose" />
      ) : body ? (
        <YourSiteMarkdown>{body}</YourSiteMarkdown>
      ) : null}
    </article>
  );
}
```

## Forbidden patterns

```tsx
// ❌ Removed API
const live = useComponentProps();
<Field value={live.title} />

// ❌ Rendering the envelope object, not its value
<p>{fields.description}</p> // wrong — use fields.description.value or <Field />

// ❌ Multi-field fallbacks
<Image field={fields.landscapeImage || fields.mainImage} />

// ❌ Entity reconstruction
const post = resolveAmplifyPost(…)

// ❌ Computed value without name
<Field value={computed} /> // must be value + name together
```

## Page wiring (allowed)

- `AmplifyPageContent` + thin `renderAmplifyComponent`
- `fetchPageConfigServer` / `generateAmplifyStaticParams` from `@amplifyup/sdk/server`
- Provider `pageContext` for From-page routes (at provider init)
- `queryContent` for visitor-driven lists — list row strings use `value={…}`
  (not field envelopes); see SDK docs
- Unwrap envelopes for SSG helpers with `isFieldEnvelope` / `unwrapAmplifyFields`

## When something “doesn't load”

1. Confirm Composer field name matches `fields.exactName`.
2. Confirm the placeable uses `field={fields.exactName}`.
3. Deploy the route; uptick `@amplifyup/sdk` if the API moved.
4. Do **not** add resolvers or multi-field fallbacks.
