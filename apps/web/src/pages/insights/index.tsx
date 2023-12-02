import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, SimpleGrid, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import groq from 'groq';
import { NextPage } from 'next';
import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { CategoryCards, PostCard } from '../../components';
import { Layout } from '../../components/ui';
import { ICategory, IPost } from '../../interfaces';
import { getPosts } from '../../services/post.service';
import client from '../../utils/client';

interface InsightsPageProps {
    posts: IPost[];
    allCategories: ICategory[];
}

const InsightsPage: NextPage<InsightsPageProps> = ({ posts, allCategories }) => {
    const [lastId, setLastId] = useState<string>(posts[posts.length - 1]._id);

    return (
        <Layout metaTitle={`Dylan Young: Blog Content on AI, Sitecore and Typescript/React`} metaDescription="">
            <Box as="section" bg="bg-surface" position="relative">
                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage isLastChild>
                            <BreadcrumbLink isCurrentPage>Insights</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Container>

                <CategoryCards categories={allCategories} />

                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Stack spacing={{ base: '8', md: '8' }}>
                        <Stack direction="row" justify="space-between">
                            <Stack spacing={{ base: '4', md: '5' }}>
                                <Stack spacing="3">
                                    <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Insights</Heading>
                                </Stack>
                                <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                    Below is the latest published content. I cover anything and everything that I love, which includes work topics such as CDP &
                                    Personalize, Connect and Send, as well as topics that are new and exciting including AI, CI/CD and Infrastructure.
                                </Text>
                            </Stack>
                        </Stack>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '4' }}>
                            {posts.map((post: IPost) => (
                                <PostCard key={post._id} post={post} showCategory={true} />
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export async function getStaticProps() {
    const paginatedPosts = await getPosts(12);

    const allCategories = await client.fetch(groq`*[_type == "articleCategory" && defined(slug.current)]{...}`);

    return {
        props: { posts: paginatedPosts, allCategories }
    };
}

export default InsightsPage;
