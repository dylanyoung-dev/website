import { Button, Wrap } from '@chakra-ui/react';
import _ from 'lodash';
import Link from 'next/link';
import { FC } from 'react';
import { ICategory } from '../../../interfaces';

interface CategoriesProps {
    AllCategories: ICategory[];
}

const Categories: FC<CategoriesProps> = ({ AllCategories }) => {
    return (
        <>
            {AllCategories && (
                <>
                    <Wrap direction="row">
                        {_.map(AllCategories, (category: ICategory, index) => (
                            <Button key={index} variant="outline" size="sm" alignSelf="start">
                                <Link href={`/insights/categories/${category.slug.current}`}>{category.title}</Link>{' '}
                            </Button>
                        ))}
                    </Wrap>
                </>
            )}
        </>
    );
};

export default Categories;
