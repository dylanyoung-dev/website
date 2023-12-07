import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, SimpleGrid, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { FC } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Layout } from '../../../components';
import { ISeries } from '../../../interfaces/ISeries';
import { getSeries } from '../../../services/series.service';

interface SeriesListingPageProps {
    series: ISeries[];
}

const SeriesListingPage: FC<SeriesListingPageProps> = ({ series }) => {
    return (
        <Layout metaTitle={`Dylan Young: View series on specific topics related to Sitecore Personalize, Migrations and more`} metaDescription="">
            <Box as="section" bg="bg-surface" position="relative">
                <Container py={{ base: '8', md: '8' }} maxW="6xl">
                    <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage isLastChild>
                            <BreadcrumbLink isCurrentPage>Blog Series</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Container>
                <Container py={{ base: '8', md: '8' }} maxW="6xl">
                    <Stack spacing={{ base: '8', md: '8' }}>
                        <Stack direction="row" justify="space-between">
                            <Stack spacing={{ base: '4', md: '5' }}>
                                <Stack spacing="3">
                                    <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Blog Series</Heading>
                                </Stack>
                                <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                    Below is a collection of blogs that are in a series/collection of similar content.
                                </Text>
                            </Stack>
                        </Stack>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: '12', lg: '4' }}></SimpleGrid>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const seriesList = await getSeries();

    return {
        props: { series: seriesList }
    };
};

export default SeriesListingPage;
