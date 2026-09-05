---
name: amplifyup-placeables
description: >-
  Build and edit AmplifyUP placeable components without overengineering or
  fighting the SDK. Use when creating or changing placeables, Field/RichText/Image/
  Slot bindings, ListRow lists, fields envelopes, ArticleDetail/Hero/ArticleGrid,
  Composer preview, queryContent, pagination, renderAmplifyComponent, or @amplifyup/sdk.
---

# AmplifyUP SDK — placeables & site wiring

Canonical docs: [npm `@amplifyup/sdk`](https://www.npmjs.com/package/@amplifyup/sdk) ·
[Lists & queries](https://amplifyup.ai/docs/developers/lists) · always-on rule
`.cursor/rules/amplifyup-sdk.mdc`.

Before writing Amplify code, read current types in
`node_modules/@amplifyup/sdk/dist/react.d.ts` and `types-*.d.ts` (APIs move).

AmplifyUP owns layout resolve, Composer preview, field envelopes, personalization,
page context, and tracking. This site only builds **placeable React components**
and **thin page wiring**.

---

## Mental model

```
Composer (author) → Deploy → Edge /v1/resolve → AmplifyPageContent
  → renderAmplifyComponent → ComponentContextProvider → YourPlaceable({ fields, …settings })
```

Every content entry is a **field envelope**, identical on live, draft, and Composer:

```ts
fields.heading  // → { value: '…', name: 'heading', ref? }
fields.cover    // → { value: { url, alt } | null, name: 'cover' }
```

List rows are **`ListRow<T>`** = enveloped fields + plain `id`:

```ts
fields.posts.value[0]
// → { id: 'post-1', title: { value, name, ref? }, landscapeImage: { value, name }, slug: '…' }
```

- Identifiers stay plain on the row: `id`, `slug`, `_id`, `_type`, `_key`, …
- Content fields on the row are envelopes — use `<Field|Image|RichText field={post.title} />`
- Never invent write targets (`ref`) yourself

---

## Hard rules

1. **Trust envelopes / list rows.** Never reconstruct entities or merge `live || post`.
2. **Editable → SDK component; non-visible → `.value` (or plain id/slug).**
3. **One field → one binding.** Never `fields.a || fields.b` in `field={…}`.
4. **`<Field>` is scalar-only.** Never pass a list or a whole row.
5. **Object arrays are list rows** — map `fields.posts.value`, render with Field/Image
   on each row. **No `<Collection>`** (removed). Scalar lists (`string[]`) stay
   `fields.tags.value`.
6. **Computed display:** `value={…}` **and** `name={fields.x.name}` together.
7. **Empty hide:** `if (!fields.x.value && !isComposerPreview()) return null`.
8. **Composer vs live:** `isComposerPreview()` (docs may say `useInComposer`).
   Branch one element, not the whole tree.
9. **Settings** (`variant`, `showFeatured`, `postsPagination`) are plain props.
10. **Search / load more:** `queryContent` + `searchSpec` / `nextPageSpec` from
    `{field}Pagination` (e.g. `postsPagination`). Same row renderer for Edge list
    and query results. Never hand-build `spec`.
11. **Do not reimplement the SDK.**
12. **`renderAmplifyComponent` stays thin.**
13. **Do not fix Composer bugs here** — uptick/fix the SDK.

---

## SDK components

| Component | Use for | Notes |
| --- | --- | --- |
| `<Field field={…} />` | string / number | Text node; wrap with your own tags |
| `<RichText field={…} />` | markdown | Prefer for body/copy |
| `<Image field={…} />` | `ImageValue` | Editable images |
| `<Slot name="…" />` | drop zones | Reads context — no `slots` prop |

```tsx
import {
  Field, RichText, Image, Slot, isComposerPreview,
  queryContent, nextPageSpec, searchSpec,
  type Fields, type ListRow, type QueryPagination, type ImageValue,
} from "@amplifyup/sdk/react";
```

---

## Correct patterns

### List rows (ArticleGrid, CTAs, awards)

```tsx
type Post = { id: string; title: string; slug: string; landscapeImage?: ImageValue };

const posts = fields.posts.value ?? [];
posts.map((post) => (
  <article key={post.id}>
    <Image field={post.landscapeImage} />
    <a href={`/insights/${post.slug}`}>
      <Field field={post.title} />
    </a>
  </article>
));
```

### Paginated list + search + load more

Mark the query connection **paginated** in Composer → sibling prop `postsPagination`
(`{ hasMore, limit, offset, nextOffset, spec }`).

```tsx
export function ArticleGrid({
  fields,
  postsPagination,
}: {
  fields: Fields<{ heading: string; posts: Post[] }>;
  postsPagination?: QueryPagination;
}) {
  // Search (resets to first page of the published connection)
  const hits = await queryContent({
    trackingId,
    route: "/insights",
    spec: searchSpec(postsPagination, "title", term),
  });

  // Load more
  const more = await queryContent({
    trackingId,
    route: "/insights",
    spec: nextPageSpec(postsPagination),
  });

  const posts = hits ?? fields.posts.value ?? [];
  // one renderer for both — rows are ListRow<Post>
}
```

Always start from `postsPagination.spec` via the helpers. Hand-built specs →
read-only rows in Composer.

### Empty gating

```tsx
const inComposer = isComposerPreview();
if (!fields.message.value && !inComposer) return null;
return <Field field={fields.message} />;
```

---

## Forbidden

```tsx
useComponentProps()                    // removed
<Collection …>                         // removed in 0.1.64+
<Field field={fields.posts} />         // list
<Field field={post} />                 // whole row
<Field field={fields.x} render={…} />  // no render prop
hand-built query spec                  // rows become read-only
{fields.heading} as JSX child
if (!fields.x.value) return null       // without !inComposer
fork entire return on inComposer
resolveAmplifyPost / live || post
```

---

## Placeable checklist

- [ ] Schema field names match `fields.*`
- [ ] Props: `{ fields: Fields<Content> } & Settings` (incl. `postsPagination`)
- [ ] Scalars → Field/RichText/Image; object lists → map `ListRow` + Field on cells
- [ ] `key={post.id}`; `href` from plain `slug` / `.value`
- [ ] Search/load-more via `searchSpec` / `nextPageSpec` only
- [ ] Empty hide uses `&& !isComposerPreview()`
- [ ] Thin `renderAmplifyComponent`; Deploy after Composer binds

---

## Page wiring (allowed)

- `AmplifyUpProvider` + `trackingId`
- `AmplifyPageContent` + thin `renderAmplifyComponent`
- `fetchPageConfigServer` / `generateAmplifyStaticParams` / `listPublishedRoutes`
- `pageContext` at provider init for From-page routes
- `queryContent` / `searchSpec` / `nextPageSpec`
