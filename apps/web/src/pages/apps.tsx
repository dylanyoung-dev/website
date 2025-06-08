import {
    Badge,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Container,
    Heading,
    Link,
    SimpleGrid,
    Stack,
    Tag,
    Text,
    useBreakpointValue
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { Layout } from '../components';

interface AppsPageProps {}

const AppsPage: NextPage<AppsPageProps> = () => {
    return (
        <Layout metaTitle="Dylan Young: My personal Proof of Concept projects on AI/ML and more" metaDescription="">
            <Box as="section" bg="bg-surface" position="relative">
                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Breadcrumb spacing="8px" separator={<FiChevronRight color="gray.500" />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage isLastChild>
                            <BreadcrumbLink isCurrentPage>Apps</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </Container>
                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Stack spacing={{ base: '8', md: '8' }}>
                        <Stack direction="row" justify="space-between">
                            <Stack spacing={{ base: '4', md: '5' }}>
                                <Stack spacing="3">
                                    <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Apps</Heading>
                                </Stack>
                                <Text color="muted" fontSize={{ base: 'lg', md: 'xl' }}>
                                    Below is a list of apps either hosted here or on other platforms that I've built as either a Proof of Concept (PoC) or in
                                    some cases some are a little more than that.
                                </Text>
                            </Stack>
                        </Stack>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={{ base: '4', lg: '4' }}>
                            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                                <Heading as="h3" size="md">
                                    AmplifyUP
                                </Heading>
                                <Text mt={2} mb={4}>
                                    An AI-powered development platform. Currently a work-in-progress
                                </Text>

                                <Stack direction="row" mb={4}>
                                    <Heading as="h5" size="xs">
                                        Built with:
                                    </Heading>
                                    <Badge colorScheme="gray">Express JS</Badge>
                                    <Badge colorScheme="gray">Next.js / TurboRepo</Badge>
                                    <Badge colorScheme="gray">Clerk Auth</Badge>
                                </Stack>

                                <Link href="https://amplifyup.ai" isExternal>
                                    <Button rightIcon={<FiExternalLink />} colorScheme="blue" size="sm">
                                        Visit Website
                                    </Button>
                                </Link>
                            </Box>

                            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                                <Heading as="h3" size="md">
                                    My Copilot
                                </Heading>
                                <Text mt={2} mb={4}>
                                    An AI-powered LLM chat application.
                                </Text>

                                <Stack direction="row" mb={4}>
                                    <Heading as="h4" size="xs">
                                        Built with:
                                    </Heading>
                                    <Badge size="sm" variant="outline" colorScheme="facebook">
                                        Next.js
                                    </Badge>
                                    <Badge size="sm" variant="outline" colorScheme="facebook">
                                        Vercel AI SDK
                                    </Badge>
                                    <Tag size="sm" variant="outline" colorScheme="facebook">
                                        TailwindCSS / ShadCN UI
                                    </Tag>
                                </Stack>

                                <Link href="https://copilot.dylanyoung.dev/" isExternal>
                                    <Button rightIcon={<FiExternalLink />} colorScheme="blue" size="sm">
                                        Visit Website
                                    </Button>
                                </Link>
                            </Box>
                        </SimpleGrid>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export default AppsPage;
