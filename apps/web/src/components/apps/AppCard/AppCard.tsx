import Link from "next/link";
import { ArrowUpRight, Boxes } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IAppProject } from "@/lib/apps-catalog";
import { cn } from "@/lib/utils";

interface AppCardProps {
  app: IAppProject;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden border-border/80 transition-shadow hover:shadow-md">
      <div
        className={cn("h-1.5 w-full shrink-0", app.accentClassName)}
        aria-hidden
      />
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-2">
            {app.eyebrow ? (
              <Badge
                variant="secondary"
                className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider"
              >
                {app.eyebrow}
              </Badge>
            ) : null}
            <h3 className="text-xl font-bold leading-tight tracking-tight text-foreground">
              {app.name}
            </h3>
          </div>
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              app.iconClassName ?? "bg-primary/10 text-primary"
            )}
          >
            <Boxes className="h-5 w-5" aria-hidden />
          </div>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {app.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {app.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="border-t border-border/80 pt-4">
          <Link
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary no-underline transition-opacity hover:opacity-80"
          >
            Visit website
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
