import { FC } from 'react';
import Layout from '../components/ui/Layout';
import SectionHero from '../components/ui/SectionHero';
import SectionTimeline from '../components/ui/SectionTimeline';

interface AboutPageProps {}

const AboutPage: FC<AboutPageProps> = ({}) => {
    return (
        <Layout metaTitle="Dylan Young: The journey of Sitecore Master" metaDescription="">
            <SectionHero title="About Me">
                <p>
                    My name is Dylan Young, and I am currently a Developer Advocate working at Sitecore. I am also a 5x Sitecore Technology MVP and have worked
                    professionally with Sitecore for over 8 years.
                </p>
                <p>
                    My current role at Sitecore is focused on the Sitecore Engagement Cloud of products which include Sitecore CDP, Personalize and Send as well
                    as XP's marketing features and Analytics.
                </p>
                <p>Use the timeline below to learn a little more about my professional career:</p>
            </SectionHero>
            <SectionTimeline></SectionTimeline>
        </Layout>
    );
};

export default AboutPage;
