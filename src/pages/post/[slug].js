import client from '../../utils/client';
import groq from 'groq';

const Post = ({ post }) => {
    return (
        <article>
            <h1> {post?.slug?.current} </h1>
        </article>
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
    const post = await client.fetch(groq`*[_type == "post" && slug.current == $slug][0]`, { slug });

    return {
        props: {
            post
        }
    };
}

export default Post;
