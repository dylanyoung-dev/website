import Layout from '../components/ui/Layout';
import SectionHero from '../components/ui/SectionHero';
import SectionContent from '../components/ui/SectionContent';
import SectionPosts from '../components/blogs/SectionPosts';
import client from '../utils/client';
import TrackEvent from '../components/cdp/TrackEvent';
import groq from 'groq';
import Categories from '../components/blogs/Categories/Categories';

const Home = ({ allPosts, allCategories }) => {
    return (
        <TrackEvent page="/" attributes="">
            <Layout
                metaTitle="Dylan Young Developer | Sitecore, .Net, CDP, Personalize, React, Next.Js"
                metaDescription="Hello my name is Dylan Young and I'm a Developer Advocate working at Sitecore with a focus on Engagement Cloud. I post content usually atleast once a month or more, and continuing to talk about talks that are exciting to me or the community, as well as my cloud focus at Sitecore."
            >
                <SectionHero title="Hi, I'm Dylan">Welcome to my personal website, where you can read my latest blog posts and learn more about me</SectionHero>
                <Categories AllCategories={allCategories} />
                <SectionPosts articles={allPosts} title="Latest Posts"></SectionPosts>
            </Layout>
        </TrackEvent>
    );
};

export default Home;

export async function getStaticProps() {
    const allPosts = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc){..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`
    );

    const allCategories = await client.fetch(groq`*[_type == "articleCategory" && defined(slug.current)]{'Title':title, _id, 'Slug':slug.current}`);

    return {
        props: { allPosts, allCategories }
    };
}
