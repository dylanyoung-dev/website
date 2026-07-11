import Link from "next/link";
import { format } from "date-fns";
import {
  ExternalLink,
  FileText,
  Presentation,
  Video,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getContributionsByType,
  MVP_CONTRIBUTION_TYPE_LABELS,
  MVP_CONTRIBUTION_TYPE_ORDER,
  MVP_CONTRIBUTIONS,
  type MvpContribution,
  type MvpContributionType,
} from "@/lib/mvp-tracker";
import { cn } from "@/lib/utils";

const TYPE_ICONS: Record<MvpContributionType, LucideIcon> = {
  blog: FileText,
  video: Video,
  presentation: Presentation,
};

const TYPE_STYLES: Record<MvpContributionType, string> = {
  blog: "border-sky-500/20 bg-sky-500/5 text-sky-700 dark:text-sky-300",
  video: "border-violet-500/20 bg-violet-500/5 text-violet-700 dark:text-violet-300",
  presentation: "border-amber-500/20 bg-amber-500/5 text-amber-700 dark:text-amber-300",
};

function ContributionCard({ contribution }: { contribution: MvpContribution }) {
  const Icon = TYPE_ICONS[contribution.type];
  const isExternal = contribution.external ?? contribution.url.startsWith("http");

  return (
    <Card className="h-full border-border/80 transition-colors hover:border-primary/30">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <Badge
            variant="outline"
            className={cn("gap-1.5 shrink-0", TYPE_STYLES[contribution.type])}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {MVP_CONTRIBUTION_TYPE_LABELS[contribution.type]}
          </Badge>
          <time
            dateTime={contribution.date}
            className="shrink-0 text-xs text-muted-foreground tabular-nums"
          >
            {format(new Date(contribution.date), "MMM d, yyyy")}
          </time>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold leading-snug">
            {isExternal ? (
              <a
                href={contribution.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-1.5 hover:text-primary"
              >
                <span>{contribution.title}</span>
                <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 opacity-70" />
              </a>
            ) : (
              <Link href={contribution.url} className="hover:text-primary">
                {contribution.title}
              </Link>
            )}
          </h3>
          {contribution.description ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {contribution.description}
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

function ContributionGroup({
  type,
  contributions,
}: {
  type: MvpContributionType;
  contributions: MvpContribution[];
}) {
  if (!contributions.length) {
    return null;
  }

  const Icon = TYPE_ICONS[type];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" aria-hidden />
        <h3 className="text-lg font-semibold">
          {MVP_CONTRIBUTION_TYPE_LABELS[type]}s
        </h3>
        <Badge variant="secondary" className="tabular-nums">
          {contributions.length}
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {contributions.map((contribution) => (
          <ContributionCard key={contribution.id} contribution={contribution} />
        ))}
      </div>
    </div>
  );
}

export function MvpTracker() {
  const grouped = getContributionsByType(MVP_CONTRIBUTIONS);
  const total = MVP_CONTRIBUTIONS.length;

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            MVP Tracker
          </h2>
          <Badge variant="secondary" className="tabular-nums">
            {total} contributions
          </Badge>
        </div>
        <p className="max-w-3xl text-muted-foreground">
          Community contributions I&apos;m tracking for the Sitecore MVP program —
          blogs, videos, presentations, and more. Curated manually here for now.
        </p>
      </div>

      <div className="space-y-10">
        {MVP_CONTRIBUTION_TYPE_ORDER.map((type) => (
          <ContributionGroup
            key={type}
            type={type}
            contributions={grouped[type]}
          />
        ))}
      </div>
    </section>
  );
}
