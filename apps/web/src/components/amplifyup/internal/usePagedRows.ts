"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  nextPageSpec,
  queryContent,
  searchSpec,
  type ListRow,
  type QueryPagination,
} from "@amplifyup/sdk/react";

const TRACKING_ID = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID?.trim() || "";

function merge(
  base: QueryPagination,
  result: { hasMore: boolean; limit: number; offset: number; nextOffset: number }
): QueryPagination {
  return {
    ...base,
    hasMore: result.hasMore,
    limit: result.limit,
    offset: result.offset,
    nextOffset: result.nextOffset,
  };
}

/**
 * Edge list rows + `?q=` search + load more, always via the published spec
 * (`searchSpec` / `nextPageSpec`) so rows stay editable in Composer.
 * Same pattern as ArticleGrid. Callers must sit under a <Suspense> boundary
 * (useSearchParams).
 */
export function usePagedRows<T extends Record<string, unknown>>(
  initial: ListRow<T>[],
  pagination: QueryPagination | undefined,
  searchField?: string
) {
  const route = usePathname().replace(/\/+$/, "") || "/";
  const params = useSearchParams();
  const q = searchField ? params.get("q")?.trim() || "" : "";

  const [searchRows, setSearchRows] = useState<ListRow<T>[] | null>(null);
  const [appended, setAppended] = useState<ListRow<T>[]>([]);
  const [meta, setMeta] = useState<QueryPagination | undefined>(pagination);
  const [searching, setSearching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    setMeta(pagination);
    setAppended([]);
  }, [pagination]);

  useEffect(() => {
    if (!q || !searchField || !TRACKING_ID || !pagination) {
      setSearchRows(null);
      setSearching(false);
      return;
    }
    let cancelled = false;
    setSearching(true);
    setAppended([]);
    queryContent<T>({
      trackingId: TRACKING_ID,
      route,
      spec: searchSpec(pagination, searchField, q),
    })
      .then((result) => {
        if (cancelled) return;
        setSearchRows(result.results as ListRow<T>[]);
        setMeta(merge(pagination, result));
      })
      .catch(() => {
        if (cancelled) return;
        setSearchRows([]);
        setMeta({ ...pagination, hasMore: false });
      })
      .finally(() => {
        if (!cancelled) setSearching(false);
      });
    return () => {
      cancelled = true;
    };
  }, [q, searchField, pagination, route]);

  const loadMore = useCallback(async () => {
    if (!TRACKING_ID || !meta?.hasMore || loadingMore) return;
    setLoadingMore(true);
    try {
      const result = await queryContent<T>({
        trackingId: TRACKING_ID,
        route,
        spec: nextPageSpec(meta),
      });
      const rows = result.results as ListRow<T>[];
      if (searchRows) setSearchRows([...searchRows, ...rows]);
      else setAppended((prev) => [...prev, ...rows]);
      setMeta(merge(meta, result));
    } catch {
      // Keep current rows; leave hasMore so the user can retry.
    } finally {
      setLoadingMore(false);
    }
  }, [meta, loadingMore, searchRows, route]);

  return {
    rows: searchRows ?? [...initial, ...appended],
    query: q,
    searching,
    loadingMore,
    hasMore: Boolean(meta?.hasMore) && Boolean(TRACKING_ID),
    loadMore,
  };
}
