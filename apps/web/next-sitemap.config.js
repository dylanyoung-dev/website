/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://dylanyoung.dev',
    generateRobotsTxt: true,
    outDir: './out',
    sitemapSize: 7000
};

module.exports = config;
