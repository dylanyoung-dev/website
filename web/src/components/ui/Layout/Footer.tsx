import { Box, Button, ButtonGroup, Container, Divider, HStack, IconButton, Input, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { FaDev, FaGithub, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

export const Footer = () => (
    <Box bg="bg-surface">
        <Container as="footer" role="contentinfo">
            <Stack spacing={{ base: '12', md: '8' }} direction={{ base: 'column-reverse', lg: 'row' }} py={{ base: '12', md: '16' }} justify="space-between">
                <SimpleGrid columns={{ base: 2, md: 4 }} gap="8" width={{ base: 'full', lg: 'auto' }}>
                    <Stack spacing="4" minW={{ lg: '40' }}>
                        <Text fontSize="sm" fontWeight="semibold" color="subtle">
                            General
                        </Text>
                        <Stack spacing="3" shouldWrapChildren>
                            <Button as="a" variant="link" href="/">
                                Home
                            </Button>
                            <Button as="a" variant="link" href="/insights">
                                Insights
                            </Button>
                            <Button as="a" variant="link" href="/insights/series">
                                Series
                            </Button>
                            <Button as="a" variant="link" href="/videos">
                                Videos
                            </Button>
                            <Button as="a" variant="link" href="/about">
                                About
                            </Button>
                            <Button as="a" variant="link" href="/contact">
                                Contact Me
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack spacing="4" minW={{ lg: '40' }}>
                        <Text fontSize="sm" fontWeight="semibold" color="subtle">
                            Insights
                        </Text>
                        <Stack spacing="3" shouldWrapChildren>
                            <Button as="a" variant="link" href="/insights/categories/sitecore-cdp-personalize/">
                                CDP/Personalize
                            </Button>
                            <Button as="a" variant="link" href="/insights/categories/backend-development/">
                                Backend Development
                            </Button>
                        </Stack>
                    </Stack>
                </SimpleGrid>
                <Stack spacing="4">
                    <Text fontSize="sm" fontWeight="semibold" color="subtle">
                        Stay up to date
                    </Text>
                    <Stack spacing="4" direction={{ base: 'column', sm: 'row' }} maxW={{ lg: '360px' }}>
                        <Input placeholder="Enter your email" type="email" required />
                        <Button variant="primary" type="submit" flexShrink={0}>
                            Subscribe
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            <Divider />
            <Stack pb="12" pt="8" justify="space-between" direction={{ base: 'column', md: 'row' }} align={{ base: 'start', md: 'center' }}>
                <HStack justify={{ base: 'space-between', sm: 'start' }} width={{ base: 'full', sm: 'auto' }} spacing="8">
                    <ButtonGroup variant="ghost">
                        <IconButton as="a" href="https://www.linkedin.com/in/dylanyoung/" aria-label="LinkedIn" icon={<FaLinkedin fontSize="1.25rem" />} />
                        <IconButton as="a" href="https://github.com/dylanyoung-dev" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
                        <IconButton as="a" href="https://twitter.com/dylanyoung_dev" aria-label="Twitter" icon={<FaTwitter fontSize="1.25rem" />} />
                        <IconButton as="a" href="https://youtube.com/c/dylanyoungdev" aria-label="YouTube" icon={<FaYoutube fontSize="1.25rem" />} />
                        <IconButton as="a" href="https://dev.to/dylanyoung_dev" aria-label="Rick Roll" icon={<FaDev fontSize="1.25rem" />} />
                    </ButtonGroup>
                </HStack>
                <Text fontSize="sm" color="subtle">
                    &copy; {new Date().getFullYear()} All rights reserved.
                </Text>
            </Stack>
        </Container>
    </Box>
);
