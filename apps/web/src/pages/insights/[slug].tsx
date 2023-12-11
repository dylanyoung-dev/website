import {
    Box,
    Checkbox,
    Code,
    Container,
    Flex,
    Heading,
    Image,
    Link,
    ListItem,
    OrderedList,
    Spacer,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    UnorderedList,
    useColorMode
} from '@chakra-ui/react';
import groq from 'groq';
import { EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'next-share';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy, twilight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import { Layout } from '../../components/ui';
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

    const components = {
        //...ChakraUIRenderer(),
        h1: ({ node, ...props }) => (
            <Heading mb={1} as="h1" fontSize="xl" {...props}>
                {props.children}
            </Heading>
        ),
        h2: ({ node, ...props }) => (
            <Heading mb={0.5} as="h2" fontSize="lg" {...props}>
                {props.children}
            </Heading>
        ),
        h3: ({ node, ...props }) => (
            <Heading mb={0.5} as="h3" fontSize="md" {...props}>
                {props.children}
            </Heading>
        ),
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeStyle = colorMode === 'dark' ? coy : twilight;
            return !inline && match ? (
                <Box my="4">
                    <SyntaxHighlighter
                        style={codeStyle}
                        showLineNumbers
                        language={match ? [1] : 'typescript'}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        {...props}
                    />
                </Box>
            ) : (
                <Code {...props}>{children}</Code>
            );
        },
        p: ({ node, ...props }) => (
            <Text {...props} mb={2}>
                {props.children}
            </Text>
        ),
        em: ({ node, ...props }) => (
            <Text as="em" {...props}>
                {props.children}
            </Text>
        ),
        ul: ({ node, ...props }) => {
            const { ordered, children, depth } = props;
            const attrs = getCoreProps(props);
            let Element = UnorderedList;
            let styleType = 'disc';
            if (ordered) {
                Element = OrderedList;
                styleType = 'decimal';
            }
            if (depth === 1) styleType = 'circle';
            return (
                <Element spacing={2} as={ordered ? 'ol' : 'ul'} styleType={styleType} pl={4} {...attrs}>
                    {children}
                </Element>
            );
        },
        ol: ({ node, ...props }) => {
            const { ordered, children, depth } = props;
            const attrs = getCoreProps(props);
            let Element = UnorderedList;
            let styleType = 'disc';
            if (ordered) {
                Element = OrderedList;
                styleType = 'decimal';
            }
            if (depth === 1) styleType = 'circle';
            return (
                <Element spacing={2} as={ordered ? 'ol' : 'ul'} styleType={styleType} pl={4} {...attrs}>
                    {children}
                </Element>
            );
        },
        li: ({ node, ...props }) => {
            const { children, checked } = props;
            let checkbox = null;
            if (checked !== null && checked !== undefined) {
                checkbox = (
                    <Checkbox isChecked={checked} isReadOnly>
                        {children}
                    </Checkbox>
                );
            }
            return (
                <ListItem {...getCoreProps(props)} listStyleType={checked !== null ? 'none' : 'inherit'}>
                    {checkbox || children}
                </ListItem>
            );
        },
        img: ({ node, ...props }) => <Image {...props} />,
        a: ({ node, ...props }) => <Link {...props} isExternal />,
        text: ({ node, ...props }) => <Text as="span" {...props} />,
        table: ({ node, ...props }) => <Table {...props} my="2" mb="6" />,
        thead: ({ node, ...props }) => <Thead {...props} />,
        tbody: ({ node, ...props }) => <Tbody {...props} />,
        tr: ({ node, ...props }) => <Tr {...props} />,
        td: ({ node, isHeader, ...props }) => <Td {...props} />,
        th: ({ node, isHeader, ...props }) => <Th {...props} />
    };

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
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
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
