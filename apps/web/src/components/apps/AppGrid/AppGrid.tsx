import { Boxes } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getFeaturedApp, getOtherApps } from "@/lib/apps-catalog";
import { AppCard } from "../AppCard";
import { FeaturedApp } from "../FeaturedApp";

export function AppGrid() {
  const featuredApp = getFeaturedApp();
  const otherApps = getOtherApps();

  if (!featuredApp && otherApps.length === 0) {
    return (
      <Card className="border-border/80">
        <CardContent className="py-12 text-center">
          <Boxes className="mx-auto mb-3 h-8 w-8 text-muted-foreground/60" aria-hidden />
          <p className="text-muted-foreground">No projects listed yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-10">
      {featuredApp ? <FeaturedApp app={featuredApp} /> : null}

      {otherApps.length > 0 ? (
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold md:text-2xl">More Projects</h2>
            <p className="text-sm text-muted-foreground">
              Other experiments and proofs of concept
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {otherApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
