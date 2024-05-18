import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Container,
    Heading,
    Link,
    Stack,
    VStack,
    useBreakpointValue
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import { IPost } from '../../../interfaces';
import { ISeries } from '../../../interfaces/ISeries';
import { RenderMarkdown } from '../../ui/RenderMarkdown';

interface SeriesPostsProps {
    series: ISeries;
}

export const SeriesPosts: FC<SeriesPostsProps> = ({ series }) => {
    const [openIndex, setOpenIndex] = useState<number[]>([0]);

    const handleLinkClick = (index: number) => {
        setOpenIndex([index]);
    };

    const handleAccordionChange = (indices: number[]) => {
        setOpenIndex(indices);
    };

    return (
        <Stack direction="row" spacing={8} width="6xl" minHeight="100vh">
            <VStack align="start" spacing={4} width="sm">
                <Heading size={useBreakpointValue({ base: 'xs' })}>{series.title}</Heading>
                {series.posts.map((post: IPost, index) => (
                    <Link onClick={() => handleLinkClick(index)} key={index}>
                        {post.title}
                    </Link>
                ))}
            </VStack>
            <VStack align="start" spacing={4}>
                <Accordion allowMultiple onChange={handleAccordionChange} index={openIndex}>
                    {series.posts.map((post: IPost, index) => (
                        <AccordionItem width="100%">
                            <AccordionButton>
                                <Box as="h2" fontSize="md" flex="1" textAlign="left">
                                    {post.title}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                {post.body && (
                                    <Container size="md" maxW="container.md">
                                        <RenderMarkdown>{post.body}</RenderMarkdown>
                                    </Container>
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </VStack>
        </Stack>
    );
};
