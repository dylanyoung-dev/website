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
    SimpleGrid,
    Stack,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    UnorderedList,
    useBreakpointValue,
    useColorMode
} from '@chakra-ui/react';
import { EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'next-share';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy, twilight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import { PostCard } from '../../components';
import { Layout } from '../../components/ui';
import { IPost } from '../../interfaces';
import { IEngagement } from '../../interfaces/IEngagement';
import { getAllEngagementSlugs, getEngagementBySlug } from '../../services/engagements.service';

interface EngagementProps {
    engagement: IEngagement;
    url: string;
}

type GetCoreProps = {
    children?: React.ReactNode;
    'data-sourcepos'?: any;
};

function getCoreProps(props: GetCoreProps): any {
    return props['data-sourcepos'] ? { 'data-sourcepos': props['data-sourcepos'] } : {};
}

const Engagement: FC<EngagementProps> = ({ engagement, url }: EngagementProps) => {
    const shortPath = `/speaking/${engagement.slug.current}/`;
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
                                <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
                                    {engagement.details}
                                </ReactMarkdown>
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
