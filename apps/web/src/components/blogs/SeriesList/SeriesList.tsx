import { ISeries } from "@/interfaces/ISeries";
import { SeriesCard } from "../SeriesCard/SeriesCard";

interface SeriesListProps {
  series: ISeries[];
}

export function SeriesList({ series }: SeriesListProps) {
  if (series.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No series available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {series.map((item: ISeries) => (
        <SeriesCard key={item._id} series={item} />
      ))}
    </div>
  );
}
