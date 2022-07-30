export default {
    name: 'post',
    title: 'Post',
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
                maxLength: 96
            }
        },
        {
            name: 'mainNote',
            type: 'note',
            options: {
                headline: 'Hold up!',
                message: 'Main Image requires an image of 500x260 dimension only.',
                tone: 'caution'
            }
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    title: 'Alternative Text',
                    name: 'alt',
                    type: 'string'
                }
            ]
        },
        {
            name: 'landscapeNote',
            type: 'note',
            options: {
                headline: 'Hold up!',
                message: 'Landscape Image requires an image of 1280x720 dimension only.',
                tone: 'caution'
            }
        },
        {
            name: 'landscapeImage',
            title: 'Landscape Post Image',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    title: 'Alternative Text',
                    name: 'alt',
                    type: 'string'
                }
            ]
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'articleCategory' } }]
        },
        {
            name: 'tagging',
            title: 'Tagging',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'tagging' } }]
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
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 4
        },
        {
            name: 'notionitemdatabaseid',
            title: 'Notion Link (Ignore)',
            type: 'text',
            readOnly: true
        }
    ],

    preview: {
        select: {
            title: 'title',
            author: 'author.name',
            media: 'mainImage'
        },
        prepare(selection) {
            const { author } = selection;
            return Object.assign({}, selection, {
                subtitle: author && `by ${author}`
            });
        }
    }
};
