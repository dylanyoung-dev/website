import { FC } from 'react';
import Layout from '../components/ui/Layout';
import TrackEvent from '../components/cdp/TrackEvent';

interface ContactPageProps {}

const ContactPage: FC<ContactPageProps> = ({}) => {
    return (
        <TrackEvent page="/contact" attributes="">
            <Layout metaTitle="Dylan Young | Contact Me for more information" metaDescription="">
                Coming Soon
            </Layout>
        </TrackEvent>
    );
};

export default ContactPage;
