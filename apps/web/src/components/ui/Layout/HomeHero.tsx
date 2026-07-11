import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/interfaces";
import { PageShell } from "./PageShell";

interface HomeHeroProps {
  categories?: Array<Pick<ICategory, "title" | "slug"> & { postCount?: number }>;
}

export function HomeHero({ categories = [] }: HomeHeroProps) {
  const heroCategories = categories
    .filter((category) => category.slug?.current)
    .slice(0, 3);

  return (
    <section className="relative overflow-hidden border-b bg-background">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.2]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--border)) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <PageShell className="relative py-14 md:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute -right-12 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl dark:bg-primary/25 md:h-96 md:w-96 lg:-right-8"
          aria-hidden
        />

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
              <Link
                href="/insights/series/"
                className="no-underline"
              >
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
