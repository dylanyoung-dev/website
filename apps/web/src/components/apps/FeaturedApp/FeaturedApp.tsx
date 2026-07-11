import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { IAppProject } from "@/lib/apps-catalog";
import { cn } from "@/lib/utils";

interface FeaturedAppProps {
  app: IAppProject;
  featureBadge?: string;
}

export function FeaturedApp({ app, featureBadge = "Featured" }: FeaturedAppProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col md:grid md:grid-cols-2 md:items-stretch">
        <div className="flex flex-col justify-between gap-5 p-5 md:order-1 md:p-6 lg:p-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" aria-hidden />
                {featureBadge}
              </Badge>
              {app.eyebrow ? (
                <Badge
                  variant="outline"
                  className="rounded-full border-violet-500/30 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400"
                >
                  {app.eyebrow}
                </Badge>
              ) : null}
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl lg:text-4xl">
                <Link
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground transition-colors hover:text-primary no-underline"
                >
                  {app.name}
                </Link>
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {app.description}
              </p>
            </div>

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
          </div>

          <Link
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary no-underline hover:opacity-80"
          >
            Visit website
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <Link
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group relative flex aspect-[16/10] flex-col justify-end overflow-hidden p-6 md:order-2 md:aspect-auto md:min-h-[240px]",
            "bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 no-underline"
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.35) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative space-y-2">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/80">
              remember · reason · act
            </p>
            <p className="text-lg font-semibold leading-snug text-white md:text-xl">
              Memory, intelligence, and automation for AI agents
            </p>
            <p className="text-sm text-white/80">
              Give your AI a chief of staff
            </p>
          </div>
        </Link>
      </div>
    </article>
  );
}
