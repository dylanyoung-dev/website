import { Box, Container, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { Layout } from '../components';
import { ContactForm } from '../components/forms/ContactForm/ContactForm';

interface ContactPageProps {}

const ContactPage: FC<ContactPageProps> = ({}) => {
    return (
        <Layout metaTitle="Dylan Young | Contact Me for more information" metaDescription="Leave feedback about my blogs, app projects or general feedback.">
            <Box as="section" position="relative">
                <Box as="section" bg="bg-surface" maxW="8xl">
                    <Container py={{ base: '8', md: '8' }} maxW="6xl">
                        <Stack spacing={{ base: '8', md: '10' }}>
                            <ContactForm />
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </Layout>
    );
};

export default ContactPage;
