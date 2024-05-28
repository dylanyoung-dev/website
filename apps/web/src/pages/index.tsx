import { Box, Container, Heading, SimpleGrid, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import groq from 'groq';
import { MdOutlineWavingHand } from 'react-icons/md';
import { PostCard } from '../components';
import Categories from '../components/blogs/CategoryList/CategoryList';
import { Layout } from '../components/ui';
import { IPost } from '../interfaces';
import { getPosts } from '../services/post.service';
import client from '../utils/client';

const Home = ({ mostRecentPosts, allCategories }) => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Layout
            metaTitle="Dylan Young: Sitecore Developer - AI/ML, .Net, Python, React, Typescript"
            metaDescription="The thoughts and learnings of Dylan Young, Tech Enthusiast and Tech Influencer"
        >
            <Box as="section" bg="bg-surface" position="relative">
                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Stack spacing={{ base: '8', md: '10' }}>
                        <Stack spacing={{ base: '4', md: '5' }} align="center">
                            <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>
                                <MdOutlineWavingHand /> Hello
                            </Heading>
                            <Text color="muted" textAlign="center" fontSize="xl">
                                My name is Dylan Young, and I'm a software engineer and technical influencer. I blog about my passions or my curiousity in
                                technology. Here you'll find my thoughts related to Sitecore, AI/ML, .Net, Python, React, and Typescript.
                            </Text>
                        </Stack>
                    </Stack>
                </Container>
                <Container py={{ base: '8', md: '12' }} maxW={{ base: '6xl' }}>
                    <Stack spacing={{ base: '8', md: '10' }}>
                        <Stack spacing={{ base: '4', md: '5' }}>
                            <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Latest posts</Heading>
                            <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                Check out my latest content across different topics, or use the buttons below to view by category.
                            </Text>
                            {allCategories && <Categories AllCategories={allCategories} />}
                        </Stack>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '8', lg: '4' }}>
                            {mostRecentPosts.map((post: IPost) => (
                                <PostCard key={post._id} post={post} showCategory={true} />
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export default Home;

export async function getStaticProps() {
    const mostRecentPosts = await getPosts(6);

    const allCategories = await client.fetch(groq`*[_type == "articleCategory" && defined(slug.current)]{...}`);

    return {
        props: { mostRecentPosts, allCategories }
    };
}
