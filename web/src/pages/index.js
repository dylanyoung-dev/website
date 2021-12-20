import Layout from '../components/Layout';
import SectionHero from '../components/SectionHero';
import SectionContent from '../components/SectionContent';
import SectionPosts from '../components/SectionPosts';
import client from '../utils/client';
import groq from 'groq';

const Home = ({ allPosts }) => {
    return (
        <Layout metaTitle="Dylanyoung.dev | Sitecore, .Net, Azure, CDP, AI/ML Learnings" metaDescription="">
            <SectionHero title="Hi, I'm Dylan">Welcome to my personal website, where you can read my latest blog posts and learn more about me</SectionHero>
            <SectionContent sectionId="welcome" title="Coming Soon">
                Website is currently under development
            </SectionContent>
            <SectionPosts articles={allPosts} title="Latest Posts"></SectionPosts>
        </Layout>
    );
};

export default Home;

export async function getStaticProps() {
    const allPosts = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`
    );

    return {
        props: { allPosts }
    };
}
