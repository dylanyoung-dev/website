import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { IPost } from "@/interfaces";
import { formatPublishedDate } from "@/lib/utils";

interface PostCardProps {
  post: IPost;
  showCategory: boolean;
}

export function PostCard({ post, showCategory = true }: PostCardProps) {
  const publishedLabel = formatPublishedDate(post.publishedAt);

  return (
    <Card className="group hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardContent className="p-0 flex flex-col flex-1">
        <Link href={`/insights/${post.slug.current}`} className="block no-underline flex flex-col flex-1">
          <div className="flex flex-col flex-1">
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

            <div className="p-6 space-y-3 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors no-underline">{post.title}</h3>
              {showCategory && (
                <>
                  {post.categories && post.categories.length > 0 && post.categories[0] && (
                    <div className="flex">
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                        {post.categories[0].title}
                      </span>
                    </div>
                  )}
                </>
              )}
              <p className="text-sm text-muted-foreground no-underline flex-1">{post.excerpt}</p>
            </div>
            <div className="px-6 py-4 border-t flex items-center justify-between min-h-[3.5rem]">
              {publishedLabel ? (
                <time
                  className="text-sm font-semibold text-accent-foreground uppercase leading-none"
                  dateTime={typeof post.publishedAt === "string" ? post.publishedAt : undefined}
                >
                  {publishedLabel}
                </time>
              ) : (
                <span className="text-sm font-semibold text-accent-foreground uppercase opacity-0 leading-none">
                  &nbsp;
                </span>
              )}
              {post.readingTime ? (
                <span className="text-sm font-semibold text-muted-foreground uppercase leading-none">
                  {post.readingTime}
                </span>
              ) : (
                <span className="text-sm font-semibold text-muted-foreground uppercase opacity-0 leading-none">
                  &nbsp;
                </span>
              )}
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
