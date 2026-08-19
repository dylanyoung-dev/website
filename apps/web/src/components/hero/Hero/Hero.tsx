"use client";

import Link from "next/link";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Field, useComponentProps } from "@amplifyup/sdk/react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InsightsFilterBar } from "@/components/insights";
import { PageShell } from "@/components/ui/Layout/PageShell";
import { cn } from "@/lib/utils";
import type {
  HeroProps,
  IHeroAction,
  IHeroBadge,
  IHeroSecondaryLink,
} from "@/interfaces/IHero";

function hasHref(value?: string): value is string {
  return Boolean(value?.trim());
}

function completeActions(actions: IHeroAction[] | undefined): IHeroAction[] {
  if (!Array.isArray(actions)) return [];
  return actions.filter(
    (action) => hasHref(action?.href) && Boolean(action.label?.trim())
  );
}

function completeSecondaryLinks(
  links: IHeroSecondaryLink[] | undefined
): IHeroSecondaryLink[] {
  if (!Array.isArray(links)) return [];
  return links.filter(
    (link) => hasHref(link?.href) && Boolean(link.label?.trim())
  );
}

function HeroDotGrid({ stronger }: { stronger?: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        stronger ? "opacity-[0.45] dark:opacity-[0.18]" : "opacity-[0.45] dark:opacity-[0.2]"
      )}
      aria-hidden
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}
    />
  );
}

function HeroNebulaBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute -right-[20%] -bottom-[35%] h-[32rem] w-[42rem] rounded-full opacity-90 dark:opacity-100 md:-right-[12%] md:h-[40rem] md:w-[52rem]"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, hsl(262 85% 62% / 0.28), hsl(270 70% 50% / 0.12) 45%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute -right-[5%] bottom-[-20%] h-[22rem] w-[28rem] rounded-full opacity-80 dark:opacity-100 md:h-[28rem] md:w-[36rem]"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, hsl(248 80% 65% / 0.22), transparent 65%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute right-[18%] -bottom-[10%] h-56 w-72 rounded-full opacity-70 dark:opacity-90 md:h-64 md:w-96"
        style={{
          background:
            "radial-gradient(circle at center, hsl(280 75% 55% / 0.18), transparent 70%)",
          filter: "blur(32px)",
        }}
      />
      <div
        className="absolute left-1/2 top-[42%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 dark:opacity-100 md:h-80 md:w-80"
        style={{
          background:
            "radial-gradient(circle at center, hsl(262 85% 60% / 0.16), transparent 68%)",
          filter: "blur(36px)",
        }}
      />
      <div
        className="absolute left-[42%] top-[58%] h-48 w-56 rounded-full opacity-70 dark:opacity-90 md:h-56 md:w-72"
        style={{
          background:
            "radial-gradient(circle at 40% 50%, hsl(270 75% 55% / 0.14), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 55% 50% at 88% 88%, hsl(262 90% 65% / 0.35), transparent 60%),
            radial-gradient(ellipse 40% 45% at 72% 95%, hsl(280 80% 55% / 0.22), transparent 55%),
            radial-gradient(ellipse 45% 40% at 52% 55%, hsl(262 85% 62% / 0.18), transparent 60%),
            radial-gradient(ellipse 35% 40% at 95% 70%, hsl(230 70% 55% / 0.15), transparent 55%)
          `,
        }}
      />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-background via-background/40 to-transparent" />
    </div>
  );
}

function HeroActionButton({
  action,
  size = "default",
}: {
  action: IHeroAction;
  size?: "default" | "lg";
}) {
  const href = action.href?.trim();
  if (!href || !action.label?.trim()) return null;

  const buttonVariant =
    action.style === "outline"
      ? "outline"
      : action.style === "ghost"
        ? "ghost"
        : "default";

  const isPrimary = !action.style || action.style === "primary";

  return (
    <Button
      asChild
      size={size}
      variant={buttonVariant}
      className={cn(
        isPrimary && "shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25"
      )}
    >
      <Link
        href={href}
        className="no-underline"
        target={action.openInNewTab ? "_blank" : undefined}
        rel={action.openInNewTab ? "noopener noreferrer" : undefined}
      >
        {action.label}
        {isPrimary ? <ArrowRight className="ml-1 h-4 w-4" /> : null}
      </Link>
    </Button>
  );
}

function SecondaryLinks({ links }: { links: IHeroSecondaryLink[] }) {
  if (!links.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map((link, index) => {
        const href = link.href?.trim();
        if (!href) return null;
        return (
          <Badge
            key={link._key || `${href}-${link.label}-${index}`}
            variant="outline"
            className="rounded-full border-border/80 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
          >
            <Link
              href={href}
              className="no-underline text-inherit hover:text-inherit"
            >
              {link.label}
            </Link>
          </Badge>
        );
      })}
    </div>
  );
}

function InsightsHeroSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname() || "/insights/";
  const searchQuery = searchParams.get("q")?.trim() || "";
  const searchPath = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return (
    <InsightsFilterBar
      key={searchQuery}
      showSearch
      showCategoryFilters={false}
      searchQuery={searchQuery}
      searchPath={searchPath}
    />
  );
}
export function Hero({ variant: variantProp }: Pick<HeroProps, "variant">) {
  const live = useComponentProps<HeroProps>();
  const variant = live.variant ?? variantProp ?? "default";
  const isInsights = variant === "insights";

  return (
    <section className="relative overflow-hidden border-b bg-background">
      <HeroDotGrid stronger={!isInsights} />
      {!isInsights ? <HeroNebulaBackdrop /> : null}
      {isInsights ? (
        <div
          className="pointer-events-none absolute -right-12 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20 md:h-80 md:w-80"
          aria-hidden
        />
      ) : null}

      <PageShell
        className={cn(
          "relative",
          isInsights ? "py-10 md:py-14 lg:py-16" : "py-14 md:py-20 lg:py-24"
        )}
      >
        <Field
          name="badge"
          render={(badge: IHeroBadge | undefined) => {
            if (!badge?.text) return null;
            return (
              <Badge
                variant="outline"
                className="mb-6 gap-2 border-primary/25 bg-background/80 px-3 py-1.5 text-primary backdrop-blur-sm"
              >
                {badge.showPulse !== false ? (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                ) : null}
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
                  {badge.text}
                </span>
              </Badge>
            );
          }}
        />

        <Field
          name="eyebrow"
          render={(eyebrow) =>
            eyebrow ? (
              <p className="mb-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                {String(eyebrow)}
              </p>
            ) : null
          }
        />

        <h1
          className={cn(
            "font-bold tracking-tight text-foreground",
            isInsights
              ? "max-w-3xl text-3xl leading-[1.15] md:text-4xl lg:text-5xl"
              : "max-w-4xl text-4xl leading-[1.1] md:text-5xl lg:text-[3.25rem]"
          )}
        >
          <Field name="heading" fallback="Untitled" />
        </h1>

        <Field
          name="subtitle"
          render={(subtitle) =>
            subtitle ? (
              <p
                className={cn(
                  "text-muted-foreground",
                  isInsights
                    ? "mt-2 text-base md:text-lg"
                    : "mt-3 text-xl md:text-2xl"
                )}
              >
                {String(subtitle)}
              </p>
            ) : null
          }
        />

        <Field
          name="description"
          render={(description) =>
            description ? (
              <p
                className={cn(
                  "max-w-2xl leading-relaxed text-muted-foreground",
                  isInsights
                    ? "mt-4 text-base md:text-lg"
                    : "mt-6 text-lg md:text-xl"
                )}
              >
                {String(description)}
              </p>
            ) : null
          }
        />

        {completeActions(live.actions).length > 0 ||
        completeSecondaryLinks(live.secondaryLinks).length > 0 ? (
          <div
            className={cn(
              "flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center",
              isInsights ? "mt-8" : "mt-9"
            )}
          >
            <Field
              name="actions"
              render={(actions: IHeroAction[] | undefined) => {
                const actionList = completeActions(actions);
                if (!actionList.length) return null;
                return (
                  <div className="flex flex-wrap items-center gap-3">
                    {actionList.map((action, index) => (
                      <HeroActionButton
                        key={
                          action._key ||
                          `${action.href}-${action.label}-${index}`
                        }
                        action={action}
                        size={isInsights ? "default" : "lg"}
                      />
                    ))}
                  </div>
                );
              }}
            />
            <Field
              name="secondaryLinks"
              render={(secondaryLinks: IHeroSecondaryLink[] | undefined) => {
                const links = completeSecondaryLinks(secondaryLinks);
                if (!links.length) return null;
                return <SecondaryLinks links={links} />;
              }}
            />
          </div>
        ) : null}
        {isInsights ? (
          <Suspense
            fallback={
              <InsightsFilterBar
                showSearch
                showCategoryFilters={false}
                searchQuery=""
              />
            }
          >
            <InsightsHeroSearch />
          </Suspense>
        ) : null}
      </PageShell>
    </section>
  );
}
