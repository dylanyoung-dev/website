import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IPost } from "@/interfaces";

interface PostCardProps {
  post: IPost;
  showCategory: boolean;
}

export function PostCard({ post, showCategory = true }: PostCardProps) {
  return (
    <Card className="group">
      <CardContent className="p-0">
        <Link href={`/insights/${post.slug.current}`} className="block">
          <div className="space-y-4">
            <div className="overflow-hidden">
              {post.mainImageUrl ? (
                <Image
                  src={post.mainImageUrl}
                  alt={post.mainImage?.alt ?? ""}
                  width={500}
                  height={260}
                  className="w-full h-60 object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <Image
                  src="https://source.unsplash.com/random/500x260"
                  alt="unsplash image"
                  width={500}
                  height={260}
                  className="w-full h-60 object-cover transition-transform duration-200 group-hover:scale-105"
                />
              )}
            </div>

            <div className="p-6 space-y-3">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              {showCategory && (
                <>
                  {post.categories && post.categories.length > 0 && post.categories[0] && (
                    <div className="flex">
                      <Badge variant="default">{post.categories[0].title}</Badge>
                    </div>
                  )}
                </>
              )}
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </div>
            <div className="px-6 pb-6 flex items-center justify-between">
              <time className="text-sm font-semibold text-accent-foreground uppercase">
                {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
              </time>
              {post.readingTime && (
                <span className="text-sm font-semibold text-muted-foreground uppercase">
                  {post.readingTime}
                </span>
              )}
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
