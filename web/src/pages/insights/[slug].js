import client from '../../utils/client';
import groq from 'groq';
import Layout from '../../components/Layout';
import SectionHero from '../../components/SectionHero';

const Post = ({ post }) => {
    return (
        <Layout metaTitle="" metaDescription="">
            <SectionHero title={post.title}></SectionHero>
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
    const post = await client.fetch(groq`*[_type == "post" && slug.current == $slug][0]`, { slug });

    return {
        props: {
            post
        }
    };
}

export default Post;
