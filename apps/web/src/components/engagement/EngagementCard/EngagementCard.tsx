import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IEngagement } from "@/interfaces/IEngagement";

interface EngagementCardProps {
  engagement: IEngagement;
}

export function EngagementCard({ engagement }: EngagementCardProps) {
  const relatedCount = engagement.posts?.length ?? 0;
  const metaLabel = engagement.location
    ? engagement.location
    : relatedCount > 0
      ? `${relatedCount} related ${relatedCount === 1 ? "article" : "articles"}`
      : "Speaking";

  return (
    <Card className="group h-full overflow-hidden border-border/80 transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-0">
        <Link
          href={`/speaking/${engagement.slug.current}/`}
          className="flex h-full flex-col no-underline"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {engagement.thumbnailUrl ? (
              <Image
                src={engagement.thumbnailUrl}
                alt={engagement.thumbnail?.alt ?? engagement.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/70 to-primary/40"
                aria-hidden
              >
                <Mic className="h-10 w-10 text-white/80" />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
              {metaLabel}
            </span>
            <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
              {engagement.title}
            </h3>
            {engagement.short_description ? (
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                {engagement.short_description}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t px-5 py-3.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>View session</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
