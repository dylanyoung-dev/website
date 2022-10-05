import client from '../../../utils/client';
import groq from 'groq';
import Layout from '../../../components/ui/Layout';
import markdownify from '../../../utils/markdownify';
import { TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon } from 'next-share';
import Moment from 'react-moment';
import { Post } from '../../../interfaces/posts';
import { FC } from 'react';
import { Category } from '../../../../models/Category';
import SectionPosts from '../../../components/blogs/SectionPosts';

interface PostProps {
    posts: Post[];
    category: Category;
    url: string;
}

const Post: FC<PostProps> = ({ posts, category, url }: PostProps) => {
    return (
        <Layout metaTitle={`${category.Title} Insights Content`} metaDescription="">
            <SectionPosts articles={posts} title={category.Title} />
        </Layout>
    );
};

export async function getStaticPaths() {
    const paths = await client.fetch(groq`*[_type == "articleCategory" && defined(slug.current)][].slug.current`);

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: false
    };
}

export async function getStaticProps(context) {
    const { slug = '' } = context.params;
    const url = process.env.HOST_URL;

    const posts = await client.fetch(
        groq`*[_type == "post" && references(*[_type=="articleCategory" && slug.current == $slug]._id)] | order(publishedAt desc){..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`,
        { slug }
    );

    const category: Category = await client.fetch(groq`*[_type=="articleCategory" && slug.current == $slug][0]{'Title':title, _id, 'Slug':slug.current}`, {
        slug
    });

    return {
        props: {
            posts,
            category,
            url
        }
    };
}

export default Post;
