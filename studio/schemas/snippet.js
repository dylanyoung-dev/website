export default {
    name: 'snippet',
    title: 'Snippet',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxlength: 96
            }
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'snippetCategory' } }]
        },
        {
            name: 'tagging',
            title: 'Snippet Tags',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'tagging' } }]
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text'
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime'
        },
        {
            name: 'body',
            title: 'Body',
            type: 'markdown'
        }
    ]
};
