import groq from "groq";
import Link from "next/link";
import { BookOpen, FileText, Sparkles, ArrowRight, Layers, Video, Mic, Briefcase, Mail, User } from "lucide-react";
import { MdOutlineWavingHand } from "react-icons/md";
import { PostCard } from "@/components/blogs/PostCard/PostCard";
import Categories from "@/components/blogs/CategoryList/CategoryList";
import { Layout } from "@/components/ui/Layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IPost } from "@/interfaces";
import { getPosts } from "@/services/post.service";
import client from "@/utils/client";

export const metadata = {
  title: "Dylan Young: Sitecore Developer - AI/ML, .Net, Python, React, Typescript",
  description: "The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer",
};

export default async function Home() {
  const mostRecentPosts = await getPosts(6);
  const allCategories = await client.fetch(
    groq`*[_type == "articleCategory" && defined(slug.current)]{...}`
  );

  return (
    <Layout
      metaTitle="Dylan Young: Sitecore Developer - AI/ML, .Net, Python, React, Typescript"
      metaDescription="The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer"
    >
      <section className="bg-background relative">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/5 flex-shrink-0 mt-1">
                <MdOutlineWavingHand className="h-6 w-6 md:h-7 md:w-7 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground">
                    Hello, I'm Dylan Young
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                    Software engineer and technical influencer. I blog about my passions and curiosity in technology. 
                    Here you'll find my thoughts related to Sitecore, AI/ML, .Net, Python, React, and TypeScript.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Badge variant="secondary" className="text-xs font-normal">
                    Tech Enthusiast
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-normal">
                    Content Creator
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-normal">
                    Technical Influencer
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Site Navigation Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl border-t">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-xl md:text-2xl font-semibold">Explore the Site</h2>
              <p className="text-muted-foreground text-sm">
                Discover all the content and pages available on the site
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Card className="group hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Link href="/insights" className="block p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm">Insights</h3>
                    <p className="text-xs text-muted-foreground">Blog posts & articles</p>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Link href="/insights/series" className="block p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm">Series</h3>
                    <p className="text-xs text-muted-foreground">Curated content series</p>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Link href="/apps" className="block p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm">My Projects</h3>
                    <p className="text-xs text-muted-foreground">Apps & projects</p>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Link href="/speaking" className="block p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <Mic className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm">Speaking</h3>
                    <p className="text-xs text-muted-foreground">Engagements & talks</p>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Link href="/videos" className="block p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm">Videos</h3>
                    <p className="text-xs text-muted-foreground">Video content</p>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Link href="/about" className="block p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm">About</h3>
                    <p className="text-xs text-muted-foreground">Learn more about me</p>
                  </Link>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <Link href="/contact" className="block p-6 text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-sm">Contact</h3>
                    <p className="text-xs text-muted-foreground">Get in touch</p>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        {allCategories && allCategories.length > 0 && (
          <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl border-t">
            <div className="space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-semibold">Explore by Category</h2>
                <p className="text-muted-foreground text-sm">
                  Browse content organized by topic
                </p>
              </div>
              <Categories AllCategories={allCategories} />
            </div>
          </div>
        )}

        {/* Latest Posts Section */}
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl border-t">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-semibold">Latest Posts</h2>
                <p className="text-muted-foreground text-sm">
                  Check out my most recent content across different topics
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                <Link href="/insights" className="flex items-center gap-1.5">
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>

            {mostRecentPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mostRecentPosts.map((post: IPost) => (
                    <PostCard key={post._id} post={post} showCategory={true} />
                  ))}
                </div>
                <div className="flex justify-center sm:justify-start pt-2">
                  <Button variant="ghost" size="sm" asChild className="sm:hidden w-full sm:w-auto">
                    <Link href="/insights" className="flex items-center justify-center gap-1.5">
                      View All Posts
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No posts available yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}


