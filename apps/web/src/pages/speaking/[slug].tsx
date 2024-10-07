import { Box, Container, Flex, Heading, Image, Link, SimpleGrid, Stack, Text, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'next-share';
import { FC } from 'react';

import { PostCard } from '../../components';
import { Layout } from '../../components/ui';
import { RenderMarkdown } from '../../components/ui/RenderMarkdown';
import { IPost } from '../../interfaces';
import { IEngagement } from '../../interfaces/IEngagement';
import { getAllEngagementSlugs, getEngagementBySlug } from '../../services/engagements.service';

interface EngagementProps {
    engagement: IEngagement;
    url: string;
}

const Engagement: FC<EngagementProps> = ({ engagement, url }: EngagementProps) => {
    const shortPath = `/speaking/${engagement.slug.current}/`;
    const fullPath = `${url}${shortPath}`;
    const { colorMode } = useColorMode();

    return (
        <Layout metaTitle={engagement.title} metaDescription={engagement.short_description} ogPhoto={engagement.thumbnailUrl} ogUrl={fullPath}>
            <Box as="section" bg="bg-surface" w={{ base: 'sm', md: 'lg', lg: '5xl' }} mb={4}>
                <Container py={{ base: '8', md: '8' }}>
                    <Stack spacing={{ base: '6', md: '6' }}>
                        <Heading as="h1" fontSize="4xl" lineHeight="shorter" mt={2}>
                            {engagement.title}
                        </Heading>
                        {engagement.slides_link && (
                            <Link href={engagement.slides_link} isExternal>
                                View Slides
                            </Link>
                        )}
                        <Flex>
                            <Stack direction="row">
                                <TelegramShareButton url={fullPath}>
                                    <TelegramIcon size={32} />
                                </TelegramShareButton>
                                <TwitterShareButton url={fullPath}>
                                    <TwitterIcon size={32} />
                                </TwitterShareButton>
                                <LinkedinShareButton url={fullPath}>
                                    <LinkedinIcon size={32} />
                                </LinkedinShareButton>
                                <EmailShareButton url={fullPath} subject={'Check out this Speaking Engagement'}>
                                    <EmailIcon size={32} />
                                </EmailShareButton>
                            </Stack>
                        </Flex>
                    </Stack>
                </Container>
            </Box>

            {engagement.thumbnail && <Image src={engagement.thumbnailUrl} alt={engagement.thumbnail.alt} />}
            <Box as="section" bg="bg-surface" w={{ base: 'sm', md: 'lg', lg: '5xl' }} mt={4}>
                <Container py={{ base: '8', md: '8' }}>
                    <Stack spacing={{ base: '6', md: '6' }}>
                        {engagement.details && (
                            <Container size="md">
                                <RenderMarkdown>{engagement.details}</RenderMarkdown>
                            </Container>
                        )}
                    </Stack>
                    {engagement.posts?.length > 0 && (
                        <Container py={{ base: '8', md: '12' }} maxW="6xl">
                            <Stack spacing={{ base: '8', md: '8' }}>
                                <Stack direction="row" justify="space-between">
                                    <Stack spacing={{ base: '4', md: '5' }}>
                                        <Stack spacing="3">
                                            <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Related Content</Heading>
                                        </Stack>
                                        <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                            Below is specific curated content related to this speaking engagement.
                                        </Text>
                                    </Stack>
                                </Stack>
                                <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={{ base: '12', lg: '4' }}>
                                    {engagement.posts.map((post: IPost) => (
                                        <PostCard key={post._id} post={post} showCategory={true} />
                                    ))}
                                </SimpleGrid>
                            </Stack>
                        </Container>
                    )}
                </Container>
            </Box>
        </Layout>
    );
};

export async function getStaticPaths() {
    const slugs = await getAllEngagementSlugs();

    const paths = slugs.map((slug) => ({
        params: { slug }
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(context) {
    const { slug } = context.params;
    const url = process.env.HOST_URL;

    const engagement = await getEngagementBySlug(slug);

    return {
        props: {
            engagement,
            url
        }
    };
}

export default Engagement;
