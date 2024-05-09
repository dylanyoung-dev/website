import { Box, Card, CardBody, Heading, Image, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { IEngagement } from '../../../interfaces/IEngagement';

interface EngagementCardProps {
    engagement: IEngagement;
}

export const EngagementCard: FC<EngagementCardProps> = ({ engagement }) => {
    return (
        <Card>
            <CardBody>
                <Link href={`/speaking/${engagement.slug.current}`} role="group">
                    <Stack spacing="8">
                        <Box overflow="hidden">
                            {engagement.thumbnail ? (
                                <Image
                                    src={engagement.thumbnailUrl}
                                    alt={engagement.thumbnail.alt ?? ''}
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
                            <Heading size="xs">{engagement.title}</Heading>
                            <Text color="muted">{engagement.short_description}</Text>
                        </Stack>
                    </Stack>
                </Link>
            </CardBody>
        </Card>
    );
};
