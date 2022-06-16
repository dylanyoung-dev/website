import React, { FC } from 'react';
import _ from 'lodash';
import ArticleTeaser from './ArticleTeaser/ArticleTeaser';
import { Post } from '../../interfaces/posts';

interface SectionPostsProps {
    title: string;
    articles: Post[];
}

const SectionPosts: FC<SectionPostsProps> = ({ title, articles }) => {
    return (
        <section id="articles" className="block block-posts">
            {title && <h2 className="block-title underline">{title}</h2>}
            <div className="post-feed">
                <div className="post-feed-inside">
                    {_.map(articles, (post, index) => (
                        <ArticleTeaser key={index} post={post}></ArticleTeaser>
                    ))}
                </div>
            </div>
            {/* {!_.isEmpty(actions) && (
                <div className="block-buttons inner-sm">
                    <CtaButtons actions={actions} />
                </div>
            )} */}
        </section>
    );
};

export default SectionPosts;
