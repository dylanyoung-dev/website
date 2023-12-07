import { Container, Stack, StackDivider } from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';

interface ContactFormProps {}

interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
}

export const ContactForm: FC<ContactFormProps> = () => {
    const { register, handleSubmit, reset } = useForm<ContactFormData>();

    const onSubmit = (data: ContactFormData) => {
        console.log(data);
    };

    return (
        <Container py={{ base: '4', md: '8' }}>
            <Stack spacing="5" divider={<StackDivider />}>
                {/* <Stack direction={{ base: 'column', lg: 'row' }} spacing={{ base: '5', lg: '8' }} justify="space-between">
                    <Box flexShrink={0}>
                        <Text fontSize="lg" fontWeight="medium">
                            Contact Details
                        </Text>
                        <Text color="muted" fontSize="sm">
                            Provide your details below and I will get back to you as soon as possible.
                        </Text>
                    </Box>
                    <Box as="form" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')} netlify borderRadius="lg" maxW={{ lg: '3xl' }}>
                        <Stack spacing="5" px={{ base: '4', md: '6' }} py={{ base: '5', md: '6' }}>
                            <Stack spacing="6" direction={{ base: 'column', md: 'row' }}>
                                <FormControl id="firstName">
                                    <FormLabel>First Name</FormLabel>
                                    <Input defaultValue="John" />
                                </FormControl>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input defaultValue="Doe" />
                                </FormControl>
                            </Stack>
                            <FormControl id="email">
                                <FormLabel>E-mail Address</FormLabel>
                                <Input defaultValue="john.doe@domain.com" />
                            </FormControl>
                        </Stack>
                        <Divider />
                        <Flex direction="row-reverse" py="4" px={{ base: '4', md: '6' }}>
                            <HStack>
                                <Button type="submit" variant="primary" onClick={() => onSubmit}>
                                    Submit
                                </Button>
                            </HStack>
                        </Flex>
                    </Box>
                </Stack> */}
            </Stack>
        </Container>
    );
};
