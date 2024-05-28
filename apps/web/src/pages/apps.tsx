import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { NextPage } from 'next';
import { FiChevronRight } from 'react-icons/fi';
import { Layout } from '../components';

interface AppsPageProps {}

const AppsPage: NextPage<AppsPageProps> = () => {
    return (
        <Layout metaTitle="Dylan Young: My personal Proof of Concept projects on AI/ML and more" metaDescription="">
            <Box as="section" bg="bg-surface" position="relative">
                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage isLastChild>
                            <BreadcrumbLink isCurrentPage>Apps</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Container>
                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Stack spacing={{ base: '8', md: '8' }}>
                        <Stack direction="row" justify="space-between">
                            <Stack spacing={{ base: '4', md: '5' }}>
                                <Stack spacing="3">
                                    <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Apps</Heading>
                                </Stack>
                                <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                    Below is a list of apps either hosted here or on other platforms that I've built as either a Proof of Concept (PoC) or in
                                    some cases some are a little more than that.
                                </Text>
                            </Stack>
                        </Stack>
                        {/* <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '4' }}>
                            {posts.map((post: IPost) => (
                                <PostCard key={post._id} post={post} showCategory={true} />
                            ))}
                        </SimpleGrid> */}
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export default AppsPage;
