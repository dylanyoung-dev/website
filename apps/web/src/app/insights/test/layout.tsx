import type { Metadata } from "next";

const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";

export const metadata: Metadata = {
  title: "Dylan Young: Blog Content on AI, Sitecore and Typescript/React",
  description:
    "Explore blog posts and articles covering AI/ML, Sitecore, TypeScript, React, and more",
  alternates: {
    canonical: `${baseUrl}/insights/test`,
  },
};

export default function InsightsTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
