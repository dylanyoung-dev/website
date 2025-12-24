import { FC } from "react";
import { ISeries } from "@/interfaces/ISeries";
import { SeriesCard } from "../SeriesCard/SeriesCard";

interface SeriesListProps {
  series: ISeries[];
}

export const SeriesList: FC<SeriesListProps> = ({ series }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">
      {series.map((item: ISeries) => (
        <SeriesCard key={item._id} series={item} />
      ))}
    </div>
  );
};
