import Link from 'next/link';
import { FC } from 'react';
import { Category } from '../../../../models/Category';
import _ from 'lodash';

interface CategoriesProps {
    AllCategories: Category[];
}

const Categories: FC<CategoriesProps> = ({ AllCategories }) => {
    return (
        <section className="block block-content">
            {AllCategories && (
                <>
                    <h2 className="block-title underline inner-sm">Insight Categories</h2>
                    <div className="post-feed">
                        <ul>
                            {_.map(AllCategories, (category, index) => (
                                <>
                                    <li key={index}>
                                        <Link href={`/insights/categories/${category.Slug}`}>
                                            <a>{category.Title}</a>
                                        </Link>{' '}
                                    </li>
                                </>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </section>
    );
};

export default Categories;
