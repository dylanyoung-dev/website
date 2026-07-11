export const FEATURED_APP_ID = "contextcache";

export interface IAppProject {
  id: string;
  name: string;
  eyebrow?: string;
  description: string;
  url: string;
  technologies: string[];
  /** Top accent bar color */
  accentClassName?: string;
  /** Icon container styling */
  iconClassName?: string;
}

export const APP_PROJECTS: IAppProject[] = [
  {
    id: "contextcache",
    name: "ContextCache",
    eyebrow: "Public Beta",
    description:
      "Give your AI a chief of staff—memory, intelligence, and automation without vendor lock-in. Structured knowledge, semantic search, and no-code agent blueprints. Your data stays in your database.",
    url: "https://contextcache.ai",
    technologies: ["Next.js", "Clerk", "Tailwind CSS", "Shadcn UI", "MCP"],
    accentClassName: "bg-violet-600",
    iconClassName: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    id: "amplifyup",
    name: "AmplifyUP",
    description:
      "An AI-powered content orchestration and marketing automation platform.",
    url: "https://amplifyup.ai",
    technologies: ["Express JS", "Next.js", "TurboRepo", "Clerk"],
    accentClassName: "bg-border",
    iconClassName: "bg-muted text-muted-foreground",
  },
  {
    id: "my-copilot",
    name: "My Copilot",
    description: "An AI-powered LLM chat application.",
    url: "https://copilot.dylanyoung.dev/",
    technologies: ["Next.js", "Vercel AI SDK", "Tailwind CSS", "Shadcn UI"],
    accentClassName: "bg-sky-600",
    iconClassName: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
];

export function getFeaturedApp(): IAppProject {
  return APP_PROJECTS.find((app) => app.id === FEATURED_APP_ID) ?? APP_PROJECTS[0];
}

export function getOtherApps(): IAppProject[] {
  return APP_PROJECTS.filter((app) => app.id !== FEATURED_APP_ID);
}
