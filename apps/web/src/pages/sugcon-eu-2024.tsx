import { Container, Heading, SimpleGrid, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import groq from 'groq';
import { FC } from 'react';
import { PostCard } from '../components';
import { Layout } from '../components/ui';
import { IPost } from '../interfaces';
import client from '../utils/client';

interface SugConPageProps {
    specificArticles: IPost[];
}

const SugConPage: FC<SugConPageProps> = ({ specificArticles }) => {
    return (
        <Layout metaTitle="Helpful resources on Behavioral Personalization either in General or specific to XM Cloud Plus" metaDescription="">
            <Container py={{ base: '8', md: '12' }} maxW={{ base: '6xl' }}>
                <Stack spacing={{ base: '8', md: '10' }}>
                    <Stack spacing={{ base: '4', md: '5' }}>
                        <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Behavioral Personalization Topics</Heading>
                        <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                            Below is a curated list of blog content that I've created over the last year on Behavioral Personalization topics. Some of these are
                            specific to talks that I've given, while other topics are generic in nature.
                        </Text>
                    </Stack>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '8', lg: '4' }}>
                        {specificArticles.map((post: IPost) => (
                            <PostCard key={post._id} post={post} showCategory={true} />
                        ))}
                    </SimpleGrid>
                </Stack>
            </Container>
        </Layout>
    );
};

export default SugConPage;

export async function getStaticProps() {
    const specificArticles = await client.fetch(
        groq`*[_id in ["aHr1C3DynGvzMkbCOrvYfj","2Yh8nlDmUZ6Jg9z9BCyEYT"] && defined(slug.current)]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`
    );

    return {
        props: { specificArticles }
    };
}
