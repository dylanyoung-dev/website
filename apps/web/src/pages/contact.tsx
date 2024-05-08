import { Box, Container, Heading, Stack, useBreakpointValue } from '@chakra-ui/react';
import Script from 'next/script';
import { FC } from 'react';
import { Layout } from '../components';

interface ContactPageProps {}

const ContactPage: FC<ContactPageProps> = ({}) => {
    return (
        <Layout metaTitle="Dylan Young | Contact Me for more information" metaDescription="Leave feedback about my blogs, app projects or general feedback.">
            <Box as="section" position="relative" w={{ base: 'sm', md: 'md', lg: 'xl', xl: '6xl' }}>
                <Container py={{ base: '8', md: '12' }} maxW="6xl">
                    <Stack spacing={{ base: '8', md: '8' }}>
                        <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Contact Me</Heading>
                        <iframe
                            data-tally-src="https://tally.so/embed/npOvZ1?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                            loading="lazy"
                            width="100%"
                            frameBorder={0}
                            marginHeight={0}
                            marginWidth={0}
                            title="Contact Me"
                        ></iframe>

                        <Script
                            id="tally-js"
                            src="https://tally.so/widgets/embed.js"
                            onLoad={() => {
                                globalThis.Tally.loadEmbeds();
                            }}
                        />
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
};

export default ContactPage;
