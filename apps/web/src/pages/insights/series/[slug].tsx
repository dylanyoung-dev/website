import { FC } from 'react';
import { Layout } from '../../../components/';
import { SeriesPosts } from '../../../components/blogs/SeriesPosts/SeriesPosts';
import { ISeries } from '../../../interfaces/ISeries';
import { getAllSeriesSlugs, getSeriesBySlug } from '../../../services/series.service';

interface SeriesPageProps {
    series: ISeries;
    url: string;
}

const SeriesPage: FC<SeriesPageProps> = ({ series, url }) => {
    return (
        <Layout metaTitle={`Insights Content`} metaDescription="">
            <SeriesPosts series={series} />
        </Layout>
    );
};

export async function getStaticPaths() {
    const slugs = await getAllSeriesSlugs();

    const paths = slugs.map((slug) => ({
        params: { slug }
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(context) {
    const { slug } = context.params;
    const url = process.env.HOST_URL;

    const series = await getSeriesBySlug(slug);

    return {
        props: {
            series,
            url
        }
    };
}

export default SeriesPage;
