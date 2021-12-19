import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { getPageUrl, Link, withPrefix } from '../utils';
import CtaButtons from './CtaButtons';

const SectionPosts = ({ articles }) => {
    return (
        <section id={sectionId} className="block block-posts">
            {title && <h2 className="block-title underline inner-sm">{title}</h2>}
            <div className="post-feed">
                <div className="post-feed-inside">
                    {_.map(articles, (post, index) => (
                        <ArticleTeaser post={post}></ArticleTeaser>
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
