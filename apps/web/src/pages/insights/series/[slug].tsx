import { FC } from 'react';
import { Layout } from '../../../components/';
import { Box } from '@chakra-ui/react';

interface SeriesPageProps {}

const SeriesPage: FC<SeriesPageProps> = () => {
    return (
        <Layout metaTitle={`Insights Content`} metaDescription="">
            <Box as="section" bg="bg-surface" position="relative"></Box>
        </Layout>
    );
};

export default SeriesPage;
