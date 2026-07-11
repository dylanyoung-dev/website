import { Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IEngagement } from "@/interfaces/IEngagement";
import { EngagementCard } from "../EngagementCard/EngagementCard";

interface EngagementGridProps {
  engagements: IEngagement[];
  title?: string;
  description?: string;
  sortLabel?: string;
  emptyMessage?: string;
}

export function EngagementGrid({
  engagements,
  title = "All Sessions",
  description = "Event pages with slides, recordings, and curated resources",
  sortLabel,
  emptyMessage = "No speaking engagements available yet.",
}: EngagementGridProps) {
  if (engagements.length === 0) {
    return (
      <Card className="border-border/80">
        <CardContent className="py-12 text-center">
          <Mic className="mx-auto mb-3 h-8 w-8 text-muted-foreground/60" aria-hidden />
          <p className="text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {sortLabel ? (
          <span className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
            {sortLabel}
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {engagements.map((engagement) => (
          <EngagementCard key={engagement._id} engagement={engagement} />
        ))}
      </div>
    </section>
  );
}
