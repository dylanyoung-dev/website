import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights AmplifyUP test",
  description:
    "AmplifyUP layout sandbox for insights — use Composer against /insights/test",
  robots: { index: false, follow: false },
};

export default function InsightsTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
