/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://dylanyoung.dev',
    generateRobotsTxt: true,
    outDir: './public',
    sitemapSize: 7000,
    changefreq: 'weekly',
    priority: 0.7,
    exclude: ['/api/*', '/admin/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/'],
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                userAgent: 'CCBot',
                allow: '/',
            },
            {
                userAgent: 'anthropic-ai',
                allow: '/',
            },
            {
                userAgent: 'Claude-Web',
                allow: '/',
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            `${process.env.SITE_URL || 'https://dylanyoung.dev'}/feed.xml`,
        ],
    },
};

module.exports = config;
