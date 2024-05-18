import {
    Box,
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
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark, coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';
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

            const codeStyle = colorMode === 'dark' ? coy : atomDark;
            return !inline && match ? (
                <Box my="4" borderRadius="0">
                    {className}
                    <SyntaxHighlighter
                        borderRadius={0}
                        style={codeStyle}
                        showLineNumbers
                        wrapLines={true}
                        wrapLongLines={true}
                        language={match ? match[1] : 'typescript'}
                        PreTag="div"
                        children={String(children).replace(/\n$/, '')}
                        {...props}
                    />
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
                <Element spacing={2} mt="4" mb="4" as={ordered ? 'ol' : 'ul'} styleType={styleType} style={{ listStyleType: styleType }} pl={4} {...attrs}>
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
