export const articleCategory = {
    name: 'articleCategory',
    title: 'Article Categories',
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
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'coverImage',
            title: 'Cover image',
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
        }
    ]
};

export const page = {
    name: 'page',
    title: 'Pages',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' }
    ]
};

export const author = {
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96
            }
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'array',
            of: [
                {
                    title: 'Block',
                    type: 'block',
                    styles: [{ title: 'Normal', value: 'normal' }],
                    lists: []
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image'
        }
    }
};

export const post = {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            description: 'Title of the post',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'slug',
            description: 'Specify the last part of the url, ex: /insights/{slug}',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'canonicalUrl',
            title: 'Canonical URL',
            type: 'url',
            description: "Use this option if you've published the original content on another platform."
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
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'readingTime',
            title: 'Reading Time',
            type: 'string'
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
            type: 'string',
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

export const videoPost = {
    name: 'videoPost',
    title: 'Video Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'youtubeId',
            title: 'Youtube ID',
            type: 'string'
        },
        {
            name: 'summary',
            title: 'Summary',
            type: 'text'
        },
        {
            name: 'dateReleased',
            title: 'Date Released',
            type: 'date'
        },
        {
            name: 'channel',
            title: 'Channel',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'channel' } }]
        }
    ]
};

export const videoChannel = {
    name: 'channel',
    title: 'Video Channels',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'channelUrl',
            title: 'Channel URL',
            type: 'url'
        }
    ]
};

export const snippet = {
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
            type: 'array',
            of: [{ type: 'block' }]
        }
    ]
};

export const snippetCategory = {
    name: 'snippetCategory',
    title: 'Snippet Categories',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        }
    ]
};

export const series = {
    name: 'series',
    title: 'Series',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
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
            name: 'posts',
            title: 'Posts',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'post' } }]
        }
    ]
};

export const tagging = {
    name: 'tagging',
    title: 'Tagging',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        }
    ]
};

export const speaking = {
    name: 'speaking',
    title: 'Speaking Engagements',
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
            name: 'thumbnail',
            title: 'Thumbnail',
            description: 'Thumbnail of 1280x720 (16:9) dimension maximum.',
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
            name: 'short_description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'location',
            title: 'Event Location',
            type: 'string'
        },
        {
            name: 'slides_link',
            title: 'Slides (if applicable)',
            type: 'url'
        },
        {
            name: 'video_link',
            title: 'Video (if applicable)',
            type: 'url'
        },
        {
            name: 'details',
            title: 'Details of Speaking Engagement',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'posts',
            title: 'Related Content',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'post' } }]
        }
    ]
};

export const project = {
    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Project Title',
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
            name: 'thumbnail',
            title: 'Thumbnail',
            description: 'Thumbnail of 1280x720 (16:9) dimension maximum.',
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
            name: 'short_description',
            title: 'Short Description',
            type: 'text'
        },
        {
            name: 'details',
            title: 'Details of Project',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'github_url',
            title: 'Github Url (if applicable)',
            type: 'url'
        }
    ]
};

