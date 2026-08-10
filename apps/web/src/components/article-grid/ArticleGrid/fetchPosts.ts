import type { IPost } from "@/interfaces";
import {
  browserSanityClient,
  isBrowserSanityConfigured,
} from "@/utils/sanity-browser";

const postFields = `{
  ...,
  "mainImageUrl": mainImage.asset->url,
  "landscapeImageUrl": landscapeImage.asset->url,
  categories[]->{...},
  tagging[]->{...}
}`;

export interface ArticleGridFetchResult {
  posts: IPost[];
  total: number;
}

export async function fetchQueryPosts(options: {
  pageSize: number;
  page: number;
  categorySlug?: string;
}): Promise<ArticleGridFetchResult> {
  if (!isBrowserSanityConfigured()) {
    return { posts: [], total: 0 };
  }

  const { pageSize, page, categorySlug } = options;
  const start = Math.max(0, (page - 1) * pageSize);
  const end = start + pageSize;
  const hasCategory = Boolean(categorySlug);

  const filter = hasCategory
    ? `*[_type == "post" && defined(slug.current) && $categorySlug in categories[]->slug.current]`
    : `*[_type == "post" && defined(slug.current)]`;

  const params = hasCategory
    ? { categorySlug, start, end }
    : { start, end };

  const [posts, total] = await Promise.all([
    browserSanityClient.fetch<IPost[]>(
      `${filter} | order(publishedAt desc)[$start...$end]${postFields}`,
      params
    ),
    browserSanityClient.fetch<number>(`count(${filter})`, params),
  ]);

  return { posts: posts ?? [], total: total ?? 0 };
}

export async function fetchCuratedPosts(
  postSlugs: string[]
): Promise<ArticleGridFetchResult> {
  if (!isBrowserSanityConfigured() || !postSlugs.length) {
    return { posts: [], total: 0 };
  }

  const posts = await browserSanityClient.fetch<IPost[]>(
    `*[_type == "post" && defined(slug.current) && slug.current in $slugs]${postFields}`,
    { slugs: postSlugs }
  );

  const bySlug = new Map(
    (posts ?? []).map((post) => [post.slug?.current, post] as const)
  );
  const ordered = postSlugs
    .map((slug) => bySlug.get(slug))
    .filter((post): post is IPost => Boolean(post));

  return { posts: ordered, total: ordered.length };
}
