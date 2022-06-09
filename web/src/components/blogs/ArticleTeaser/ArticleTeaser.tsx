import Link from 'next/link';
import Moment from 'react-moment';
import { Post } from '../../../interfaces/posts';

interface ArticleTeaserProps {
    post: Post;
}

const ArticleTeaser = ({ post }: ArticleTeaserProps) => {
    const fullPath = `/insights/${post.slug.current}`;

    return (
        <article className="post post-card">
            <div className="post-inside">
                {post.mainImageUrl && (
                    <Link href={fullPath}>
                        <a className="post-thumbnail">
                            <img src={post.mainImageUrl} alt={post.mainImage.alt} />
                        </a>
                    </Link>
                )}
                <header className="post-header">
                    <h3 className="post-title">
                        <Link href={fullPath}>
                            <a rel="bookmark">{post.title}</a>
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
                    <div>
                        {post.categories.map((category, index) => {
                            {
                                category;
                            }
                        })}
                    </div>
                </footer>
            </div>
        </article>
    );
};

export default ArticleTeaser;
