import Layout from '../components/Layout';
import SectionHero from '../components/SectionHero';
import SectionTimeline from '../components/SectionTimeline';

const AboutPage = ({}) => {
    return (
        <Layout metaTitle="Dylan Young: The journey of Sitecore Master" metaDescription="">
            <SectionHero title="About Me">
                My name is Dylan Young, and I am currently a Technical Marketing professional with a long history in a mix of technology and marketing fields.
            </SectionHero>
            <SectionTimeline></SectionTimeline>
        </Layout>
    );
};

export default AboutPage;
