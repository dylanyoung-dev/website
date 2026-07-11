import Link from "next/link";
import { PageShell } from "./PageShell";

const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/dylanyoung/", label: "LinkedIn" },
  { href: "https://github.com/dylanyoung-dev", label: "GitHub" },
  { href: "https://youtube.com/c/dylanyoungdev", label: "YouTube" },
] as const;

export const Footer = () => (
  <footer className="border-t border-b bg-muted/30">
    <PageShell>
      <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Dylan Young &middot; Built with care
        </p>
        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
          aria-label="Social links"
        >
          {SOCIAL_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground no-underline transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </PageShell>
  </footer>
);
