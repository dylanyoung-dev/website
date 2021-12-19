import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: 'lanua4su',
    dataset: 'production',
    useCdn: true
});