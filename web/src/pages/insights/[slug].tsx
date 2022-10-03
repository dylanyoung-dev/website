import client from '../../utils/client';
import groq from 'groq';
import Layout from '../../components/ui/Layout';
import markdownify from '../../utils/markdownify';
import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'next-share';
import Moment from 'react-moment';
import { Post } from '../../interfaces/posts';
import TrackEvent from '../../components/cdp/TrackEvent';
import { FC } from 'react';

interface PostProps {
    post: Post;
    url: string;
}

const Post: FC<PostProps> = ({ post, url }: PostProps) => {
    const shortPath = `/insights/${post.slug.current}/`;
    const fullPath = `${url}${shortPath}`;

    return (
        <TrackEvent page={shortPath} attributes={{ 'sanity_id': `${post._id}` }}>
            <Layout metaTitle={post.title} metaDescription={post.excerpt} ogPhoto={post.landscapeImageUrl} ogUrl={fullPath}>
                <article className="post post-full">
                    <header className="post-header inner-sm">
                        <h1 className="post-title underline">{post.title}</h1>
                        <div>
                            <strong>Published</strong>: <Moment format="MMMM DD, YYYY">{post.publishedAt}</Moment>
                        </div>
                        <div>
                            <TwitterShareButton url={fullPath}>
                                <TwitterIcon size={32} />
                            </TwitterShareButton>
                            &nbsp;
                            <LinkedinShareButton url={fullPath}>
                                <LinkedinIcon size={32} />
                            </LinkedinShareButton>
                        </div>
                    </header>

                    {post.landscapeImage && (
                        <div className="post-image">
                            <img src={post.landscapeImageUrl} alt={post.landscapeImage.alt} />
                        </div>
                    )}
                    {post.body && <div className="post-content inner-sm">{markdownify(post.body)}</div>}
                </article>
            </Layout>
        </TrackEvent>
    );
};

export async function getStaticPaths() {
    const paths = await client.fetch(groq`*[_type == "post" && defined(slug.current)][].slug.current`);

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: false
    };
}

export async function getStaticProps(context) {
    const { slug = '' } = context.params;
    const url = process.env.HOST_URL;

    const post = await client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`,
        { slug }
    );

    return {
        props: {
            post,
            url
        }
    };
}

export default Post;
