import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CurrentProjects, MvpTracker } from "@/components/up-to";
import { Layout, PageShell } from "@/components/ui/Layout";
import { FALLBACK_CURRENT_PROJECTS } from "@/lib/current-projects";
import { getCurrentProjects } from "@/services/project.service";

const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";

export const metadata: Metadata = {
  title: "What Am I Up To? - Current Projects & MVP Tracker",
  description:
    "See what Dylan Young is building right now and track MVP program contributions.",
  openGraph: {
    title: "What Am I Up To? - Current Projects & MVP Tracker",
    description:
      "Current projects and a curated log of blogs, videos, presentations, and other MVP contributions.",
    url: `${baseUrl}/up-to/`,
    type: "website",
  },
  alternates: {
    canonical: `${baseUrl}/up-to/`,
  },
};

export default async function UpToPage() {
  const sanityProjects = await getCurrentProjects();
  const projects = sanityProjects.length ? sanityProjects : FALLBACK_CURRENT_PROJECTS;

  return (
    <Layout
      metaTitle="What Am I Up To? - Current Projects & MVP Tracker"
      metaDescription="See what Dylan Young is building right now and track MVP program contributions."
    >
      <PageShell className="py-8 md:py-12">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground hover:underline">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden />
          <span className="text-foreground">What Am I Up To?</span>
        </nav>

        <header className="mb-12 space-y-4 border-b pb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            What Am I Up To?
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            A snapshot of what I&apos;m focused on — active builds in flight and
            contributions I&apos;m tracking for the MVP program.
          </p>
        </header>

        <div className="space-y-16">
          <CurrentProjects projects={projects} />
          <MvpTracker />
        </div>
      </PageShell>
    </Layout>
  );
}
