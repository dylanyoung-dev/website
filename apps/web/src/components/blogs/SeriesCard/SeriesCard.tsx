import Link from "next/link";
import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ISeries } from "@/interfaces/ISeries";

interface SeriesCardProps {
  series: ISeries;
}

export const SeriesCard: FC<SeriesCardProps> = ({ series }) => {
  return (
    <Card className="group">
      <CardContent className="p-0">
        <Link href={`/insights/series/${series.slug.current}`} className="block">
          <div className="space-y-8 p-6">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">{series.title}</h3>
              <p className="text-sm text-muted-foreground">{series.description}</p>
              <p className="text-sm font-semibold text-accent-foreground uppercase">
                {series.posts.length} posts
              </p>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};
