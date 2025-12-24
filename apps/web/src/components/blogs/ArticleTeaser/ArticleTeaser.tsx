import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { IPost } from "@/interfaces";

interface ArticleTeaserProps {
  post: IPost;
}

const ArticleTeaser = ({ post }: ArticleTeaserProps) => {
  const fullPath = `/insights/${post.slug.current}`;

  return (
    <article className="post post-card">
      <div className="post-inside">
        {post.mainImageUrl && (
          <Link href={fullPath} className="post-thumbnail">
            <Image
              src={post.mainImageUrl}
              alt={post.mainImage?.alt ?? ""}
              width={500}
              height={260}
              className="w-full h-auto"
            />
          </Link>
        )}
        <header className="post-header">
          <h3 className="post-title">
            <Link href={fullPath} rel="bookmark">
              {post.title}
            </Link>
          </h3>
        </header>
        {post.excerpt && (
          <div className="post-content">
            <p>{post.excerpt}</p>
          </div>
        )}
        <footer className="post-meta">
          <time className="published">
            {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
          </time>
          {post?.categories !== undefined && (
            <div>
              {post.categories?.map((category, index) => (
                <span key={index}>{category.title}</span>
              ))}
            </div>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ArticleTeaser;
