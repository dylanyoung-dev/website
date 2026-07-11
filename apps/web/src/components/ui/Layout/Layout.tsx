"use client";

import { Footer, Header } from "./";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  metaTitle: string;
  metaDescription: string;
  ogPhoto?: string;
  ogUrl?: string;
  /** Remove top padding so a full-width hero sits flush under the nav. */
  flushTop?: boolean;
}

export function Layout({
  children,
  metaTitle,
  metaDescription,
  ogPhoto,
  ogUrl,
  flushTop = false,
}: LayoutProps) {
  return (
    <section className="overflow-y-auto">
      <Header />
      <div
        className={cn(
          "w-full pb-12 lg:pb-24",
          !flushTop && "pt-4 lg:pt-8"
        )}
      >
        {children}
      </div>
      <Footer />
    </section>
  );
}
