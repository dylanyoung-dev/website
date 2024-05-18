import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { FC } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Layout } from '../../../components';
import { SeriesList } from '../../../components/blogs/SeriesList/SeriesList';
import { ISeries } from '../../../interfaces/ISeries';
import { getSeries } from '../../../services/series.service';

interface SeriesListingPageProps {
    series: ISeries[];
}

const SeriesListingPage: FC<SeriesListingPageProps> = ({ series }) => {
    return (
        <Layout metaTitle={`Dylan Young: My Speaking Engagements`} metaDescription="">
            <Box as="section" bg="bg-surface" position="relative">
                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage isLastChild>
                            <BreadcrumbLink isCurrentPage>Content Series</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Container>

                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Stack spacing={{ base: '8', md: '8' }}>
                        <Stack direction="row" justify="space-between">
                            <Stack spacing={{ base: '4', md: '5' }}>
                                <Stack spacing="3">
                                    <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Content Series</Heading>
                                </Stack>
                                <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                    This section includes series of articles that are all related to each other by a general purpose or goal. They are not
                                    categories, but deeply connected blog posts.
                                </Text>
                            </Stack>
                        </Stack>
                        <SeriesList series={series} />
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
