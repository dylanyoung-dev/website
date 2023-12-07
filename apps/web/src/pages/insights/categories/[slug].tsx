import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Heading, SimpleGrid, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import groq from 'groq';
import { FC } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Layout, PostCard } from '../../../components';
import { ICategory, IPost } from '../../../interfaces';
import client from '../../../utils/client';

interface PostProps {
    posts: IPost[];
    category: ICategory;
    url: string;
}

const Post: FC<PostProps> = ({ posts, category, url }) => {
    return (
        <Layout metaTitle={`Dylan Young: ${category.title} blog information`} metaDescription="">
            <Box as="section" bg="bg-surface" position="relative">
                <Box as="section" bg="bg-surface">
                    <Container py={{ base: '8', md: '8' }}>
                        <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbItem isCurrentPage isLastChild>
                                <BreadcrumbLink isCurrentPage>{category.title}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </Container>
                </Box>

                <Box as="section" bg="bg-surface">
                    <Container py={{ base: '8', md: '8' }}>
                        <Stack spacing={{ base: '8', md: '8' }}>
                            <Stack direction="row" justify="space-between">
                                <Stack spacing={{ base: '4', md: '5' }}>
                                    <Stack spacing="3">
                                        <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>{category.title}</Heading>
                                    </Stack>
                                    <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                        {category.description}
                                    </Text>
                                </Stack>
                            </Stack>
                            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '4' }}>
                                {posts.map((post: IPost) => (
                                    <PostCard key={post._id} post={post} showCategory={false} />
                                ))}
                            </SimpleGrid>
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </Layout>
    );
};

export async function getStaticPaths() {
    const paths = await client.fetch(groq`*[_type == "articleCategory" && defined(slug.current)][].slug.current`);

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: false
    };
}

export async function getStaticProps(context) {
    const { slug = '' } = context.params;
    const url = process.env.HOST_URL;

    const posts = await client.fetch(
        groq`*[_type == "post" && references(*[_type=="articleCategory" && slug.current == $slug]._id)] | order(publishedAt desc){..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`,
        { slug }
    );

    const category: ICategory = await client.fetch(groq`*[_type=="articleCategory" && slug.current == $slug][0]{..., 'slug':slug.current}`, {
        slug
    });

    return {
        props: {
            posts,
            category,
            url
        }
    };
}

export default Post;
