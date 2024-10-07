import {
    Box,
    Button,
    Checkbox,
    Code,
    Heading,
    Image,
    Link,
    ListItem,
    OrderedList,
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
import { Highlight, themes } from 'prism-react-renderer';
import { FC, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RenderMarkdownProps {
    children: any;
}

type GetCoreProps = {
    children?: React.ReactNode;
    'data-sourcepos'?: any;
};

function getCoreProps(props: GetCoreProps): any {
    return props['data-sourcepos'] ? { 'data-sourcepos': props['data-sourcepos'] } : {};
}

export const RenderMarkdown: FC<RenderMarkdownProps> = ({ children }) => {
    const { colorMode } = useColorMode();
    const [copied, setCopied] = useState(false);
    const codeTheme = colorMode === 'dark' ? themes.nightOwl : themes.nightOwlLight;

    const components = {
        //...ChakraUIRenderer(),
        h1: ({ node, ...props }) => (
            <Heading mb={1} as="h1" fontSize="xl" {...props}>
                {props.children}
            </Heading>
        ),
        h2: ({ node, ...props }) => (
            <Heading mb={-2} as="h2" fontSize="xl" {...props}>
                {props.children}
            </Heading>
        ),
        h3: ({ node, ...props }) => (
            <Heading mb={-2} as="h3" fontSize="lg" {...props}>
                {props.children}
            </Heading>
        ),
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const [copied, setCopied] = useState(false);

            return !inline && match ? (
                <Box my="4" borderRadius="md" position="relative" border="1px solid" borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.300'}>
                    <CopyToClipboard text={String(children).replace(/\n$/, '')} onCopy={() => setCopied(true)}>
                        <Button size="sm" position="absolute" top="2" right="2">
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    </CopyToClipboard>
                    <Highlight code={String(children).replace(/\n$/, '')} language={match[1]} theme={codeTheme}>
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                            <pre className={className} style={{ ...style, overflowX: 'auto', paddingLeft: '10px' }}>
                                {tokens.map((line, i) => (
                                    <Box ml={2} key={i} {...getLineProps({ line })}>
                                        <Box as="span" mr={4} opacity={0.5}>
                                            {i + 1}
                                        </Box>
                                        {line.map((token, key) => (
                                            <span key={key} {...getTokenProps({ token })} />
                                        ))}
                                    </Box>
                                ))}
                            </pre>
                        )}
                    </Highlight>
                </Box>
            ) : (
                <Code borderRadius={0} {...props}>
                    {children}
                </Code>
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
                <Element spacing={2} my={4} as={ordered ? 'ol' : 'ul'} styleType={styleType} style={{ listStyleType: styleType }} pl={4} {...attrs}>
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
                <Element my={4} spacing={2} as={ordered ? 'ol' : 'ul'} styleType={styleType} pl={4} {...attrs}>
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
                <ListItem {...getCoreProps(props)} listStyleType={checked !== null ? 'circle' : 'inherit'}>
                    {checkbox || children}
                </ListItem>
            );
        },
        img: ({ node, ...props }) => <Image border={'1px solid #BBB'} mt="4" mb="4" {...props} />,
        a: ({ node, ...props }) => <Link {...props} isExternal textDecoration={'underline'} />,
        text: ({ node, ...props }) => <Text as="span" {...props} />,
        table: ({ node, ...props }) => <Table {...props} my="2" mb="6" />,
        thead: ({ node, ...props }) => <Thead {...props} />,
        tbody: ({ node, ...props }) => <Tbody {...props} />,
        tr: ({ node, ...props }) => <Tr {...props} />,
        td: ({ node, isHeader, ...props }) => <Td {...props} />,
        th: ({ node, isHeader, ...props }) => <Th {...props} />
    };

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components} skipHtml>
            {children}
        </ReactMarkdown>
    );
};
