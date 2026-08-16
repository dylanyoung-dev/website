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
            name: 'metaTitle',
            title: 'Meta Title',
            description: 'Optional SEO title override. Defaults to the post title when left blank.',
            type: 'string'
        },
        {
            name: 'metaDescription',
            title: 'Meta Description',
            description: 'Optional SEO description override. Defaults to the post excerpt when left blank.',
            type: 'text',
            rows: 4
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
            name: 'socialImage',
            title: 'Social Image',
            description: 'Optional image for Open Graph and social sharing (recommended 1200×630). Falls back to landscape, then main image.',
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
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        },
        {
            name: 'youtubeId',
            title: 'Youtube ID',
            type: 'string'
        },
        {
            name: 'landscapeImage',
            title: 'Landscape Card Image',
            description:
                'Thumbnail for the videos listing. Use the same 16:10 landscape ratio as blog post cards. Falls back to the YouTube thumbnail if empty.',
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
            name: 'summary',
            title: 'Summary',
            type: 'text'
        },
        {
            name: 'body',
            title: 'Body',
            description: 'Optional markdown write-up shown on the video detail page.',
            type: 'markdown'
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
    ],
    preview: {
        select: {
            title: 'title',
            media: 'landscapeImage'
        }
    }
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
            type: 'markdown'
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
            type: 'markdown'
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
            type: 'markdown'
        },
        {
            name: 'github_url',
            title: 'Github Url (if applicable)',
            type: 'url'
        },
        {
            name: 'project_url',
            title: 'Live project URL',
            type: 'url'
        },
        {
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' }
        },
        {
            name: 'isCurrent',
            title: 'Current project',
            description: 'Show on the "What Am I Up To?" page',
            type: 'boolean',
            initialValue: false
        }
    ]
};

export const articleGrid = {
    name: 'articleGrid',
    title: 'Article Grid',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            description: 'Internal label in Studio (e.g. "Home latest", "AI category grid")',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'heading',
            title: 'Heading',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2
        },
        {
            name: 'sortLabel',
            title: 'Sort label',
            description: 'Optional display label (e.g. "Newest first")',
            type: 'string'
        },
        {
            name: 'showFeatured',
            title: 'Show featured post',
            description: 'First result uses featured layout',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'showViewAll',
            title: 'Show View All',
            type: 'boolean',
            initialValue: true
        },
        {
            name: 'viewAllHref',
            title: 'View All URL',
            type: 'string',
            initialValue: '/insights/'
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'heading'
        },
        prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
            title,
            subtitle
        })
    }
};

export const hero = {
    name: 'hero',
    title: 'Hero',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            description: 'Internal label in Studio (e.g. "Home hero", "Insights listing")',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'variant',
            title: 'Variant',
            type: 'string',
            options: {
                list: [
                    { title: 'Default', value: 'default' },
                    { title: 'Insights', value: 'insights' }
                ],
                layout: 'radio'
            },
            initialValue: 'default',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'eyebrow',
            title: 'Eyebrow',
            description: 'Small label above the heading (e.g. Insights, Speaking, Contact)',
            type: 'string'
        },
        {
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3
        },
        {
            name: 'subtitle',
            title: 'Subtitle',
            description: 'Optional line under the heading',
            type: 'string'
        },
        {
            name: 'badge',
            title: 'Badge',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                {
                    name: 'text',
                    title: 'Text',
                    type: 'string'
                },
                {
                    name: 'showPulse',
                    title: 'Show pulse indicator',
                    type: 'boolean',
                    initialValue: true
                }
            ]
        },
        {
            name: 'actions',
            title: 'Actions',
            description:
                'CTA buttons under the description (e.g. “Read the latest”, “Browse series”, “Book a talk”)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'action',
                    title: 'Action',
                    fields: [
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'href',
                            title: 'URL or path',
                            type: 'string',
                            description: 'e.g. /insights/ or https://…',
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'style',
                            title: 'Style',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Primary', value: 'primary' },
                                    { title: 'Outline', value: 'outline' },
                                    { title: 'Ghost', value: 'ghost' }
                                ],
                                layout: 'radio'
                            },
                            initialValue: 'primary'
                        },
                        {
                            name: 'openInNewTab',
                            title: 'Open in new tab',
                            type: 'boolean',
                            initialValue: false
                        }
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'href' }
                    }
                }
            ]
        },
        {
            name: 'secondaryLinks',
            title: 'Secondary links',
            description: 'Pill / text links under the CTAs (e.g. category shortcuts)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'secondaryLink',
                    title: 'Link',
                    fields: [
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (Rule: any) => Rule.required()
                        },
                        {
                            name: 'href',
                            title: 'URL or path',
                            type: 'string',
                            description: 'e.g. /insights/categories/ai/',
                            validation: (Rule: any) => Rule.required()
                        }
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'href' }
                    }
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'heading',
            variant: 'variant'
        },
        prepare: ({ title, subtitle, variant }: { title?: string; subtitle?: string; variant?: string }) => ({
            title,
            subtitle: [variant === 'insights' ? 'Insights' : 'Default', subtitle]
                .filter(Boolean)
                .join(' · ')
        })
    }
};

