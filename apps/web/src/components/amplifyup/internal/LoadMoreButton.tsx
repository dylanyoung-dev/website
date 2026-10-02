"use client";

import { useInComposer } from "@amplifyup/sdk/react";
import { Button } from "@/components/ui/button";

export function LoadMoreButton({
  show,
  loading,
  onClick,
}: {
  show: boolean;
  loading: boolean;
  onClick: () => void;
}) {
  const inComposer = useInComposer();
  if (!show || inComposer) return null;
  return (
    <div className="flex justify-center pt-2">
      <Button variant="outline" onClick={onClick} disabled={loading}>
        {loading ? "Loading…" : "Load more"}
      </Button>
    </div>
  );
}
