import { Layout } from "@/components/ui/Layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiChevronRight, FiExternalLink } from "react-icons/fi";

export const metadata = {
  title: "Dylan Young: My personal Proof of Concept projects on AI/ML and more",
  description: "",
};

export default function AppsPage() {
  return (
    <Layout
      metaTitle="Dylan Young: My personal Proof of Concept projects on AI/ML and more"
      metaDescription=""
    >
      <section className="bg-background relative">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <FiChevronRight className="text-gray-500" />
            <span>Apps</span>
          </nav>
        </div>
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-8">
            <div className="flex justify-between">
              <div className="space-y-5">
                <div className="space-y-3">
                  <h1 className="text-2xl md:text-3xl font-semibold">Apps</h1>
                </div>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Below is a list of apps either hosted here or on other platforms that I've built as either a Proof of Concept (PoC) or in
                  some cases some are a little more than that.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="border rounded-lg overflow-hidden p-4">
                <h3 className="text-lg font-semibold">AmplifyUP</h3>
                <p className="mt-2 mb-4">
                  An AI-powered content orchestration and marketing automation platform.
                </p>

                <div className="flex flex-row mb-4 gap-2">
                  <span className="text-xs font-semibold">Built with:</span>
                  <Badge variant="outline">Express JS</Badge>
                  <Badge variant="outline">Next.js / TurboRepo</Badge>
                  <Badge variant="outline">Clerk Auth</Badge>
                </div>

                <Link href="https://amplifyup.ai" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    Visit Website
                    <FiExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="border rounded-lg overflow-hidden p-4">
                <h3 className="text-lg font-semibold">My Copilot</h3>
                <p className="mt-2 mb-4">An AI-powered LLM chat application.</p>

                <div className="flex flex-row mb-4 gap-2">
                  <span className="text-xs font-semibold">Built with:</span>
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">Vercel AI SDK</Badge>
                  <Badge variant="outline">TailwindCSS / ShadCN UI</Badge>
                </div>

                <Link href="https://copilot.dylanyoung.dev/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    Visit Website
                    <FiExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


