import { SimpleGrid } from '@chakra-ui/react';
import { FC } from 'react';
import { ISeries } from '../../../interfaces/ISeries';
import { SeriesCard } from '../SeriesCard/SeriesCard';

interface SeriesListProps {
    series: ISeries[];
}

export const SeriesList: FC<SeriesListProps> = ({ series }) => {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: '12', lg: '4' }}>
            {series.map((item: ISeries) => (
                <SeriesCard key={item._id} series={item} />
            ))}
        </SimpleGrid>
    );
};
