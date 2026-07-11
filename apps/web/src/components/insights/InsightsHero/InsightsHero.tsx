import type { ReactNode } from "react";
import { InsightsFilterBar } from "../InsightsFilterBar";
import { PageShell } from "@/components/ui/Layout/PageShell";
import { InsightsCategoryFilter } from "@/lib/insights-filters";

interface InsightsHeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  showSearch?: boolean;
  showCategoryFilters?: boolean;
  searchQuery?: string;
  activeCategoryHref?: string;
  categories?: InsightsCategoryFilter[];
  searchPath?: string;
  searchPlaceholder?: string;
  action?: ReactNode;
}

export function InsightsHero({
  eyebrow = "Insights",
  title,
  description,
  showSearch = true,
  showCategoryFilters = true,
  searchQuery,
  activeCategoryHref,
  categories = [],
  searchPath,
  searchPlaceholder,
  action,
}: InsightsHeroProps) {
  return (
    <section className="relative overflow-hidden border-b bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.2]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-12 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20 md:h-80 md:w-80"
        aria-hidden
      />

      <PageShell className="relative py-10 md:py-14 lg:py-16">
        <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-foreground md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>

        {action ? <div className="mt-8">{action}</div> : null}

        {showSearch || showCategoryFilters ? (
          <InsightsFilterBar
            showSearch={showSearch}
            showCategoryFilters={showCategoryFilters}
            searchQuery={searchQuery}
            activeCategoryHref={activeCategoryHref}
            categories={categories}
            searchPath={searchPath}
            searchPlaceholder={searchPlaceholder}
          />
        ) : null}
      </PageShell>
    </section>
  );
}
