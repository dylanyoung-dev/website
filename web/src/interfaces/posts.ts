interface Post {
    title: string;
    slug: Slug;
    mainImage: Image;
    mainImageUrl: string;
    landscapeImage: Image;
    landscapeImageUrl: string;
    categories: string[];
    tagging: string[];
    publishedAt: Date;
    body: string;
    excerpt: string;
}

interface Image {
    alt: string;
}

interface Slug {
    current: string;
}

export type { Slug, Post, Image };
