import Link from 'next/link';

const ArticleTeaser = ({ post }) => {
    console.log(post);
    var fullPath = `/insights/${post.slug.current}`;

    return (
        <article className="post post-card">
            <div className="post-inside">
                {post.mainImageUrl && (
                    <Link className="post-thumbnail" href="#">
                        <img src={post.mainImageUrl} alt={post.mainImage.alt} />
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
                    <time className="published" dateTime={post.dateTimeAttr}>
                        {post.formattedDate}
                    </time>
                </footer>
            </div>
        </article>
    );
};

export default ArticleTeaser;
