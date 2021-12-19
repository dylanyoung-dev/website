const ArticleTeaser = ({ post }) => {
    return (
        <article className="post post-card">
            <div className="post-inside">
                {post.thumbImage && (
                    <Link className="post-thumbnail" href={postUrl}>
                        <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                    </Link>
                )}
                <header className="post-header">
                    <h3 className="post-title">
                        <Link href={postUrl} rel="bookmark">
                            {title}
                        </Link>
                    </h3>
                </header>
                {excerpt && (
                    <div className="post-content">
                        <p>{excerpt}</p>
                    </div>
                )}
                <footer className="post-meta">
                    <time className="published" dateTime={dateTimeAttr}>
                        {formattedDate}
                    </time>
                </footer>
            </div>
        </article>
    );
};

export default ArticleTeaser;
