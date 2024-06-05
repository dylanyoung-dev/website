import sanityClient from '@sanity/client';

export default sanityClient({
    projectId: process.env.NEXT_PUBLIC_projectId,
    dataset: process.env.NEXT_PUBLIC_dataset,
    useCdn: true,
    apiVersion: 'v2021-10-21'
});
