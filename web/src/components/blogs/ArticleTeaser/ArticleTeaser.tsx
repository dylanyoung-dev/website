import Link from 'next/link';
import Moment from 'react-moment';
import { IPost } from '../../../interfaces';

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
                        <img src={post.mainImageUrl} alt={post.mainImage.alt} />
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
                        <Moment format="MMMM DD, YYYY">{post.publishedAt}</Moment>
                    </time>
                    {post?.categories !== undefined ?? (
                        <div>
                            {post.categories?.map((category, index) => (
                                <>{category}</>
                            ))}
                        </div>
                    )}
                </footer>
            </div>
        </article>
    );
};

export default ArticleTeaser;
