import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ISeries } from "@/interfaces/ISeries";

interface SeriesCardProps {
  series: ISeries;
}

export function SeriesCard({ series }: SeriesCardProps) {
  // Get the first post's image for the series thumbnail
  const firstPost = series.posts?.[0];
  const seriesImage = firstPost?.landscapeImageUrl || firstPost?.mainImageUrl;
  const imageAlt = firstPost?.landscapeImage?.alt || firstPost?.mainImage?.alt || series.title;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-0">
        <Link href={`/insights/series/${series.slug.current}`} className="block no-underline hover:no-underline">
          <div className="space-y-0">
            {/* Image Section */}
            {seriesImage ? (
              <div className="relative w-full aspect-video overflow-hidden bg-muted">
                <Image
                  src={seriesImage}
                  alt={imageAlt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {series.posts.length} {series.posts.length === 1 ? 'Article' : 'Articles'}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-primary/30" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {series.posts.length} {series.posts.length === 1 ? 'Article' : 'Articles'}
                  </Badge>
                </div>
              </div>
            )}

            {/* Content Section */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors no-underline">
                  {series.title}
                </h3>
                {series.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed no-underline">
                    {series.description}
                  </p>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {series.posts.length} {series.posts.length === 1 ? 'Post' : 'Posts'} in Series
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
