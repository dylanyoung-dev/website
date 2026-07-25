"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { IPost } from "@/interfaces";
import type { InsightsCategoryFilter } from "@/lib/insights-filters";

export interface InsightsPageData {
  featuredPost?: IPost;
  listPosts: IPost[];
  searchQuery: string;
  isSearching: boolean;
  showFeatured: boolean;
  resultCount: number;
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  categoryFilters: InsightsCategoryFilter[];
}

const InsightsPageDataContext = createContext<InsightsPageData | null>(null);

export function InsightsPageDataProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: InsightsPageData;
}) {
  return (
    <InsightsPageDataContext.Provider value={value}>
      {children}
    </InsightsPageDataContext.Provider>
  );
}

export function useInsightsPageData(): InsightsPageData {
  const ctx = useContext(InsightsPageDataContext);
  if (!ctx) {
    throw new Error(
      "useInsightsPageData must be used within InsightsPageDataProvider"
    );
  }
  return ctx;
}
