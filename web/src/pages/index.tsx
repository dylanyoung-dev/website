import Layout from '../components/ui/Layout';
import SectionHero from '../components/ui/SectionHero';
import SectionContent from '../components/ui/SectionContent';
import SectionPosts from '../components/blogs/SectionPosts';
import client from '../utils/client';
import groq from 'groq';
import GitHubCollection from '../components/github/GitHubCollection';

const Home = ({ allPosts }) => {
    return (
        <Layout metaTitle="Dylan Young Sitecore Developer | Sitecore, .Net, CDP, React, Next.Js" metaDescription="">
            <SectionHero title="Hi, I'm Dylan">Welcome to my personal website, where you can read my latest blog posts and learn more about me</SectionHero>
            <GitHubCollection />
            <SectionPosts articles={allPosts} title="Latest Posts"></SectionPosts>
        </Layout>
    );
};

export default Home;

export async function getStaticProps() {
    const allPosts = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`
    );

    return {
        props: { allPosts }
    };
}
