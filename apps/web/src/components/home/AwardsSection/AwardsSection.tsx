import { MvpLogo } from "@/components/ui/MvpLogo";
import { Card, CardContent } from "@/components/ui/card";

const MVP_PROFILE_URL =
  "https://mvp.sitecore.com/en/Directory/Profile?id=29e76e11e5af446b367b08dd46ae56e7";

const MVP_YEARS = [2026, 2025, 2022, 2021, 2020, 2019, 2018] as const;

const CERTIFICATIONS = [
  {
    src: "/images/Sitecore-CDP-Certificate.png",
    alt: "Sitecore CDP Certificate",
  },
  {
    src: "/images/Sitecore-Personalize-Certificate.png",
    alt: "Sitecore Personalize Certificate",
  },
  {
    src: "/images/Sitecore-XMC-Certificate.png",
    alt: "Sitecore XMC Certificate",
  },
] as const;

export function AwardsSection() {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold md:text-2xl">Awards &amp; Certifications</h2>
        <p className="text-sm text-muted-foreground">
          Professional recognition across Sitecore and composable DXP
        </p>
      </div>

      <Card className="border-border/80 shadow-sm">
        <CardContent className="space-y-8 p-6 md:p-8">
          <div className="space-y-4">
            <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
              Sitecore MVP
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-5">
              {MVP_YEARS.map((year) => (
                <a
                  key={year}
                  href={MVP_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-lg transition-opacity hover:opacity-90"
                >
                  <MvpLogo
                    src={`/images/${year}-Technology.png`}
                    alt={`Sitecore MVP ${year}`}
                    width={100}
                    height={100}
                    className="h-auto max-w-[88px] transition-transform group-hover:scale-105 md:max-w-[100px]"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="border-t border-border/60 pt-8">
            <div className="space-y-4">
              <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
                Certifications
              </p>
              <div className="flex flex-wrap items-center gap-4 md:gap-5">
                {CERTIFICATIONS.map(({ src, alt }) => (
                  <MvpLogo
                    key={src}
                    src={src}
                    alt={alt}
                    width={100}
                    height={100}
                    className="h-auto max-w-[88px] transition-transform hover:scale-105 md:max-w-[100px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
