import {
    AspectRatio,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Card,
    CardBody,
    CardHeader,
    Container,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useBreakpointValue
} from '@chakra-ui/react';
import { FC } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import YouTube from 'react-youtube';
import { Layout } from '../components/ui';
import { IVideoPost } from '../interfaces';
import { getVideoPosts } from '../services/videoPost.service';

interface VideoPageProps {
    videoPosts: IVideoPost[];
}

const VideoPage: FC<VideoPageProps> = ({ videoPosts }) => {
    return (
        <Layout metaTitle="Dylan Young: The journey of Sitecore Master" metaDescription="">
            <Box as="section" bg="bg-surface" position="relative">
                <Container py={{ base: '8', md: '8' }} maxW="6xl">
                    <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage isLastChild>
                            <BreadcrumbLink isCurrentPage>My Videos</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Container>
                <Container py={{ base: '8', md: '8' }} maxW="6xl">
                    <Stack spacing={{ base: '8', md: '8' }}>
                        <Stack direction="row" justify="space-between">
                            <Stack spacing={{ base: '4', md: '5' }}>
                                <Stack spacing="3">
                                    <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>My Videos</Heading>
                                </Stack>
                                <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                    A curated list of all of my video content available across multiple YouTube/Twitch/Vimeo etc. channels.
                                </Text>
                            </Stack>
                        </Stack>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: '12', lg: '4' }}>
                            {videoPosts.map((video: IVideoPost) => (
                                <>
                                    <Card>
                                        <CardHeader>{video.title}</CardHeader>
                                        <CardBody>
                                            <AspectRatio>
                                                <YouTube key={video._id} videoId={video.youtubeId} />
                                            </AspectRatio>
                                        </CardBody>
                                    </Card>
                                </>
                            ))}
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export const getStaticProps = async () => {
    const videoPosts = await getVideoPosts(12);

    return {
        props: { videoPosts }
    };
};

export default VideoPage;
