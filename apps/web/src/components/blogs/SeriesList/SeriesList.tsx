import { BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ISeries } from "@/interfaces/ISeries";
import { SeriesCard } from "../SeriesCard/SeriesCard";

interface SeriesListProps {
  series: ISeries[];
}

export function SeriesList({ series }: SeriesListProps) {
  if (series.length === 0) {
    return (
      <Card className="border-border/80">
        <CardContent className="py-12 text-center">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground/60" aria-hidden />
          <p className="text-muted-foreground">No series available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold md:text-2xl">All Series</h2>
          <p className="text-sm text-muted-foreground">
            Connected articles that tell a complete story
          </p>
        </div>
        <span className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
          Sorted by newest
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {series.map((item) => (
          <SeriesCard key={item._id} series={item} />
        ))}
      </div>
    </section>
  );
}
