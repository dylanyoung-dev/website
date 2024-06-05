import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue
} from '@chakra-ui/react';
import groq from 'groq';
import { NextPage } from 'next';
import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { CategoryCards, PostCard } from '../../components';
import { Layout } from '../../components/ui';
import { ICategory, IPost } from '../../interfaces';
import { IPagination, getPosts } from '../../services/post.service';
import client from '../../utils/client';

interface InsightsPageProps {
    initialPosts: IPost[];
    allCategories: ICategory[];
    totalPosts: number;
    lastId: string;
    lastPublishedAt: string;
}

const InsightsPage: NextPage<InsightsPageProps> = (props) => {
    const [posts, setPosts] = useState<IPost[]>(props.initialPosts);
    const [lastId, setLastId] = useState<string | undefined>(props.lastId);
    const [lastPublishedAt, setLastPublishedAt] = useState<string | null>(props.lastPublishedAt);

    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMorePosts = async () => {
        setIsLoading(true);

        console.log('lastId', lastId);
        console.log('lastPublishedAt', lastPublishedAt);

        const result = await getPosts(9, lastId, lastPublishedAt);
        const newPosts = [...posts, ...result.data];

        setPosts(newPosts);
        setLastId(result.lastId);
        setLastPublishedAt(result.lastPublishedAt);

        if (newPosts.length >= result.totalCount) {
            setHasMore(false);
        }

        setIsLoading(false);
    };

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

                <CategoryCards categories={props.allCategories} />

                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Stack spacing={{ base: '8', md: '8' }}>
                        <Stack direction="row" justify="space-between">
                            <Stack spacing={{ base: '4', md: '5' }}>
                                <Stack spacing="3">
                                    <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Insights</Heading>
                                </Stack>
                                <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                    Below is the latest published content. I cover anything and everything that I love, which includes topics that are new and
                                    exciting including AI/ML, CI/CD and Infrastructure.
                                </Text>
                            </Stack>
                        </Stack>
                        {posts.length === 0 ? (
                            <Text fontSize="lg" textAlign="center">
                                No posts found
                            </Text>
                        ) : (
                            <>
                                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '4' }}>
                                    {posts.map((post: IPost) => (
                                        <PostCard key={post._id} post={post} showCategory={true} />
                                    ))}
                                </SimpleGrid>
                                {hasMore && (
                                    <Flex justifyContent="center">
                                        <Button
                                            onClick={loadMorePosts}
                                            isLoading={isLoading}
                                            loadingText="Loading more posts..."
                                            color={useColorModeValue('black', 'white')}
                                            size="lg"
                                        >
                                            Load More Posts
                                        </Button>
                                    </Flex>
                                )}
                            </>
                        )}
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export async function getStaticProps() {
    const results: IPagination<IPost> = await getPosts(9);

    const allCategories = await client.fetch(groq`*[_type == "articleCategory" && defined(slug.current)]{...}`);

    return {
        props: { initialPosts: results.data, allCategories, totalPosts: results.totalCount, lastId: results.lastId, lastPublishedAt: results.lastPublishedAt }
    };
}

export default InsightsPage;
