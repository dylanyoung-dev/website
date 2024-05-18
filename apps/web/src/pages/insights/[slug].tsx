import { Box, Container, Flex, Heading, Image, Spacer, Stack, Text, useColorMode } from '@chakra-ui/react';
import groq from 'groq';
import { EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'next-share';
import { FC } from 'react';
import Moment from 'react-moment';
import { Layout } from '../../components/ui';
import { RenderMarkdown } from '../../components/ui/RenderMarkdown';
import { IPost } from '../../interfaces';
import client from '../../utils/client';

interface PostProps {
    post: IPost;
    url: string;
}

type GetCoreProps = {
    children?: React.ReactNode;
    'data-sourcepos'?: any;
};

function getCoreProps(props: GetCoreProps): any {
    return props['data-sourcepos'] ? { 'data-sourcepos': props['data-sourcepos'] } : {};
}

const Post: FC<PostProps> = ({ post, url }: PostProps) => {
    const shortPath = `/insights/${post.slug.current}/`;
    const fullPath = `${url}${shortPath}`;
    const { colorMode } = useColorMode();

    return (
        <Layout metaTitle={post.title} metaDescription={post.excerpt} ogPhoto={post.landscapeImageUrl} ogUrl={fullPath}>
            <Box as="section" bg="bg-surface" maxW="4xl" mb={4}>
                <Container py={{ base: '8', md: '8' }}>
                    <Stack spacing={{ base: '6', md: '6' }}>
                        <Heading as="h1" fontSize="4xl" lineHeight="shorter" mt={2}>
                            {post.title}
                        </Heading>
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
                                <EmailShareButton url={fullPath} subject={'Check out this blog post'}>
                                    <EmailIcon size={32} />
                                </EmailShareButton>
                            </Stack>
                            <Spacer />
                            {post.readingTime && (
                                <Text color="accent" textTransform="uppercase" fontSize="sm" fontWeight="semibold">
                                    {post.readingTime}
                                </Text>
                            )}
                        </Flex>
                        <Text>
                            <strong>Published</strong>: <Moment format="MMMM DD, YYYY">{post.publishedAt}</Moment>
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {post.landscapeImage && <Image src={post.landscapeImageUrl} alt={post.landscapeImage.alt} />}
            <Box as="section" bg="bg-surface" maxW={{ base: 'sm', md: 'lg', lg: '4xl' }} mt={4}>
                <Container py={{ base: '8', md: '8' }}>
                    <Stack spacing={{ base: '6', md: '6' }}>
                        {post.body && (
                            <Container size="md">
                                <RenderMarkdown>{post.body}</RenderMarkdown>
                            </Container>
                        )}
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export async function getStaticPaths() {
    const paths = await client.fetch(groq`*[_type == "post" && defined(slug.current)][].slug.current`);

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: false
    };
}

export async function getStaticProps(context) {
    const { slug = '' } = context.params;
    const url = process.env.HOST_URL;

    const post = await client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url}`,
        { slug }
    );

    return {
        props: {
            post,
            url
        }
    };
}

export default Post;
