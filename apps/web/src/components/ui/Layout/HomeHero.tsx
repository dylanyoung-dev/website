import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/interfaces";
import { PageShell } from "./PageShell";

interface HomeHeroProps {
  categories?: Array<Pick<ICategory, "title" | "slug"> & { postCount?: number }>;
}

function HeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Nebula wash — right side + center bleed */}
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

      {/* Mid-hero blooms — pull color toward center */}
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

      {/* Dark-mode intensity boost */}
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

      {/* Soft top fade so content stays crisp */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-background via-background/40 to-transparent" />
    </div>
  );
}

export function HomeHero({ categories = [] }: HomeHeroProps) {
  const heroCategories = categories
    .filter((category) => category.slug?.current)
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.18]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <HeroBackdrop />

      <PageShell className="relative py-14 md:py-20 lg:py-24">
        <div className="relative">
          <Badge
            variant="outline"
            className="mb-6 gap-2 border-primary/25 bg-background/80 px-3 py-1.5 text-primary backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em]">
              Now writing about Sitecore AI &amp; AI/ML
            </span>
          </Badge>

          <h1 className="max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]">
            Hi, I&apos;m Dylan Young. I build software &amp; write about{" "}
            <span className="text-primary">where AI is taking it.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Sitecore MVP &times;7. Notes and experiments across machine learning,
            .Net, Python, React &amp; TypeScript.
          </p>

          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/25"
              >
                <Link href="/insights/" className="no-underline">
                  Read the latest
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/insights/series/" className="no-underline">
                  Browse series
                </Link>
              </Button>
            </div>
            {heroCategories.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 sm:pl-1">
                {heroCategories.map((category) => (
                  <Badge
                    key={category.slug.current}
                    variant="outline"
                    className="rounded-full border-border/80 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    <Link
                      href={`/insights/categories/${category.slug.current}/`}
                      className="no-underline text-inherit hover:text-inherit"
                    >
                      {category.title}
                    </Link>
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </PageShell>
    </section>
  );
}
