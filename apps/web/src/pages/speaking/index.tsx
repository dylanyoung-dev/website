import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, SimpleGrid, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { NextPage } from 'next';
import { FiChevronRight } from 'react-icons/fi';
import { EngagementCard } from '../../components/engagement/EngagementCard/EngagementCard';
import { Layout } from '../../components/ui';
import { IEngagement } from '../../interfaces/IEngagement';
import { getEngagements } from '../../services/engagements.service';

interface SpeakingPageProps {
    engagements: IEngagement[];
}

const SpeakingPage: NextPage<SpeakingPageProps> = ({ engagements }) => {
    return (
        <Layout metaTitle={`Dylan Young: My Speaking Engagements`} metaDescription="">
            <Box as="section" bg="bg-surface" position="relative">
                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage isLastChild>
                            <BreadcrumbLink isCurrentPage>My Engagements</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Container>

                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Stack spacing={{ base: '8', md: '8' }}>
                        <Stack direction="row" justify="space-between">
                            <Stack spacing={{ base: '4', md: '5' }}>
                                <Stack spacing="3">
                                    <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Speaking Engagements</Heading>
                                </Stack>
                                <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                    This includes unique Speaking Engagement pages that has curated content for that specific event. This will likely include
                                    the Powerpoint, links to helpful resources and blogs on the topic in the session.
                                </Text>
                            </Stack>
                        </Stack>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '4' }}>
                            {engagements.map((engagement: IEngagement) => (
                                <EngagementCard key={engagement._id} engagement={engagement} />
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export async function getStaticProps() {
    const paginatedSpeakingEngagements = await getEngagements();

    return {
        props: { engagements: paginatedSpeakingEngagements }
    };
}

export default SpeakingPage;
