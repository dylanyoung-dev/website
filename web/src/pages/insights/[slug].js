import client from '../../utils/client';
import groq from 'groq';
import Layout from '../../components/Layout';
import SectionHero from '../../components/SectionHero';
import markdownify from '../../utils/markdownify';
import Moment from 'react-moment';

const Post = ({ post }) => {
    return (
        <Layout metaTitle="" metaDescription="">
            <article className="post post-full">
                <header className="post-header inner-sm">
                    <h1 className="post-title underline">{post.title}</h1>
                    <div>
                        <strong>Published</strong>: <Moment format="MMMM DD, YYYY">{post.publishAt}</Moment>
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
    );
};

export async function getStaticPaths() {
    const paths = await client.fetch(groq`*[_type == "post" && defined(slug.current)][].slug.current`);

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: false
    };
}

export async function getStaticProps(context) {
    const { slug = '' } = context.params;
    const post = await client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`,
        { slug }
    );

    return {
        props: {
            post
        }
    };
}

export default Post;
