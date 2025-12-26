"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, BookOpen, Calendar, Clock, ChevronRight } from "lucide-react";
import { IPost } from "@/interfaces";
import { ISeries } from "@/interfaces/ISeries";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";

interface SeriesPostsProps {
  series: ISeries;
}

export function SeriesPosts({ series }: SeriesPostsProps) {
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);

  return (
    <section className="bg-background relative">
      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/" className="hover:underline text-muted-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link href="/insights" className="hover:underline text-muted-foreground">
            Insights
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <Link href="/insights/series" className="hover:underline text-muted-foreground">
            Series
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground font-medium">{series.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <div className="space-y-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="text-sm font-medium">
                Content Series
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
              {series.title}
            </h1>
            {series.description && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {series.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>{series.posts.length} {series.posts.length === 1 ? 'Article' : 'Articles'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Series Navigation */}
          <aside className="lg:col-span-3">
            <Card className="sticky top-24">
              <CardHeader>
                <h2 className="text-lg font-semibold">Series Contents</h2>
                <p className="text-sm text-muted-foreground">
                  {series.posts.length} {series.posts.length === 1 ? 'article' : 'articles'} in this series
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                {series.posts.map((post: IPost, index) => (
                  <Button
                    key={post._id}
                    variant={selectedPostIndex === index ? "secondary" : "ghost"}
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    onClick={() => setSelectedPostIndex(selectedPostIndex === index ? null : index)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold mt-0.5">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{post.title}</p>
                        {post.publishedAt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(post.publishedAt), "MMM d, yyyy")}
                          </p>
                        )}
                      </div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {series.posts.map((post: IPost, index) => (
              <Card 
                key={post._id} 
                className={`transition-all duration-200 ${
                  selectedPostIndex === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                          {post.title}
                        </h2>
                      </div>
                      {post.excerpt && (
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-2 border-t">
                    {post.publishedAt && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.publishedAt}>
                          {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
                        </time>
                      </div>
                    )}
                    {post.readingTime && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{post.readingTime}</span>
                      </div>
                    )}
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.categories.map((category, catIndex) => (
                          <Badge key={catIndex} variant="secondary">
                            {category.title}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {post.body && (
                    <div className="prose prose-lg dark:prose-invert max-w-none 
                      prose-headings:font-bold prose-headings:text-foreground
                      prose-h2:!mt-20 prose-h2:!mb-8 prose-h2:first:!mt-0
                      prose-h3:!mt-16 prose-h3:!mb-6 prose-h3:first:!mt-0
                      prose-h4:!mt-12 prose-h4:!mb-4 prose-h4:first:!mt-0
                      prose-h5:!mt-10 prose-h5:!mb-3 prose-h5:first:!mt-0
                      prose-h6:!mt-8 prose-h6:!mb-2 prose-h6:first:!mt-0
                      prose-p:text-foreground prose-p:leading-relaxed
                      prose-a:text-muted-foreground prose-a:no-underline hover:prose-a:text-foreground hover:prose-a:underline
                      prose-strong:text-foreground prose-strong:font-semibold
                      prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-muted prose-pre:border
                      prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
                      prose-img:rounded-lg prose-img:shadow-md
                      prose-hr:border-border">
                      <RenderMarkdown>{post.body}</RenderMarkdown>
                    </div>
                  )}
                  
                  <div className="pt-6 border-t">
                    <Button variant="outline" asChild className="w-full sm:w-auto">
                      <Link href={`/insights/${post.slug.current}`} className="flex items-center gap-2">
                        Read Full Article
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Back to Series Link */}
        <div className="mt-12 pt-8 border-t">
          <Button variant="ghost" asChild>
            <Link href="/insights/series" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to All Series
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
