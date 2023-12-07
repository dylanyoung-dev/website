import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { Layout } from '../../components';

interface SnippetPageProps {}

const SnippetPage: FC<SnippetPageProps> = () => {
    return (
        <Layout metaTitle={`Dylan Young: Snippets for AI, Sitecore, React and Typescript`} metaDescription="">
            <Box as="section" bg="bg-surface" position="relative"></Box>
        </Layout>
    );
};

export default SnippetPage;
