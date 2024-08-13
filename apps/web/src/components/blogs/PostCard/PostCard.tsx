import { Badge, Box, Card, CardBody, HStack, Heading, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import Moment from 'react-moment';
import { IPost } from '../../../interfaces';

interface PostCardProps {
    post: IPost;
    showCategory: boolean;
}

export const PostCard: FC<PostCardProps> = ({ post, showCategory = true }) => {
    return (
        <Card>
            <CardBody>
                <Link href={`/insights/${post.slug.current}`} role="group">
                    <Stack spacing="8">
                        <Box overflow="hidden">
                            {post.mainImageUrl ? (
                                <Image
                                    src={post.mainImageUrl}
                                    alt={post.mainImage.alt ?? ''}
                                    width="full"
                                    height="15rem"
                                    objectFit="cover"
                                    transition="all 0.2s"
                                    _groupHover={{ transform: 'scale(1.05)' }}
                                />
                            ) : (
                                <Image
                                    src="https://source.unsplash.com/random/500x260"
                                    alt="unsplash image"
                                    width="full"
                                    height="15rem"
                                    objectFit="cover"
                                    transition="all 0.2s"
                                    _groupHover={{ transform: 'scale(1.05)' }}
                                />
                            )}
                        </Box>

                        <Stack spacing="3">
                            <Heading size="xs">{post.title}</Heading>
                            {showCategory && (
                                <>
                                    {post.categories && post.categories.length > 0 && post.categories[0] && (
                                        <Stack direction="row">
                                            <Badge variant="solid">{post.categories[0].title}</Badge>
                                        </Stack>
                                    )}
                                </>
                            )}
                            <Text color="muted">{post.excerpt}</Text>
                        </Stack>
                        <HStack>
                            <Text color="accent" textTransform="uppercase" fontSize="sm" fontWeight="semibold">
                                <time className="published">
                                    <Moment format="MMMM DD, YYYY">{post.publishedAt}</Moment>
                                </time>
                            </Text>
                            <Spacer />
                            {post.readingTime && (
                                <Text color="grey" textTransform="uppercase" fontSize="sm" fontWeight="semibold">
                                    {post.readingTime}
                                </Text>
                            )}
                        </HStack>
                    </Stack>
                </Link>
            </CardBody>
        </Card>
    );
};
