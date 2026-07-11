"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { InsightsCategoryFilter } from "@/lib/insights-filters";
import { InsightsCategoryFilters } from "../InsightsCategoryFilters";

interface InsightsFilterBarProps {
  searchQuery?: string;
  showSearch?: boolean;
  showCategoryFilters?: boolean;
  activeCategoryHref?: string;
  categories?: InsightsCategoryFilter[];
  searchPath?: string;
  searchPlaceholder?: string;
}

export function InsightsFilterBar({
  searchQuery = "",
  showSearch = true,
  showCategoryFilters = true,
  activeCategoryHref,
  categories = [],
  searchPath = "/insights/",
  searchPlaceholder = "Search posts...",
}: InsightsFilterBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(searchQuery);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();

    if (trimmed) {
      router.push(`${searchPath}?q=${encodeURIComponent(trimmed)}`);
      return;
    }

    router.push(searchPath);
  }

  return (
    <div className="mt-8 space-y-4">
      {showSearch ? (
        <form onSubmit={handleSearch} className="relative max-w-md">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="relative h-11 rounded-full border-border/80 bg-background/80 pl-10 shadow-sm backdrop-blur-sm [&::-webkit-search-cancel-button]:hidden"
            aria-label={searchPlaceholder}
          />
        </form>
      ) : null}

      {showCategoryFilters && categories.length > 0 ? (
        <InsightsCategoryFilters
          activeHref={activeCategoryHref}
          categories={categories}
        />
      ) : null}
    </div>
  );
}
