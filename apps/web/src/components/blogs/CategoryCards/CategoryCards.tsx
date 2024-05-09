import { Box, Button, Card, CardBody, CardFooter, Container, Heading, Image, Link, SimpleGrid, Stack, Text, useBreakpointValue } from '@chakra-ui/react';
import { FC } from 'react';
import { ICategory } from '../../../interfaces';

interface CategoryCardsProps {
    categories: ICategory[];
}

export const CategoryCards: FC<CategoryCardsProps> = ({ categories }) => {
    return (
        <>
            {categories && categories.length > 0 ? (
                <>
                    <Box as="section" bg="bg-surface">
                        <Container py={{ base: '8', md: '8' }}>
                            <Stack spacing={{ base: '8', md: '8' }}>
                                <Stack direction="row" justify="space-between">
                                    <Stack spacing={{ base: '4', md: '5' }}>
                                        <Stack spacing="3">
                                            <Heading size={useBreakpointValue({ base: 'sm', md: 'md' })}>Categories</Heading>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={{ base: '12', lg: '4' }}>
                                    {categories.map((category: ICategory) => (
                                        <Card key={category._id} direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
                                            <Image
                                                objectFit="cover"
                                                maxW={{ base: '100%', sm: '200px' }}
                                                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                                alt="Caffe Latte"
                                            />

                                            <Stack>
                                                <CardBody>
                                                    <Heading size="xs" as="h5">
                                                        {category.title}
                                                    </Heading>

                                                    <Text py="2">{category.description}</Text>
                                                </CardBody>

                                                <CardFooter>
                                                    <Link href={`/insights/categories/${category.slug.current}`}>
                                                        <Button variant="outline" colorScheme="blue">
                                                            View
                                                        </Button>
                                                    </Link>
                                                </CardFooter>
                                            </Stack>
                                        </Card>
                                    ))}
                                </SimpleGrid>
                            </Stack>
                        </Container>
                    </Box>
                </>
            ) : (
                <>No Categories</>
            )}
        </>
    );
};
