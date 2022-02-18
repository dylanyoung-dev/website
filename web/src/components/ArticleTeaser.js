import Link from 'next/link';
import Moment from 'react-moment';

const ArticleTeaser = ({ post }) => {
    var fullPath = `/insights/${post.slug.current}`;

    return (
        <article className="post post-card">
            <div className="post-inside">
                {post.mainImageUrl && (
                    <Link className="post-thumbnail" href={fullPath}>
                        <a>
                            <img src={post.mainImageUrl} alt={post.mainImage.alt} />
                        </a>
                    </Link>
                )}
                <header className="post-header">
                    <h3 className="post-title">
                        <Link href={fullPath} rel="bookmark">
                            <a>{post.title}</a>
                        </Link>
                    </h3>
                </header>
                {post.excerpt && (
                    <div className="post-content">
                        <p>{post.excerpt}</p>
                    </div>
                )}
                <footer className="post-meta">
                    <time className="published" dateTime={post.publishedAt}>
                        <Moment format="MMMM DD, YYYY">{post.publishedAt}</Moment>
                    </time>
                </footer>
            </div>
        </article>
    );
};

export default ArticleTeaser;
