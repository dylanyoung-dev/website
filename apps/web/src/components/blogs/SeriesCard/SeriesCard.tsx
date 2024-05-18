import { Card, CardBody, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { ISeries } from '../../../interfaces/ISeries';

interface SeriesCardProps {
    series: ISeries;
}

export const SeriesCard: FC<SeriesCardProps> = ({ series }) => {
    return (
        <Card>
            <CardBody>
                <Link href={`/insights/series/${series.slug.current}`} role="group">
                    <Stack spacing="8">
                        <Stack spacing="3">
                            <Heading size="xs">{series.title}</Heading>
                            <Text color="muted">{series.description}</Text>
                            <Text color="accent" textTransform="uppercase" fontSize="sm" fontWeight="semibold">
                                {series.posts.length} posts
                            </Text>
                        </Stack>
                    </Stack>
                </Link>
            </CardBody>
        </Card>
    );
};
