import { Box, Container, Heading, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import groq from 'groq';
import { LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'next-share';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';
import { Layout } from '../../components/ui';
import { IPost } from '../../interfaces';
import client from '../../utils/client';

interface PostProps {
    post: IPost;
    url: string;
}

const Post: FC<PostProps> = ({ post, url }: PostProps) => {
    const shortPath = `/insights/${post.slug.current}/`;
    const fullPath = `${url}${shortPath}`;
    const { colorMode } = useColorMode();

    const newTheme = {
        h1: (props) => {
            return (
                <Heading mb={1} as="h1" fontSize="xl">
                    {props.children}
                </Heading>
            );
        },
        h2: (props) => {
            const { children } = props;
            return (
                <Heading mb={2} mt={6} lineHeight="none" as="h2" fontSize="lg">
                    {children}
                </Heading>
            );
        },
        h3: (props) => {
            return (
                <Heading mb={2} mt={6} as="h3" lineHeight="none" fontSize="lg">
                    {props.children}
                </Heading>
            );
        },
        pre: (props) => {
            return (
                <Box
                    as="pre"
                    bg={colorMode == 'dark' ? 'gray.800' : 'gray.900'}
                    color={'gray.500'}
                    mb={6}
                    mt={4}
                    overflow="auto"
                    whiteSpace="pre-wrap"
                    wordBreak="break-word"
                    {...props}
                />
            );
        }
    };

    return (
        <Layout metaTitle={post.title} metaDescription={post.excerpt} ogPhoto={post.landscapeImageUrl} ogUrl={fullPath}>
            <Box as="section" bg="bg-surface" maxW="4xl" mb={4}>
                <Container py={{ base: '8', md: '8' }}>
                    <Stack spacing={{ base: '6', md: '6' }}>
                        <Heading as="h1" fontSize="4xl" lineHeight="shorter" mt={2}>
                            {post.title}
                        </Heading>
                        <Stack direction="row">
                            <TwitterShareButton url={fullPath}>
                                <TwitterIcon size={32} />
                            </TwitterShareButton>
                            <LinkedinShareButton url={fullPath}>
                                <LinkedinIcon size={32} />
                            </LinkedinShareButton>
                        </Stack>
                        <Text>
                            <strong>Published</strong>: <Moment format="MMMM DD, YYYY">{post.publishedAt}</Moment>
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {post.landscapeImage && <Image src={post.landscapeImageUrl} alt={post.landscapeImage.alt} />}
            <Box as="section" bg="bg-surface" maxW="4xl" mt={4}>
                <Container py={{ base: '8', md: '8' }}>
                    <Stack spacing={{ base: '6', md: '6' }}>
                        {post.body && (
                            <Container size="md">
                                <ReactMarkdown components={ChakraUIRenderer(newTheme)} skipHtml>
                                    {post.body}
                                </ReactMarkdown>
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
