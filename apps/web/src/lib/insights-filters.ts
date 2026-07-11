import { ICategory } from "@/interfaces";

export const INSIGHTS_ALL_HREF = "/insights/";

export interface InsightsCategoryFilter {
  label: string;
  href: string;
}

export function buildInsightsCategoryFilters(
  categories: Array<ICategory & { postCount?: number }>
): InsightsCategoryFilter[] {
  const sortedCategories = [...categories].sort((a, b) => {
    const countDiff = (b.postCount ?? 0) - (a.postCount ?? 0);
    if (countDiff !== 0) {
      return countDiff;
    }

    return a.title.localeCompare(b.title);
  });

  return [
    { label: "All", href: INSIGHTS_ALL_HREF },
    ...sortedCategories.map((category) => ({
      label: category.title,
      href: `/insights/categories/${category.slug.current}/`,
    })),
  ];
}
