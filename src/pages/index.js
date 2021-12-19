import Layout from '../components/Layout';
import SectionHero from '../components/SectionHero';

const Home = ({}) => {
    return (
        <Layout metaTitle="Dylanyoung.dev | Sitecore, .Net, Azure, CDP, AI/ML Learnings" metaDescription="">
            <SectionHero title="Hi, I'm Dylan">Welcome to my personal website, where you can read my latest blog posts and learn more about me</SectionHero>

            <div className="post-feed">
                <div className="post-feed-inside"></div>
            </div>
        </Layout>
    );
};

export default Home;
