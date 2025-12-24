import groq from "groq";
import { Layout } from "@/components/ui/Layout/Layout";
import client from "@/utils/client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const paths = await client.fetch(
    groq`*[_type == "snippet" && defined(slug.current)][].slug.current`
  );

  return paths.map((slug: string) => ({
    slug,
  }));
}

export const metadata = {
  title: "Dylan Young: Snippets for AI, Sitecore, React and Typescript",
  description: "",
};

export default async function SnippetPage({ params }: Props) {
  return (
    <Layout
      metaTitle={`Dylan Young: Snippets for AI, Sitecore, React and Typescript`}
      metaDescription=""
    >
      <section className="bg-background relative"></section>
    </Layout>
  );
}


