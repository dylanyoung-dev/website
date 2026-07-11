"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import {
  Briefcase,
  Braces,
  ChevronDown,
  Home,
  Layers,
  List,
  Mail,
  Menu,
  Mic,
  Moon,
  Rss,
  Sun,
  User,
  Video,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SiteBrand } from "./SiteBrand";
import { PageShell } from "./PageShell";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const MAIN_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/apps/", label: "Projects" },
  { href: "/speaking/", label: "Speaking" },
  { href: "/contact/", label: "Contact" },
] as const;

const INSIGHTS_SUB_LINKS = [
  { href: "/insights/", label: "Blog Posts", icon: Layers },
  { href: "/videos/", label: "Videos", icon: Video },
  { href: "/insights/series/", label: "Series", icon: List },
  { href: "/snippets/", label: "Snippets", icon: Braces },
] as const;

function isInsightsRoute(pathname: string) {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return (
    normalized.startsWith("/insights/") ||
    normalized === "/videos/" ||
    normalized.startsWith("/videos/") ||
    normalized === "/snippets/" ||
    normalized.startsWith("/snippets/")
  );
}

function isSubLinkActive(pathname: string, href: string) {
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;

  if (href === "/insights/") {
    return (
      normalized === "/insights/" ||
      (normalized.startsWith("/insights/") &&
        !normalized.startsWith("/insights/series/"))
    );
  }

  if (href === "/insights/series/") {
    return normalized.startsWith("/insights/series/");
  }

  if (href === "/snippets/") {
    return normalized === "/snippets/" || normalized.startsWith("/snippets/");
  }

  return normalized === href || normalized.startsWith(href);
}

export const Header = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const onInsightsSection = isInsightsRoute(pathname);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <section>
      <nav className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
        <PageShell className="py-3 lg:py-4">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 lg:gap-4">
            <SiteBrand className="min-w-0" />

            <div className="hidden min-w-0 items-center justify-center lg:flex">
              <div className="flex max-w-full flex-wrap items-center justify-center gap-0.5 xl:gap-1">
                {MAIN_NAV_LINKS.slice(0, 1).map(({ href, label }) => (
                  <Button key={href} variant="ghost" asChild className="text-sm font-medium">
                    <Link href={href} className="no-underline">
                      {label}
                    </Link>
                  </Button>
                ))}

                <div className="group relative">
                  <Link
                    href="/insights/"
                    className={cn(
                      "inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm font-medium no-underline transition-colors hover:bg-muted hover:text-foreground",
                      onInsightsSection && "bg-muted text-foreground"
                    )}
                  >
                    Insights
                    <ChevronDown
                      className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:rotate-180"
                      aria-hidden
                    />
                  </Link>

                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-50 w-44 -translate-x-1/2 pt-2",
                      "pointer-events-none invisible opacity-0 transition-all duration-150",
                      "group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100",
                      "group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100"
                    )}
                  >
                    <div
                      className="overflow-hidden rounded-lg border border-border/80 bg-background/95 p-1 shadow-lg backdrop-blur-md"
                      role="menu"
                      aria-label="Insights"
                    >
                      {INSIGHTS_SUB_LINKS.map(({ href, label, icon: Icon }) => {
                        const isActive = isSubLinkActive(pathname, href);

                        return (
                          <Link
                            key={href}
                            href={href}
                            role="menuitem"
                            className={cn(
                              "flex items-center gap-2 rounded-md px-3 py-2 text-sm no-underline transition-colors hover:bg-muted",
                              isActive && "bg-muted font-medium text-foreground"
                            )}
                          >
                            <Icon className="h-4 w-4 text-muted-foreground" aria-hidden />
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {MAIN_NAV_LINKS.slice(1).map(({ href, label }) => (
                  <Button key={href} variant="ghost" asChild className="text-sm font-medium">
                    <Link href={href} className="no-underline">
                      {label}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>

            <div className="hidden shrink-0 items-center justify-end gap-2 lg:flex">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Button asChild size="sm" className="rounded-full px-5">
                <Link
                  href="/feed.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  <Rss className="mr-1.5 h-3.5 w-3.5" />
                  RSS
                </Link>
              </Button>
            </div>

            <div className="col-start-3 flex items-center justify-end gap-2 lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle theme"
                onClick={toggleTheme}
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open Menu"
                    ref={menuButtonRef}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-sm">
                  <SheetHeader className="pr-10">
                    <SiteBrand showName />
                  </SheetHeader>
                  <div className="mt-8 space-y-1">
                    <Link
                      href="/"
                      className="flex items-center gap-3 rounded-md px-2 py-3 no-underline hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      <Home className="h-5 w-5" />
                      <span className="font-medium">Home</span>
                    </Link>

                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-md px-2 py-3 text-left hover:bg-muted"
                      onClick={() => setInsightsOpen((open) => !open)}
                      aria-expanded={insightsOpen}
                    >
                      <span className="flex items-center gap-3">
                        <Layers className="h-5 w-5" />
                        <span className="font-medium">Insights</span>
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          insightsOpen && "rotate-180"
                        )}
                        aria-hidden
                      />
                    </button>

                    {insightsOpen ? (
                      <div className="ml-4 space-y-1 border-l border-border/80 pl-2">
                        {INSIGHTS_SUB_LINKS.map(({ href, label, icon: Icon }) => (
                          <Link
                            key={href}
                            href={href}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-2 py-2.5 text-sm no-underline hover:bg-muted",
                              isSubLinkActive(pathname, href) &&
                                "bg-muted font-medium text-foreground"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            <Icon className="h-4 w-4" />
                            {label}
                          </Link>
                        ))}
                      </div>
                    ) : null}

                    <Link
                      href="/apps/"
                      className="flex items-center gap-3 rounded-md px-2 py-3 no-underline hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      <Briefcase className="h-5 w-5" />
                      <span className="font-medium">Projects</span>
                    </Link>
                    <Link
                      href="/speaking/"
                      className="flex items-center gap-3 rounded-md px-2 py-3 no-underline hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      <Mic className="h-5 w-5" />
                      <span className="font-medium">Speaking</span>
                    </Link>
                    <Link
                      href="/about/"
                      className="flex items-center gap-3 rounded-md px-2 py-3 no-underline hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium">About</span>
                    </Link>
                    <Link
                      href="/contact/"
                      className="flex items-center gap-3 rounded-md px-2 py-3 no-underline hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      <Mail className="h-5 w-5" />
                      <span className="font-medium">Contact</span>
                    </Link>
                  </div>
                  <div className="mt-8 border-t pt-6">
                    <Button asChild className="w-full rounded-full">
                      <Link
                        href="/feed.xml"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="no-underline"
                        onClick={() => setIsOpen(false)}
                      >
                        <Rss className="mr-2 h-4 w-4" />
                        RSS
                      </Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </PageShell>
      </nav>
    </section>
  );
};
