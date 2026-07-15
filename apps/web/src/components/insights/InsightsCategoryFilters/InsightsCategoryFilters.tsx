"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { InsightsCategoryFilter } from "@/lib/insights-filters";
import { cn } from "@/lib/utils";

const COLLAPSED_COUNT = 5;

interface InsightsCategoryFiltersProps {
  /** Override active pill — e.g. `/insights/` or `/insights/categories/ai/` */
  activeHref?: string;
  categories: InsightsCategoryFilter[];
}

function pillClassName(isActive: boolean) {
  return cn(
    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors no-underline",
    isActive
      ? "border-foreground bg-foreground text-background hover:text-background"
      : "border-border/80 bg-background/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
  );
}

export function InsightsCategoryFilters({
  activeHref,
  categories,
}: InsightsCategoryFiltersProps) {
  const pathname = usePathname();
  const normalizedPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const currentHref = activeHref ?? normalizedPath;
  const [expanded, setExpanded] = useState(false);

  const hasMore = categories.length > COLLAPSED_COUNT;

  const visibleCategories = useMemo(() => {
    if (expanded || !hasMore) {
      return categories;
    }

    const collapsed = categories.slice(0, COLLAPSED_COUNT);
    const activeIndex = categories.findIndex(({ href }) => href === currentHref);

    if (activeIndex < COLLAPSED_COUNT) {
      return collapsed;
    }

    const activeCategory = categories[activeIndex];
    return [...collapsed.slice(0, COLLAPSED_COUNT - 1), activeCategory];
  }, [categories, currentHref, expanded, hasMore]);

  return (
    <div className="flex flex-wrap gap-2">
      {visibleCategories.map(({ label, href }) => {
        const isActive = currentHref === href;

        return (
          <Link key={href} href={href} className={pillClassName(isActive)}>
            {label}
          </Link>
        );
      })}

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className={pillClassName(false)}
          aria-expanded={expanded}
          aria-label={expanded ? "Show fewer categories" : "Show more categories"}
        >
          {expanded ? (
            "Less"
          ) : (
            <MoreHorizontal className="h-4 w-4" aria-hidden />
          )}
        </button>
      ) : null}
    </div>
  );
}
